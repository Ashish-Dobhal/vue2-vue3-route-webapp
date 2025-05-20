import { RouteRecordRaw } from 'vue-router';

// Define routes with dynamic imports for code splitting
const routes: RouteRecordRaw[] = [
    {
    path: '/',
    redirect: 'parentB'
  },
  {
    path: '/parentB',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/parentB/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Home Page',
    }
  },
  {
    path: '/parentB/about/:id',
    name: 'AboutId',
    component: () => import('../views/AboutId.vue'),
    meta: {
      title: 'Home Page',
    }
  },
];

export default routes;

// Type definitions for route metadata remain the same
