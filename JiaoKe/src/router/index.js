import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const Edu = () => import('../components/edu')

const routes = [
  {
    path: '',
    redirect: '/edu'
  },
  {
    path: '/edu',
    component: Edu
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  if (to.path === '/edu') return next()
  next()
})

export default router
