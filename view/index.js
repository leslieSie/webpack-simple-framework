import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';
import vueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';

Vue.use(vueRouter);
Vue.use(iview);

new Vue({
    el: '#root',
    render: (h) => h(App),
    components: {
        App
    }
})