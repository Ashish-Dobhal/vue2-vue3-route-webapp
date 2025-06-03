import Vue from 'vue';
import VueRouter from 'vue-router';
import ParentAComponent from '../components/ParentAComponent.vue';
import ESModuleBridge from '../components/ESModuleBridge.vue';

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
    path: '/fa/bookOfBusiness',
    name: 'FABookOfBusiness',
    component: ESModuleBridge,
    meta: { moduleName: 'fa.book.of.business' },
  },
  {
    path: '/da/bookOfBusiness*',
    name: 'FABookOfBusinessChildren',
    component: ESModuleBridge,
    meta: { moduleName: 'fa.book.of.business'},
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  routes});

export default router;
