import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Determine if it's production or development
  const isProd = mode === 'production';

  return {
    // Base plugin configuration
    plugins: [
      // Vue plugin with additional compiler options
      vue({
        template: {
          compilerOptions: {
            // Treat any tag with a dash as a custom element
            isCustomElement: (tag) => tag.includes('-')
          }
        }
      }),
      
      // Module Federation configuration
      federation({
        name: 'book_of_business',
        filename: 'remoteEntry.js',
        
        // Expose components/modules to be shared
        exposes: {
          './mounted': './src/mounted.ts',
          // Optional: expose additional components
          // './Components': './src/components/index.ts'
        },
        
        // Configure shared dependencies
        shared: {
          vue: {
            requiredVersion: '^3.2.0',
            import: true,
            singleton: true, // Ensure only one instance
            strictVersion: true, // Enforce exact version
          },
          'vue-router': {
            requiredVersion: '^4.0.0',
            import: true,
            singleton: true,
            strictVersion: true,
          }
        }
      })
    ],

    // Resolve aliases for easier imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './src'),
      },
      // Explicitly handle file extensions
      extensions: ['.vue', '.ts', '.js', '.json']
    },

    // Server configuration for development
    server: {
      port: parseInt(env.VITE_PORT || '8080'),
      strictPort: true,
      open: false,
      cors: {
        origin: '*', // Be cautious in production
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      },
      hmr: {
        overlay: true,
      },
    },

    // Build configuration
    build: {
      target: 'esnext', // Modern browser support
      minify: isProd ? 'esbuild' : false, // Minify only in production
      sourcemap: !isProd, // Source maps in development
      
      rollupOptions: {
        output: {
          // Ensure correct naming for Module Federation
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name].[ext]',
          
          // Advanced chunk splitting
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Split vendor chunks
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
      
      // Ensure Module Federation works correctly
      modulePreload: {
        polyfill: true,
      },
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000, // KB
    },

    // Preview configuration for production build testing
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173'),
      strictPort: true,
      cors: true,
    },

    // Define global constants
    define: {
      '__APP_VERSION__': JSON.stringify(env.npm_package_version || '1.0.0'),
      '__IS_DEVELOPMENT__': !isProd,
      '__API_BASE_URL__': JSON.stringify(
        isProd 
          ? env.PROD_API_URL 
          : env.DEV_API_URL
      )
    }
  };
});
