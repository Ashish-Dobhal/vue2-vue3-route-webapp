import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';


// Define routes with TypeScript
const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/home'
  },
    {
    path: '/parentB/about',
    name: 'About',
    component: About,
    children: [
      // Commented out MicroFrontendLoader example
      // {
      //   path: '*',
      //   component: MicroFrontendLoader,
      //   props: {
      //     name: 'book-of-business',
      //     baseRoute: '/fa',
      //     version: 'x.x.x',
      //     // registry: microFrontendRegistry['book-of-business']
      //   }
      // }
    ],
    meta: {
      title: 'About Page',
      requiresAuth: false
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page',
      // requiresAuth: false
    }
  },
  // Optional: 404 catch-all route
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('./views/NotFound.vue'),
  //   meta: {
  //     title: 'Page Not Found'
  //   }
  // }
];

export default routes;

// Optional: Type definitions for route metadata
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
  }
}
