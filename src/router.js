import Vue from 'vue'
import Router from 'vue-router'
import Layout from './Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      meta: { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', roles: [0, 1, 2] },
        component: () => import('@/views/dashboard')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/register')
      }]
    },
    {
      path: '/permits',
      component: Layout,
      redirect: '/permits/apply',
      name: 'Permits',
      meta: { title: 'Permits', icon: 'mdi-pencil-plus' },
      children: [
        {
          path: 'approve',
          name: 'Approve Permits',
          component: () => import('@/views/permits/approve'),
          meta: { title: 'Approve Permits', roles: [1, 2] }
        },
        {
          path: 'apply',
          name: 'Apply Permits',
          component: () => import('@/views/permits/apply'),
          meta: { title: 'Apply Permits', roles: [0, 1, 2] }
        },
        {
          path: 'view',
          name: 'View Permits',
          component: () => import('@/views/permits/view'),
          meta: { title: 'View Permits', roles: [0] }
        },
        {
          path: ':profileId',
          name: 'Permit Records',
          component: () => import('@/views/permits/resident'),
          meta: { title: 'Permit Records', icon: 'book', roles: [0, 1, 2] },
          hidden: true
        },
        {
          path: '',
          name: 'Permit Records',
          component: () => import('@/views/permits/resident'),
          meta: { title: 'Permit Records', icon: 'book', roles: [0, 1, 2], breadcrumb: false },
          hidden: true
        }
      ]
    }
  ]
})
