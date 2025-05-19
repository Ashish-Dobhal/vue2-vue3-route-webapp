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

  // Navigate to specified route if provided
  if (props.routeName) {
    // router.push('about')
  }

  // Mount the app
  app.mount(el);
  setTimeout(() => {
    //  router.push('/about')  

  }, 10)
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
