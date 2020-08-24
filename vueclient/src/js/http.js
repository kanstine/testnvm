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
