import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';
import router from './router/index.js';
import 'iview/dist/styles/iview.css';

Vue.use(iview);

new Vue({
    el: '#root',
    router,
    render: h => h(App),
    components: {
        App
    }
})