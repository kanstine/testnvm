import http from '@/js/http'

export function folderList (data) {
  return http.post({ url: '/article/folderList', data })
}

export function fileList (data) {
  return http.post({ url: '/article/fileList', data })
}
