import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' */

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'konodioda'
  next()
})

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onbeforeunload = function () {
  if (/^\/settings\/topicEdit\/\d+$/.test(vm.$route.path)) {
    return '确定退出吗?'
  }
}
