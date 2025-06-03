import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
// Get version from package.json
const version = pkg.version;
const basePath = `fa.book.of.business`;

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [vue()],
    base: '/fa.book.of.business',  // Set the base URL for all assets
    
    build: {
      target: 'esnext',
      // Apply minification in production mode only
      minify: isProduction ? 'terser' : false,
      // Other production optimizations
      sourcemap: !isProduction, // Disable sourcemaps in production
      cssCodeSplit: false,
      outDir: `dist/${basePath}`, // Output directory includes the full path
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
        name: 'module.es',
        fileName: 'module.es',
        formats: ['es']
      },
      
      rollupOptions: {
        input: {
          'module.es': 'src/mounted.ts',
        },
        //   'mounted': 'src/mounted.ts',
        //   'about': 'src/views/About.vue',
        //   'home': 'src/views/Home.vue',
        //   'aboutId': 'src/views/AboutId.vue'
        // },
        output: {
          // No hash in filenames
          // Configure outputs for dynamic route loading
          entryFileNames: '[name].js',
          // Use named chunks for routes to support dynamic imports
          chunkFileNames: (chunkInfo) => {
            const id = chunkInfo.facadeModuleId || '';
            if (id.includes('/src/views/') || id.includes('/src/pages/')) {
              const routeName = id.split(/\/(views|pages)\//).pop()?.split('.')[0].toLowerCase() || 'unknown';
              return `routes/${routeName}.js`;
            }
            // Extract simpler names for Vue component styles
            if (id.includes('.vue')) {
             const componentName = id.split('/views/')[1].split('.')[0];
              return `chunks/${componentName}.js`;
            }
            return 'chunks/[name].js';
          },
          // Use chunk name pattern for dynamic imports
          // assetFileNames: (assetInfo) => {
          //   if (assetInfo.name?.endsWith('.css')) {
          //     return 'assets/[name][extname]';
          //   }
          //   if (assetInfo.name?.endsWith('.css')) {
          //     // Extract the component name if it's a scoped style
          //     const nameMatch = assetInfo.name.match(/(.+?)\.vue_vue_type_style/);
          //     if (nameMatch && nameMatch[1]) {
          //       return `assets/${nameMatch[1]}-styles[extname]`;
          //     }
          //     return 'assets/[name][extname]';
          //   }
          // },
          // manualChunks: (id) => {
          //   if (id.includes('/src/views/')) {
          //     const routeName = id.split('/views/')[1].split('.')[0];
          //     return `route-${routeName.toLowerCase()}`;
          //   }
            
          //   if (id.includes('/src/components/')) {
          //     return 'components';
          //   }
            
          //   if (id.includes('node_modules')) {
          //     if (id.includes('vue') || id.includes('vue-router')) {
          //       return 'vendor-vue';
          //     }
          //     return 'vendor';
          //   }
          // },
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
      __DEV__: !isProduction,
      // Add flag to enable route lazy loading
      __ENABLE_LAZY_ROUTES__: true
    },
    
    // Optimize dependencies in production
    optimizeDeps: {
      include: isProduction ? [] : ['vue', 'vue-router'],
      exclude: []
    }
  };
});
