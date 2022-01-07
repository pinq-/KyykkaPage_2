import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Einfo from '../views/e_info.vue'
import player from '../views/player.vue'

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
    component: Einfo,
  },
  {
    path: '/player/:id',
    name: 'Player_data',
    component: player,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
