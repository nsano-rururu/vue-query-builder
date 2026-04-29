import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    // Fix Vue 3 feature flag warnings
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_OPTIONS_API__: true
  },
  server: {
    port: 8080
  },
  build: {
    rollupOptions: {
      input: './public/index.html'
    }
  }
})