import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  /*
  server: {
    host: '0.0.0.0', // Allow connections from outside the container
    port: 3000,     // Explicitly set the container port
    hmr: {
      port: 3000, // Use the same port for HMR inside the container
    },
  },
  */
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
