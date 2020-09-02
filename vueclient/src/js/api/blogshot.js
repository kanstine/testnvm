import http from '../http'

// 获取广告素材
export function blogsPage (data) {
  return http.post({ url: '/blogs/blogsPage', data })
}
