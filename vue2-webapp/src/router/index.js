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
        path: '',  // Wildcard route - matches any child path
        component: MicroFrontendLoader,
      },
      {
        path: '*',  // Wildcard route - matches any child path
        component: MicroFrontendLoader,
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes});

export default router;
