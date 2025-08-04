import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  define: {
    // Fix Vue 3 feature flag warnings
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_OPTIONS_API__: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/VueQueryBuilder.vue'),
      name: 'VueQueryBuilder',
      fileName: (format) => `VueQueryBuilder.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'vue-demi', '@vue/composition-api'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
          '@vue/composition-api': 'VueCompositionAPI'
        }
      }
    }
  }
})