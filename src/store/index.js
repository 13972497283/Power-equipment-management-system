import { createStore } from 'vuex'

export default createStore({
  state: {
    identifications: [{
      name: 'admin',
      password: '123456'
    },
    {
      name: 'gLeader',
      password: '123456'
    }], //管理员与组长的账号密码
    loginState: null//判断登陆者的身份，1为管理员，2为组长,0是未登录
  },
  mutations: {
    setLoginState (state, payload) {//payload为参数
      state.loginState = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
