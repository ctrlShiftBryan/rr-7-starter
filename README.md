# Welcome to React Router!

# FileScope

FileScope is a developer utility tool designed to enhance code management and optimization through intelligent file searching and token analysis.

## Features

### Smart Search Mode
- Rapidly locate files across your codebase using flexible search criteria
- Stream search results in real-time as matches are found
- Intelligently prioritize results based on relevance and search patterns

### Token Analysis Mode
- Visualize your codebase as an interactive tree structure
- Calculate and display LLM token counts for individual files and directories
- Build and manage ignore lists to exclude irrelevant files from analysis
- Optimize your projects for token efficiency and cost management

## Interface
FileScope provides an intuitive browser-based GUI that allows you to:
- Switch seamlessly between search and token analysis modes
- Enter search queries and parameters with autocomplete support
- View streaming results in a clean, organized format
- Export findings for documentation or further analysis

Perfect for developers working with large codebases or LLM-powered applications where token management is essential.

---
*This project was initialized using the following React Router template:*

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
