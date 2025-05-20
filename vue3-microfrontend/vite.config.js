import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
// Get version from package.json
const version = pkg.version;
const basePath = `/fa.portal/bob/${version}/umd1/`;

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [vue()],
    base: basePath,  // Set the base URL for all assets
    
    build: {
      target: 'esnext',
      // Apply minification in production mode only
      minify: isProduction ? 'terser' : false,
      // Other production optimizations
      sourcemap: !isProduction, // Disable sourcemaps in production
      cssCodeSplit: false,
      outDir: `dist${basePath}`, // Output directory includes the full path
      emptyOutDir: true, // Clean the output directory before building
      
      // Terser options for production
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Remove console logs in production
          drop_debugger: true // Remove debugger statements in production
        }
      } : undefined,
      
      lib: {
        entry: 'src/mounted.ts',
        name: 'microFrontend',
        fileName: 'micro-frontend',
        formats: ['es']
      },
      
      rollupOptions: {
        output: {
          // No hash in filenames
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name][extname]';
            }
            return 'assets/[name][extname]';
          },
          // Keep the manual chunks logic without hash
          manualChunks: (id) => {
            if (id.includes('/src/views/')) {
              const routeName = id.split('/views/')[1].split('.')[0];
              return `${routeName.toLowerCase()}`;
            }
            
            if (id.includes('/src/components/')) {
              return 'components';
            }
            
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    
    // Configure preview server
    preview: {
      port: 4173,
      cors: true,
      // Strip the base path when serving files
      base: '/'
    },
    
    // Enable CORS for development
    server: {
      port: 3000,
      cors: true,
      // Use different settings for development server
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: false,
      }
    },
    
    // Use different environment variables based on mode
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      __APP_VERSION__: JSON.stringify(version),
      __PROD__: isProduction,
      __DEV__: !isProduction
    },
    
    // Optimize dependencies in production
    optimizeDeps: {
      include: isProduction ? [] : ['vue', 'vue-router'],
      exclude: []
    }
  };
});
