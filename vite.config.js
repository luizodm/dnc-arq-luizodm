import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://react.dnc.group',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },
})
