import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import './utils/permission'

import VueOffline from 'vue-offline'
import ContainerRefresh from '@/components/general/ContainerRefresh'

Vue.use(VueOffline)
Vue.component('v-container-refresh', ContainerRefresh)

Vue.config.productionTip = false
Vue.prototype.$windowOrientation = window.orientation
Vue.prototype.$userAgent = navigator.userAgent
Vue.prototype.$message = (message, type) => {
  var msgType = type || 'cyan darken-2'
  store.dispatch('setAlert', { message, type: msgType })
}

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
