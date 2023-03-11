import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../modules/home/views/Home.vue'
import page404 from '../views/404.vue'

// modules
const login = () => import('../modules/auth/views/Login.vue')
const register = () => import('../modules/auth/views/Registration.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },

    // -> 404
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: page404
    }
  ]
})

export default router
