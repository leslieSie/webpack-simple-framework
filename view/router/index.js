import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/index',
  component: (resolve) => require(['../page/index.vue'], resolve)
},
{
  path: '/setting',
  component: (resolve) => require(['../page/setting.vue'], resolve)
}
]

module.exports = new VueRouter({
  routes
})
