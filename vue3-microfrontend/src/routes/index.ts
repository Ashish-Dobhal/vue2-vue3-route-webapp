import { RouteRecordRaw } from 'vue-router';

// Define routes with dynamic imports for code splitting
const routes: RouteRecordRaw[] = [
    {
    path: '/',
    redirect: 'fa/bookOfBusiness'
  },
  {
    path: '/fa/bookOfBusiness',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/fa/bookOfBusiness/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Home Page',
    }
  },
  {
    path: '/fa/bookOfBusiness/about/:id',
    name: 'AboutId',
    component: () => import('../views/AboutId.vue'),
    meta: {
      title: 'Home Page',
    }
  },
    {
    path: '/fa/bookOfBusiness*',
    redirect: '/fa/bookOfBusiness'
  },
];

export default routes;

// Type definitions for route metadata remain the same
