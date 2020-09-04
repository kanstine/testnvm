import axios from 'axios'

// 请求数据处理
function transformRequest (data) {
  let ret = ''
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
  }
  return ret.slice(0, -1)
}

// 响应拦截器
axios.interceptors.response.use(
  function (response = {}) {
    // 请求成功
    if (response.status === 200) {
      // 处理返回数据
      if (response.data) {
        const { code, msg, message, data } = response.data
        if (+code >= 200 && +code <= 300) {
          // console.log('success', code, data)
          return Promise.resolve(data || msg || message)
        } else {
          console.log('code:', code)
          if (code === 401) {
            return Promise.reject(new Error('登录已失效，请重新登录'))
          }
          return Promise.reject(new Error(msg || message || code))
        }
      }
      return Promise.resolve(response.statusText)
    }

    const dataMessage = (response.data || {}).msg || (response.data || {}).message
    const errorMessage = dataMessage || response.statusText || response.status
    return Promise.reject(new Error(errorMessage))
  },
  function (error) {
    const response = error.response || {}
    const data = response.data || {}
    const dataErrMsg = data.msg || data.message || data.code || data.status // data 错误信息
    return Promise.reject(new Error(dataErrMsg || response.statusText || response.status))
  })

// 请求方法
export default {
  get ({ url, params = {} }) {
    return axios.get(url, { params })
  },

  post ({ url, data = {} }) {
    return axios.post(url, data)
  },

  postForm ({ url, data = {} }) {
    return axios.post(url, data, {
      transformRequest: [transformRequest],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  postFormData ({ url, formData, onUploadProgress }) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress (progressEvent) {
        onUploadProgress && onUploadProgress(progressEvent)
      }
    })
  },
  postFormDataSimple ({ url, formData }) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  postFormCanCancelPost ({ url, formData, onUploadProgress, cancelPostSet }) {
    const CancelToken = axios.CancelToken
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress (progressEvent) {
        onUploadProgress && onUploadProgress(progressEvent)
      },
      cancelToken: new CancelToken(function executor (c) {
        cancelPostSet(c)
      })
    })
  }
}
