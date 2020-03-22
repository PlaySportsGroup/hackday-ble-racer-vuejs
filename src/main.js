import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import { Laue } from 'laue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.1.70:8080/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

library.add(faBolt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  Laue,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
