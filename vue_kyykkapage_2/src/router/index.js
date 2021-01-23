import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Einfo from '../views/e_info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page - Example App',
    }
  },
  {
    path: '/e_info',
    name: 'Extra info',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Einfo,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
