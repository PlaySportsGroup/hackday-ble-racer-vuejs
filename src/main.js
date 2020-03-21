import Vue from 'vue';
import { Laue } from 'laue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faBolt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  Laue,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
