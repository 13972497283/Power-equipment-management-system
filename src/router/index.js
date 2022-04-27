import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {
  useStore
} from 'vuex'
const store = useStore()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter (to, from, next) { // 进入登录页面之前做的校验
      const isLogin = localStorage.loginState// 拿到登录状态
      if (isLogin > 0) { // 如果已经登录，那么就不能再跳到登录页面
        next({ name: 'Home' })// 那下一步就需要跳到home页面
      } else {
        next()// 如果没有登录，那么就正常执行下一步（根据指示跳转）
      }
    }
  },
  {
    path: '/record',
    name: 'Record',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Record.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.loginState // 拿到登录状态
  if (isLogin == 0 && to.name !== 'Login') { // 每个组件跳转前都做个校验如果没有登录并且将要跳转的页面不是Login也不是Register那么就跳转到登录界面
    next({ name: 'Login' })
  } else { // 否则下一步正常执行
    next()
  }
  next()
})
export default router
