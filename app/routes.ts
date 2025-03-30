import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// This configures flatRoutes to look for route files in the src/routes/ directory
// and generates a route configuration object compatible with React Router.
export default flatRoutes() satisfies RouteConfig;
