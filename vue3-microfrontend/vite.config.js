// ... existing imports
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  // ... your other config
  plugins: [
    vue(),
    federation({
      name: 'your_app_name',
      filename: 'remoteEntry.js',
      exposes: {
        './mounted': './src/mounted.ts'
      },
      shared: ['vue', 'vue-router'],
    }),
  ],
  build: {
    modulePreload: false, // This can help with CSS loading issues
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Ensure CSS has consistent naming and path
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Make chunk names more predictable
        chunkFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
