import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    https: true,
    port: 3443,
    host: '0.0.0.0',
  },
  plugins: [ mkcert() ]
})
