import Vue from 'vue';
import App from './App.vue';
import iview from 'iview';

Vue.use(iview);

new Vue({
    el: '#root',
    render:(h) => h(App),
    components: {
        App
    }
})