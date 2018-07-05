
// npm run dev
import Vue from 'vue'
import App from './App'
import router from './router'

import { AppStore } from './store/AppStore';

Vue.config.productionTip = false;

window.eventEmitter = new Vue();


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: AppStore,
});
