import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//route protection
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!(store.getters.isLoggedIn && store.getters.currentUser)){
      //redirect to login page
      next('/login');
    }else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
    if(store.getters.isLoggedIn && store.getters.currentUser){
      //redirect to login page
      next('/');
    }else{
      next();
    }
  }
  else{
    next();
  }
});

export default router
