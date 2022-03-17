<template>
  <div class="box">
    <img id="box__bg" src="../assets/background1.jpg" />
    <el-card class="box-card">

      <div class="title">电力设备管理系统</div>
      <div>
        <span class="iconfont icon">&#xe78b;</span>
        <el-input size="large" v-model="account" class="box__input" placeholder="请输入用户名" clearable />
      </div>
      <div>
        <span class="iconfont icon">&#xe675;</span>
        <el-input size="large" v-model="password" class="box__input" type="password" placeholder="请输入密码"
          show-password />
      </div>
      <div class="btn" @click="logined">登录</div>
    </el-card>
  </div>
</template>
<script>
  import {
    useRouter
  } from 'vue-router'
  import {
    useStore
  } from 'vuex'
  import {
    ref,
    reactive
  } from 'vue'
  export default {
    setup() {
      const router = useRouter()
      const store = useStore()
      const accountList = store.state.identifications
      let account = ref('')
      let password = ref('')
      const logined = () => {
        for (let item in accountList) {
          if (accountList[item].name == account.value && accountList[item].password == password.value) {
            console.log(store.state.loginState, 'vux')
            if (account.value == accountList[0].name) {
              store.commit('setLoginState', 1)
              console.log(store.state.loginState, '从vuex拿的数据')
            } else {
              store.commit('setLoginState', 2)
              console.log(store.state.loginState, '从vuex拿的数据')
            }
            router.push({
              name: 'Home'
            })
          }
        }

        console.log(accountList)
      }
      return {
        logined,
        account,
        password
      }
    }
  }

</script>

<style scoped>
  .box,
  #box__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    z-index: -100;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    position: relative;
    width: 4.8rem;
    height: 3.5rem;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 1.2rem;
    opacity: 0.99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    font-size: 0.3rem;
    margin-bottom: .2rem;
    letter-spacing: 5px;
    color: rgb(85, 116, 163);
  }

  .box__input {
    position: relative;
    width: 2.5rem;
    margin-top: .2rem;
    left: 50%;
    transform: translateX(-50%);
    /* border: 0.01rem rgb(83, 112, 159) solid; */
  }

  .btn {
    width: 2.5rem;
    height: .4rem;
    background-color: rgb(85, 116, 163);
    margin-top: .2rem;
    text-align: center;
    line-height: .4rem;
    border-radius: 4px;
    font-size: 20px;
    margin-left: 36px;
    color: aliceblue;
    letter-spacing: 20px;
    cursor: pointer;
  }

  .icon {
    font-size: .18rem;
    color: rgb(85, 116, 163);
    ;
  }

</style>
