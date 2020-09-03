import http from '../http'

// 获取
export function notesPage (data) {
  return http.post({ url: '/notes/notesPage', data })
}

// 获取块列表
export function notesBlockPage (data) {
  return http.post({ url: '/notes/noteBlockPage', data })
}
