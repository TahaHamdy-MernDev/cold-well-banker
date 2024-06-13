import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    minify: 'terser'
    terserOptions: {
      compress: {
        drop_console: true, 
      },
      mangle: true,
    },
  },
})
