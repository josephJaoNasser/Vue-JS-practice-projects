import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>  import(/* webpackChunkName: "home-page" */'../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>  import(/* webpackChunkName: "register-page" */'../views/RegistrationPage.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/registration-success',
    name: 'Successfully Registered!',
    component: () =>  import(/* webpackChunkName: "register-page" */'../views/RegisterSuccess.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>  import(/* webpackChunkName: "login-page" */'../views/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/:username',
    name: 'Profile',
    component: () =>  import(/* webpackChunkName: "profile-page" */'../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/errors/404', 
    component: () =>  import(/* webpackChunkName: "404-page" */'../views/404.vue'), 
  },  
  { 
    path: '*', 
    redirect: '/errors/404'
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
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
