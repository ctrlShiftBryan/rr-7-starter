# Welcome to React Router!

---

_This project was initialized using the following React Router template:_

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

### Linting

This project uses [ESLint 9](https://eslint.org/docs/latest/use/configure/configuration-files-new) with its flat configuration format (`eslint.config.js`) for code linting and quality checks.

Key configurations include:

- **Plugins:** `@eslint/js`, `typescript-eslint`, `eslint-plugin-react`.
- **Base Rules:** Recommended rulesets from the core plugins are applied.
- **Ignores:** The `build/` and `.react-router/` directories (containing compiled/generated code) are ignored.
- **Custom Rules:**
  - `react/react-in-jsx-scope` is disabled as the project uses the modern JSX transform.
  - `@typescript-eslint/no-unused-vars` is configured to allow variables and arguments prefixed with an underscore (`_`).

To run the linter manually:

```bash
bun lint
```

## Formatting

This project uses [Prettier](https://prettier.io/) for automatic code formatting. The configuration is defined in `prettier.config.js` with the following settings:

- Uses `prettier-plugin-tailwindcss` for consistent Tailwind CSS class ordering
- Print width: 100 characters
- Tab width: 2 spaces
- No tabs (uses spaces)
- Semicolons: enabled
- Single quotes: enabled
- Trailing comma: ES5
- Bracket spacing: enabled
- Arrow function parentheses: always

To format the code manually:

```bash
bun format
```

This command will format all relevant files according to the defined rules.

## Routing

This project uses file-based routing powered by `@react-router/fs-routes`. Route modules are defined by creating files within the `app/routes/` directory.

The filename determines the URL path, following specific conventions:

- `_index.tsx` -> `/`
- `about.tsx` -> `/about`
- `users.$id.tsx` -> `/users/:id` (dynamic segment)
- `_auth.login.tsx` -> `/login` (pathless layout route)

For more details on the conventions (including nested routes, splats, optional segments, etc.), refer to the [React Router File Route Conventions documentation](https://reactrouter.com/how-to/file-route-conventions).

The routing configuration is generated automatically via the `app/routes.ts` file, which uses `flatRoutes()`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## CI/CD

This project uses GitHub Actions for Continuous Integration (CI).
The workflow is defined in `.github/workflows/ci.yml` and runs on every push and pull request to any branch.

The CI pipeline consists of the following jobs:

1.  **Setup:** Installs dependencies using `bun install --frozen-lockfile`. This job runs first.
2.  **Parallel Checks (depend on Setup):**
    - `build`: Runs `bun run build` to ensure the project builds successfully.
    - `typecheck`: Runs `bun run typecheck` to perform static type checking with TypeScript.
    - `lint`: Runs `bun run lint` to check code style and quality using ESLint.
    - `format_check`: Runs `bun run format:check` to verify code formatting with Prettier.
3.  **Docker Build (depends on all checks):**
    - `docker_build`: If all the previous checks pass, this job builds a Docker image using the project's `Dockerfile`.
    - It uses `docker/metadata-action` to automatically generate relevant tags (based on branch, tag, or commit SHA) and labels for the Docker image.
    - Currently, it only _builds_ the image (`push: false`) and does not push it to a registry.

This setup ensures that code is automatically checked for build errors, type errors, linting issues, and formatting consistency before potentially being deployed. The final Docker build step confirms that the application can be successfully containerized.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

### UI Components

This project utilizes [shadcn/ui](https://ui.shadcn.com/) for its component library, which builds upon Tailwind CSS.

You can find the documentation for available components [here](https://ui.shadcn.com/docs/components/accordion).

To add a new component, run the following command:

```bash
bunx --bun shadcn-ui@latest add <component-name>
```

Replace `<component-name>` with the desired component (e.g., `textarea`, `button`).

---

Built with ❤️ using React Router.
