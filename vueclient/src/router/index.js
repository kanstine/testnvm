import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home.vue')
const HomePage = () => import('../views/HomePage.vue')
const Page404 = () => import('../views/404.vue')
const Page403 = () => import('../views/404.vue')

const Login = () => import('../views/Login.vue')

const menuRoutes = [
  {
    path: '/user',
    component: Home,
    redirect: '/user/UserPage',
    meta: { title: 'Home', icon: 'iconfont icon-manage' },
    children: [
      { path: 'HomePage', component: HomePage, meta: { title: 'HomePage' } },
      // { path: 'Login', component: Login, meta: { title: 'Login' } },
      { path: 'UserPage', component: () => import('../views/user/UserPage.vue'), meta: { title: 'User' } }
    ]
  }
]

const routes = [
  {
    path: '/',
    // redirect: '/user/Login'
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  ...menuRoutes,
  {
    path: '/error',
    component: Home,
    meta: { title: '出错了' },
    children: [
      { path: '404', component: Page404, meta: { title: '页面未找到' } },
      { path: '403', component: Page403, meta: { title: '没有权限' } }
    ]
  },
  { path: '*', redirect: '/error/404' }
]

Vue.use(Router)

export default new Router({
  routes: routes
})

export { menuRoutes }
