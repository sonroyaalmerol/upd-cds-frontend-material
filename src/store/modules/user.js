import { getInfo as get_info, getProfile as get_profile, login as log_in } from '@/utils/ekalayapi'
import { getToken as get_token, removeToken as remove_token, setToken as set_token } from '@/utils/auth'

const user = {
  state: {
    token: get_token(),
    first_name: '',
    last_name: '',
    upid: '',
    username: '',
    uid: '',
    krhid: '',
    profileid: '',
    avatar: '',
    roles: null,
    isAthletePerformer: false,
    isCouncil: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_FIRST_NAME: (state, name) => {
      state.first_name = name
    },
    SET_LAST_NAME: (state, name) => {
      state.last_name = name
    },
    SET_UPID: (state, upid) => {
      state.upid = upid
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_KRHID: (state, krhid) => {
      state.krhid = krhid
    },
    SET_PROFILEID: (state, profileid) => {
      state.profileid = profileid
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_IS_ATHLETE_PERFORMER: (state, isAthletePerformer) => {
      state.isAthletePerformer = isAthletePerformer
    },
    SET_IS_COUNCIL: (state, isCouncil) => {
      state.isCouncil = isCouncil
    }
  },

  actions: {
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        log_in(username, userInfo.password).then(response => {
          set_token(response.token)
          commit('SET_TOKEN', response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        get_info().then(async response => {
          commit('SET_ROLES', response.role)
          commit('SET_UID', response._id)
          commit('SET_USERNAME', response.username)
          const profile = await get_profile(response.role, response._profile)
          commit('SET_UPID', profile.upid)
          commit('SET_KRHID', profile.krhid)
          commit('SET_PROFILEID', profile._id)
          commit('SET_FIRST_NAME', profile.firstName)
          commit('SET_LAST_NAME', profile.lastName)
          commit('SET_IS_ATHLETE_PERFORMER', profile.isAthletePerformer)
          commit('SET_IS_COUNCIL', profile.isCouncil)
          if ('displayPhoto' in profile) {
            if (profile.displayPhoto) {
              commit('SET_AVATAR', profile.displayPhoto)
            } else {
              commit('SET_AVATAR', '')
            }
          } else {
            commit('SET_AVATAR', '')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', null)
      commit('SET_FIRST_NAME', '')
      commit('SET_LAST_NAME', '')
      commit('SET_UPID', '')
      commit('SET_UID', '')
      commit('SET_KRHID', '')
      commit('SET_USERNAME', '')
      commit('SET_PROFILEID', '')
      commit('SET_IS_ATHLETE_PERFORMER', false)
      commit('SET_IS_COUNCIL', false)
      commit('SET_AVATAR', '')
      remove_token()
    },

    fedLogout({ commit }) {
      commit('SET_TOKEN', '')
      remove_token()
    }
  }
}

export default user
