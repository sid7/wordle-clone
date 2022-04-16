import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? 'https://sid7.github.io/wordle-clone/' : '/',
  server: {
    port: 7002,
    open: true,
  },
}))
