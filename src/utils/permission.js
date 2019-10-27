import router from '../router'
import store from '../store/index'
import { getToken } from '@/utils/auth'

const message = (message, type) => {
  store.dispatch('setAlert', { message, type })
}

const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles === null) {
        store.dispatch('getInfo').then(() => {
          next()
        }).catch((err) => {
          store.dispatch('fedLogout').then(() => {
            message(err || 'Verification failed, please login again', 'error')
            next({ path: '/' })
          })
        })
      } else {
        if (to.meta.roles) {
          if (to.meta.roles.includes(store.getters.roles)) {
            next()
          } else {
            message('You are not allowed to enter that part.', 'error')
            next({ path: '/' })
          }
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      message('Authentication is required for that page!', 'error')
      next(`/login?redirect=${to.path}`)
    }
  }
})
