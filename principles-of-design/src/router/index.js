import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PresentationMain from '../views/PresentationMain.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/PresentationMain',
    name: 'PresentationMain',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PresentationMain
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
