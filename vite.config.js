import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/payment/stripe-callback': {
        target: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BACKEND_URI,
        changeOrigin: true,
        secure: true,
      }
    }
  }
});
