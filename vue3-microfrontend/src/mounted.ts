import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory, Router } from 'vue-router';
import routes from './routes';
import { isDev, version } from './config';

// Use version from config
export const VERSION = version;

// Basic interface for mount props
interface MountProps {
  showHeader?: boolean;
  title?: string;
  routeName?: string;
  [key: string]: any;
}

// Basic interface for module API
interface ModuleAPI {
  unmount: () => void;
  version: string;
  router: Router;
}

// Mount function for federation
export async function mount(el: Element, props: MountProps = {}): Promise<ModuleAPI> {
  // Create the app instance
  const app = createApp(App, props);
  
  // Create router with hash mode
  const router = createRouter({
    history: createWebHashHistory('/'),
  routes
});

app.use(router);

 const parseRoute = (fullPath?: string) => {
    if (!fullPath) return '/'
    
    // Remove potential prefix patterns
    const cleanRoutes = [
      /^#\/about-book-of-business/,
      /^#/
    ]

    let parsedPath = fullPath
    cleanRoutes.forEach(regex => {
      parsedPath = parsedPath.replace(regex, '')
    })

    return parsedPath.replace(/^\//, '') || '/'
  }
  // Navigate to specified route if provided
  if (props.routeName) {
     const cleanRoute = parseRoute(props.routeName)
    router.push(cleanRoute).catch(err => {
      console.warn(`Failed to navigate to route "${props.routeName}":`, err);
    });
  }

  // Mount the app
  app.mount(el);
  
  // Return simple API
  return {
    unmount: () => app.unmount(),
    version: VERSION,
    router
  };
}

// No need to rely on import.meta.env.DEV directly
export function initDevMode(): void {
  if (isDev) {
    const appElement = document.getElementById('app');
    if (appElement) {
      mount(appElement, {
        showHeader: true,
        title: 'Dev Mode - Micro Frontend',
        routeName: 'home' // Default route for dev mode
      });
    } else {
      console.error('Root element #app not found');
    }
  }
}
