import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/payment/stripe-callback': {
          target: env.VITE_API_BASE_URL || 'http://localhost:5000',
          changeOrigin: true,
        }
      }
    },
  }
});
