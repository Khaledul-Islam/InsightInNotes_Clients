/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/Auth/Login/Login.vue'
import Register from '@/views/Auth/Register/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
    meta: {
      requiresVisitor: true,
      layout: 'blank'
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresVisitor: true,
      layout: 'blank'
    },
  },

  //menu section
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/noteCategory',
    name: 'noteCategory',
    component: () => import('@/views/noteCategory/noteCategory.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/views/notes/notes.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router
