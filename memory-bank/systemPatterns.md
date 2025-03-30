# System Patterns

This file documents recurring patterns and standards used in the project.
2025-03-30 07:32:00 - Initial creation of Memory Bank for the React Router 7 starter project

## Coding Patterns

* **File-based Routing**: Routes are defined by creating files within the `app/routes/` directory, following React Router 7 conventions
* **TypeScript Types**: All components and functions have explicit TypeScript types
* **Module Pattern**: Functionality is organized into focused modules (e.g., fileScanner.ts, apiClient.ts)
* **Loader/Component Separation**: Data loading logic is kept separate from UI rendering components
* **React Hooks**: useState, useCallback, and other hooks for managing component state and behavior
* **TailwindCSS Styling**: Utility-first CSS approach with consistent class naming

## Architectural Patterns

* **Server-Side Rendering**: Pages are initially rendered on the server for improved performance and SEO
* **Data Loading**: Server-side data loading via React Router loaders
* **Component Composition**: UI built from smaller, reusable shadcn/ui components
* **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side interactivity
* **Responsive Design**: Mobile-first approach with responsive layouts using TailwindCSS grid system
* **Dark Mode Support**: Built-in theme system with light and dark mode variants

## Testing Patterns

* **Unit Testing**: Small, focused tests for individual functions and modules
* **Component Testing**: Testing components in isolation with React Testing Library
* **Integration Testing**: Testing how components work together in context
* **Mock Services**: Using MSW to mock external API requests
* **File System Mocking**: Mocking Node.js fs module for testing file operations
* **Test-Driven Development**: Writing tests before implementing functionality


2025-03-30 14:53:00 - Updated testing patterns to reflect Bun test runner usage

## Testing Patterns (Updated)

* **Bun Test Runner**: Using Bun's built-in test runner instead of Vitest
* **Jest-Compatible API**: Leveraging Bun's Jest-compatible test API (describe, it, expect)
* **Temporary Test Directories**: Creating isolated temporary directories for file system tests
* **Clean Test Teardown**: Properly cleaning up test artifacts after test execution
* **Focused Test Files**: Organizing tests alongside the code they test with .test.ts extension
* **Coverage Reporting**: Tracking test coverage to ensure comprehensive testing