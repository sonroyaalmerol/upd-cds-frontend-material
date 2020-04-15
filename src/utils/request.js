import axios from 'axios'
import store from '../store/index'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: "https://fhk5z1h9x7.execute-api.ap-southeast-1.amazonaws.com/dev/api/v2",
  // baseURL: "http://127.0.0.1:3000/api/v2",
  timeout: 18000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      store.dispatch('setAlert', { message: response.data.message, type: 'error' })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // console.log(error.response.data) // for debug
    // Error 401: No Authorization was found in request.headers
    store.dispatch('setAlert', { message: `Error ${error.response.data.statusCode}: ${error.response.data.message}`, type: 'error' })
    return Promise.reject(error)
  }
)

export default service
