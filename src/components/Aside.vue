<template>
  <div class="aside ">
    <div :class="{'menu':true, 'clicked':'home'===current} ">
      <router-link :to="{name:'Home'}">
        设备管理
      </router-link>
    </div>
    <el-divider style="margin:0px" />
    <div :class="{'menu':true, 'clicked':'record'===current}">
      <router-link :to="{name:'Record'}">
        台账查询
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Aside',
    props: ['current'],
    setup() {

      return {

      }
    }
  }

</script>

<style lang='scss' scoped>
  .menu {
    position: relative;
    width: 1.8rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .15rem;
    background-color: #FFF;
    border-radius: .04rem;
    letter-spacing: .02rem;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #000;
    }
  }

  .aside {
    position: relative;
    width: 1.8rem;
    margin-right: .2rem;
  }

  .clicked {
    background: rgb(85, 116, 163);
    // color: #FFF;

    a {
      text-decoration: none;
      color: #FFF;
    }
  }

</style>
