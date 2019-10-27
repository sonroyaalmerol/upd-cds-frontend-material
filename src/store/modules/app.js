const app = {
  state: {
    alert: '',
    alertType: 'primary'
  },
  mutations: {
    SET_ALERT: (state, alert) => {
      state.alert = alert
    },
    SET_ALERT_TYPE: (state, alertType) => {
      state.alertType = alertType
    }
  },
  actions: {
    setAlert({ commit }, { message, type }) {
      commit('SET_ALERT', message)
      commit('SET_ALERT_TYPE', type)
    }
  }
}

export default app
