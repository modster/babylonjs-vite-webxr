import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  server: {
    https: true,
    port: 3443
  }
})
