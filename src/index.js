import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iview);

new Vue({
    el: '#root',
    render: (h) => h(App),
    components: {
        App
    }
})