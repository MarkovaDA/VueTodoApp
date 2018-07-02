
// npm run dev
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

window.eventEmitter = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
