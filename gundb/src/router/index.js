import Vue from 'vue';
import VueRouter from 'vue-router';
import upload from '../views/Upload.vue';
import Download from '../views/Download.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/download/:id',
    name: 'download',
    component: Download
  },
  {
    path: '/',
    name: 'upload',
    component: upload
  }
];

const router = new VueRouter({
  routes
});

export default router;
