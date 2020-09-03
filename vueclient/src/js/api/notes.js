import http from '../http'

// 获取
export function notesPage (data) {
  return http.post({ url: '/notes/notesPage', data })
}

// 获取块列表
export function notesBlockPage (data) {
  return http.post({ url: '/notes/noteBlockPage', data })
}

// 新增note
export function notesAdd (data) {
  return http.post({ url: '/notes/notesAdd', data })
}

// 添加block
export function blockAdd (data) {
  return http.post({ url: '/notes/blockAdd', data })
}
