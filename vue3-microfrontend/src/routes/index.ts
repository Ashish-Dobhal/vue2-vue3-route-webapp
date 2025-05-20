import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AboutId from '../views/AboutId.vue';


// Define routes with TypeScript
const routes: RouteRecordRaw[] = [
  {
    path: '/parentB',
    component: Home,
  },
    {
    path: '/parentB/about',
    name: 'About',
    component: About,
    meta: {
      title: 'Home Page',
      // requiresAuth: false
    }
  },
  {
    path: '/parentB/about/:id',
    name: 'AboutId',
    component: AboutId,
    meta: {
      title: 'Home Page',
    }
  },
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
