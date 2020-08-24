import http from './http'

export default {
  login: {
    login (data) {
      return http.post({ url: '/login', data })
    }
  }
}
