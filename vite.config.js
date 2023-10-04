import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // other plugins,
  ],
  server: {
    port: 2644,
  },
});
