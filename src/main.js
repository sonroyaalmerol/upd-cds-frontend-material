import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import VueOffline from 'vue-offline'

Vue.use(VueOffline)

Vue.config.productionTip = false
Vue.prototype.$windowOrientation = window.orientation
Vue.prototype.$userAgent = navigator.userAgent

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App)
})
