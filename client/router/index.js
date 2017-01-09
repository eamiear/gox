import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const  router = new Router({
  //hashbang: true,
  //saveScrollPosition: true,
  //suppressTransitionError: true,
  mode: 'hash',
  routes: [
    //{
    //  path: '*',
    //  component: require('../views/Welcome.vue')
    //},
    {
      path: '/',
      name: 'index',
      component: require('../views/Welcome.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: require('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'main',
      component: require('../views/Home.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: require('../views/Admin.vue')
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('username') && to.path !== '/login') {
    //next({
    //  path: '/login',
    //  query: { redirect: to.fullPath }
    //});
    next('/login');
  } else {
    next()

  }
});
export default  router


