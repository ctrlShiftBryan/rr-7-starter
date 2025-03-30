FROM oven/bun:1-alpine AS base
WORKDIR /app

# Install dependencies first, in a separate step to take advantage of Docker's caching.
# Copy package.json and bun.lockb
COPY package.json bun.lockb ./
# Install all dependencies including dev dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Use a production-only install for the final image
FROM oven/bun:1-alpine AS production-dependencies-env
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile

# Build the app
FROM base AS build-env
# Run the build command
RUN bun run build

# Pull production dependencies and build artifacts into a clean image
FROM oven/bun:1-alpine
WORKDIR /app

# Copy production dependencies
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# Copy built application
COPY --from=build-env /app/build /app/build
# Copy package.json and bun.lockb in case the start script needs them
COPY package.json bun.lockb ./

# Expose the port the app runs on (assuming 3000 based on previous Dockerfile comment)
EXPOSE 3000

# Set the command to start the app
CMD ["bun", "run", "start"]