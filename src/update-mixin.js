import { Bus } from './bus'

export default {
  data() {
    return {
      // refresh variables
      refreshing: false,
      registration: null,
      updateExists: false,
    }
  },

  created() {
    // ---
    // Custom code to let user update the app
    // when a new service worker is available
    // ---
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      // Here the actual reload of the page occurs
      window.location.reload()
    })

    Bus.$on('refresh_app', () => {
      this.refreshApp()
    })
  },

  methods: {
    showRefreshUI(e) {
      this.registration = e.detail
      this.updateExists = true
    },

    refreshApp() {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) return
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage('skipWaiting')
    },
  },

  beforeDestroy() {
    Bus.$off('update_app')
  },
}