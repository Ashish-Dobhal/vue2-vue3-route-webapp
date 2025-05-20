export async function loadESMWebapp(options) {
  try {
        // Dynamic import with flexible configuration
        const { 
          url = 'http://localhost:4173/mounted.js', 
          routeName, 
          mountPoint = 'micro-frontend-root' 
        } = options;

        // Use dynamic import with URL constructor for better browser compatibility
        const remoteUrl = new URL("http://localhost:4173/assets/remoteEntry.js");
        const container = await import(/* @vite-ignore */ "http://localhost:4173/assets/remoteEntry.js");
        console.log(Object.keys(container));

        try {
          // Properly await the promise resolution and call the returned factory
          const factory = await container.get('./mounted');
          console.log(factory);
          const module = factory();

        // Logging for debugging
        console.log('Micro Frontend Module:', module);

          // Check for mount method
          if (typeof module.mount === 'function') {
            // Mount the route
            module.mount(document.getElementById(mountPoint), { routeName });
          } else {
            console.error('Invalid mount function in micro frontend');
      }
        } catch (moduleError) {
          console.error('Module loading error:', moduleError);
    }
      } catch (error) {
        console.error('Micro Frontend Loading Error:', error);
      }
    }

// // Optional: Add a global function for use in non-module contexts
// if (typeof window !== 'undefined') {
//   window.loadMicroFrontend = loadMicroFrontend;
// }
