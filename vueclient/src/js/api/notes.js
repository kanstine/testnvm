import http from '../http'

// 获取广告素材
export function notesPage (data) {
  return http.post({ url: '/notes/notesPage', data })
}
