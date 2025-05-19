import Vue from 'vue';
import VueRouter from 'vue-router';
import MicroFrontendLoader from '../components/MicroFrontendLoader.vue';
import ParentAComponent from '../components/ParentAComponent.vue';
import ParentBComponent from '../components/ParentBComponent.vue';

// Register VueRouter with Vue
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'parentA' }
  },
  {
    path: '/parentA',
    name: 'parentA',
    component: ParentAComponent,
    props: { route: 'parentA' },
  },
  {
    path: '/parentB',
    name: 'parentB',
    component: ParentBComponent,
    props: { route: 'parentB' },
    children: [

      {
        path: '',
        redirect: 'home',
      },
            {
        path: 'home',
        component: MicroFrontendLoader,
        props: {
          name: 'book-of-business',
          baseRoute: 'parentB',
          version: 'x.x.x'
        },
      },      
        {
        path: 'about',
        name: 'about',
        component: MicroFrontendLoader,
        props: {
          name: 'book-of-business',
          baseRoute: 'parentB',
          version: 'x.x.x'
        }},
          {
            path: 'about/:id',
            name: 'AboutId',
            component: MicroFrontendLoader,
            meta: {
              title: 'AboutId',
              // requiresAuth: false
            }
          },
    ]
  },
  // Catch-all route for undefined routes
  // {
  //   path: '*',
  //   name: 'not-found',
  //   component: () => import('../views/NotFound.vue')
  // }
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes});

export default router;
