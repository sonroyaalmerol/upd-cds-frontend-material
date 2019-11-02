const app = {
  state: {
    alert: '',
    alertType: 'primary',
    updateAvailable: false
  },
  mutations: {
    SET_ALERT: (state, alert) => {
      state.alert = alert
    },
    SET_ALERT_TYPE: (state, alertType) => {
      state.alertType = alertType
    },
    SET_UPDATE_AVAILABLE: (state, updateAvailable) => {
      state.updateAvailable = updateAvailable
    }
  },
  actions: {
    setAlert({ commit }, { message, type }) {
      commit('SET_ALERT', message)
      commit('SET_ALERT_TYPE', type)
    },
    setUpdateAvailable({ commit }, updateAvailable) {
      commit('SET_UPDATE_AVAILABLE', updateAvailable)
    }
  }
}

export default app
