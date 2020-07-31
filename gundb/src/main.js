import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueGun from 'vue-gun';
import 'gun/lib/rindexed';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/sea';
import 'gun/lib/path';
import 'gun/lib/load';
import 'gun/lib/promise';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { inline: true, button: true, navbar: true, title: true, toolbar: true, tooltip: true, movable: true, zoomable: true, rotatable: true, scalable: true, transition: true, fullscreen: true, keyboard: true, url: 'data-source' }
});
Vue.use(VueGun, {
  peers: [
    'http://localhost:8765/gun',
    'http://182.92.79.239:8765/gun'
    // 'http://localhost:8765/gun'
  ],
  radisk: true,
  localStorage: false // 大小就5M
});
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
