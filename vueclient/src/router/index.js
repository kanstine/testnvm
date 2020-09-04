import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home.vue')
const HomePage = () => import('../views/HomePage.vue')
const Page404 = () => import('../views/404.vue')
const Page403 = () => import('../views/404.vue')

const Login = () => import('../views/Login.vue')

const BHome = () => import('../views/blogs/index.vue')

const LearnNotes = () => import('../views/lnotes/index.vue')

const ArticleHome = () => import('../views/article/index.vue')

const menuRoutes = [
  {
    path: '/user',
    component: Home,
    redirect: '/user/UserPage',
    meta: { title: 'Home', icon: 'iconfont icon-manage' },
    children: [
      { path: 'HomePage', component: HomePage, meta: { title: 'HomePage' } },
      { path: 'UserPage', component: () => import('../views/user/UserPage.vue'), meta: { title: 'User' } }
    ]
  }, {
    path: '/tool',
    component: Home,
    redirect: '/tool/Schedule',
    meta: { title: 'Tool', icon: 'iconfont icon-manage' },
    children: [
      { path: 'Schedule', component: () => import('../views/tool/Schedule.vue'), meta: { title: 'Schedule' } }
    ]
  }, {
    path: '/blogs',
    component: BHome,
    redirect: '/blogs/HomePage2',
    meta: { title: 'Blogs', icon: 'iconfont icon-manage' },
    children: [
      { path: 'HomePage2', component: () => import('../views/blogs/HomePage.vue'), meta: { title: 'Blogs' } }
    ]
  }, {
    path: '/notes',
    component: LearnNotes,
    redirect: '/notes/Home',
    meta: { title: 'Blogs', icon: 'iconfont icon-manage' },
    children: [
      { path: 'Home', component: () => import('../views/lnotes/Catalog.vue'), meta: { title: '知识点笔记' } },
      { path: 'Base', component: () => import('../views/lnotes/javas/BaseJs.vue'), meta: { title: 'Base' } }
    ]
  }, {
    path: '/article',
    component: ArticleHome,
    redirect: '/article/Show',
    meta: { title: 'Blogs', icon: 'iconfont icon-manage' },
    children: [
      { path: 'Show', component: () => import('../views/article/ShowArticle.vue'), meta: { title: '文章' } },
      { path: 'Write', component: () => import('../views/article/WriterArticle.vue'), meta: { title: '写文章' } },
      { path: 'Mould', component: () => import('../views/article/MouldPage.vue'), meta: { title: '模板' } }
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
