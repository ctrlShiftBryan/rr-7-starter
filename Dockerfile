FROM oven/bun:1.1.45-alpine AS base
WORKDIR /app

# Copy all source code first
COPY . .

# Install all dependencies including dev dependencies
# Run this *after* copying all files to ensure full context
RUN bun install --frozen-lockfile

# Use a production-only install for the final image
FROM oven/bun:1.1.45-alpine AS production-dependencies-env
WORKDIR /app
# Copy only necessary files for production install
COPY package.json bun.lock ./
# Allow lockfile discrepancies only for production install in Alpine
RUN bun install --production --no-frozen-lockfile

# Build the app using the base image with all dependencies
FROM base AS build-env
# Re-run install just in case, though cached layer should help
# RUN bun install --frozen-lockfile 
WORKDIR /app
# Run the build command (ensure PWD is correct)
RUN bun run build

# Pull production dependencies and build artifacts into a clean image
FROM oven/bun:1.1.45-alpine
WORKDIR /app

# Copy production dependencies
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# Copy built application artifacts from the build stage
COPY --from=build-env /app/build /app/build
# Copy essential files for running the app
COPY package.json bun.lock ./

# Expose the port the app runs on (assuming 3000 based on previous Dockerfile comment)
EXPOSE 3000

# Set the command to start the app
CMD ["bun", "run", "start"]