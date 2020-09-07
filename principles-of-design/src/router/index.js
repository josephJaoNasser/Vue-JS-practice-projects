import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PresentationMain from '../views/PresentationMain.vue'
import Norman from '../views/Norman.vue'

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
    component: PresentationMain
  },
  {
    path: '/Norman',
    name: 'Norman',
    component: Norman
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
