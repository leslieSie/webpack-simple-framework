import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  component: (resolve) => require(['../page/index.vue'], resolve)
},
{
  path: '/ivewDemo',
  component: (resolve) => require(['../page/iview_demo.vue'], resolve)
},
{
  path: '/vuexDemo',
  component: (resolve) => require(['../page/vuex_demo.vue'], resolve)
},
{
  path: '/buildDemo',
  component: (resolve) => require(['../page/build_demo.vue'], resolve)
},
{
  path: '/srcDemo',
  component: (resolve) => require(['../page/src_demo.vue'], resolve)
},
{
  path: '/setting',
  component: (resolve) => require(['../page/setting.vue'], resolve)
}
];

module.exports = new VueRouter({
  routes
});
