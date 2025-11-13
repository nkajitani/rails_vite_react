import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: 'app/frontend',
  appType: 'spa',
  plugins: [
    react(), tsconfigPaths(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: { '/api': 'http://web:3000' },
    watch: {
      usePolling: true,
    },
  }
})
