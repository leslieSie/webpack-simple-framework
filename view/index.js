import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';
import router from './router/index.js';
import 'iview/dist/styles/iview.css';
import store from './store/index.js';

Vue.use(iview);

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App),
  components: {
    App
  }
});
