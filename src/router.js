import Vue from 'vue'
import Router from 'vue-router'
import Layout from './Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard'
      },
      children: [{
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            title: 'Dashboard',
            roles: [0, 1, 2]
          },
          component: () => import( /* webpackPrefetch: true */ '@/views/dashboard/index')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import( /* webpackPrefetch: true */ '@/views/login')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import( /* webpackPrefetch: true */ '@/views/register')
        }
      ]
    },
    {
      path: '/permits',
      component: Layout,
      redirect: '/permits/apply',
      name: 'Permits',
      meta: {
        title: 'Permits',
        icon: 'mdi-pencil-plus'
      },
      children: [{
          path: 'approve',
          name: 'Approve Permits',
          component: () => import( /* webpackPrefetch: true */ '@/views/permits/approve'),
          meta: {
            title: 'Approve Permits',
            roles: [1, 2]
          }
        },
        {
          path: 'apply',
          name: 'Apply Permits',
          component: () => import( /* webpackPrefetch: true */ '@/views/permits/apply'),
          meta: {
            title: 'Apply Permits',
            roles: [0, 1, 2]
          }
        },
        {
          path: 'view',
          name: 'View Permits',
          component: () => import( /* webpackPrefetch: true */ '@/views/permits/view'),
          meta: {
            title: 'View Permits',
            roles: [0]
          }
        },
        {
          path: ':profileId',
          name: 'Permit Records',
          component: () => import( /* webpackPrefetch: true */ '@/views/permits/resident'),
          meta: {
            title: 'Permit Records',
            roles: [0, 1, 2]
          },
          hidden: true
        },
        {
          path: '',
          name: 'Permit Records',
          component: () => import( /* webpackPrefetch: true */ '@/views/permits/resident'),
          meta: {
            title: 'Permit Records',
            roles: [0, 1, 2],
            breadcrumb: false
          },
          hidden: true
        }
      ]
    },
    {
      path: '/inoutentries',
      component: Layout,
      meta: {
        title: 'In/Out Records',
        icon: 'mdi-book'
      },
      children: [{
          path: ':profileId',
          name: 'In/Out Records',
          component: () => import( /* webpackPrefetch: true */ '@/views/inout/index'),
          meta: {
            title: 'In/Out Records',
            roles: [0, 1, 2]
          },
          hidden: true
        },
        {
          path: '',
          name: 'In/Out Records',
          component: () => import( /* webpackPrefetch: true */ '@/views/inout/index'),
          meta: {
            title: 'In/Out Records',
            roles: [0],
            breadcrumb: false
          }
        }
      ]
    },
    {
      path: '/database',
      component: Layout,
      redirect: '/database/users',
      name: 'Databases',
      meta: {
        title: 'Databases',
        icon: 'mdi-database'
      },
      children: [{
          path: 'users',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/users'), // Parent router-view
          name: 'Users Database',
          meta: {
            title: 'Users Database',
            roles: [1, 2]
          }
        },
        {
          path: 'forms',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/forms'),
          name: 'Forms Database',
          meta: {
            title: 'Forms Database',
            roles: [2]
          }
        },
        {
          path: 'violations/:residentId',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/violations'),
          name: 'Violations',
          meta: {
            title: 'Violations',
            roles: [0, 1, 2]
          },
          hidden: true
        },
        {
          path: 'violations',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/violations'),
          name: 'Violations',
          meta: {
            title: 'Violations',
            roles: [0],
            breadcrumb: false
          }
        },
        {
          path: 'activities/:activityId',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/activityInOuts'),
          name: 'Activities',
          meta: {
            title: 'Activities',
            roles: [1, 2]
          },
          hidden: true
        },
        {
          path: 'activities',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/activities'),
          name: 'Activities',
          meta: {
            title: 'Activities',
            roles: [0, 1, 2],
            breadcrumb: false
          }
        },
        {
          path: 'assistants',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/ras'),
          name: 'RA Database',
          meta: {
            title: 'RA Database',
            roles: [1, 2]
          }
        },
        {
          path: 'staffs',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/staffs'),
          name: 'Staff Database',
          meta: {
            title: 'Staff Database',
            roles: [1, 2]
          }
        },
        {
          path: 'managers',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/managers'),
          name: 'DM Database',
          meta: {
            title: 'DM Database',
            roles: [2]
          }
        },
        {
          path: 'permits',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/permits'),
          name: 'Permits Database',
          meta: {
            title: 'Permits Database',
            roles: [1, 2]
          }
        },
        {
          path: 'accountabilities/:residentId',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/accountabilities'),
          name: 'Accountabilties',
          meta: {
            title: 'Accountabilties',
            roles: [0, 1, 2]
          },
          hidden: true
        },
        {
          path: 'accountabilities',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/accountabilities'),
          name: 'Accountabilties',
          meta: {
            title: 'Accountabilties',
            roles: [0],
            breadcrumb: false
          }
        },
        {
          path: 'directives/:assistantId',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/directives'),
          name: 'Directives',
          meta: {
            title: 'Directives',
            roles: [1, 2]
          },
          hidden: true
        },
        {
          path: 'directives',
          component: () => import( /* webpackPrefetch: true */ '@/views/database/directives'),
          name: 'Directives',
          meta: {
            title: 'Directives',
            roles: [1],
            breadcrumb: false
          }
        }
      ]
    },
    {
      path: '/keys',
      component: Layout,
      meta: {
        title: 'Key Borrowing',
        icon: 'mdi-key-variant'
      },
      children: [{
        path: 'records',
        name: 'Key Borrowing',
        component: () => import( /* webpackPrefetch: true */ '@/views/keyborrowing/index'),
        meta: {
          title: 'Key Borrowing',
          roles: [1, 2]
        }
      }]
    }
  ]
})