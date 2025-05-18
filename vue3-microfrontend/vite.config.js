import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
  plugins: [
    VueRouter({ dts: './src/typed-router.d.ts'}), // File-based routing
    vue()
  ],
  build: {
    rollupOptions: {
      input: {
        mounted: 'src/mounted.ts'
      },
      preserveEntrySignatures: "exportsOnly",
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
    //   external: ['vue', 'vue-router']
    },
    outDir: 'dist',
    emptyOutDir: true,
    lib: false
  }
})
