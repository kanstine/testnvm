import http from './http'

export default {
  login: {
    login (data) {
      return http.post({ url: '/login', data })
    }
  },
  user: {
    getUserPage (data) {
      return http.post({ url: '/userPage', data })
    },
    addUser (data) {
      return http.post({ url: '/userAdd', data })
    },
    editUser (data) {
      return http.post({ url: '/userUpdate', data })
    },
    delete (data) {
      return http.post({ url: '/userDelete', data })
    }
  }
}
