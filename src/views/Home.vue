<template>
  <div class="continer" @click="showEC=false">
    <div class="continer__header">
      <div class="continer__header__title">电力设备管理系统
      </div>
      <div class="continer__header__image" @mouseenter="showEC=!showEC">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <div v-show="showEC" @mouseleave="showEC=!showEC">
        <el-card shadow="hover" class="continer__header__edit">
          <div>个人中心</div>
          <el-divider />
          <div>退出登录</div>
        </el-card>
      </div>
    </div>

    <div class="continer__main">
      <div class="continer__main__aside">

        <div class="menu">设备管理</div>
        <el-divider style="margin:0px" />
        <div class="menu">台账查询</div>
      </div>
      <div class="continer__main__content">
        <el-table :data="tableData" style="width: 9.99rem" height="425" border highlight-current-row fit>
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="320" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" fixed="right" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    reactive
  } from 'vue'
  export default {
    name: 'Home',
    setup() {
      let showEC = ref(false)

      const tableData = [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        }
      ]
      return {
        tableData,
        showEC
      }
    }

  }

</script>


<style scoped lang="scss">
  .continer {
    margin: 0;
    padding: 0;
    // width: 100%;
    background-color: #F2F6FC;
    margin-bottom: 0;
    // min-height: 99vh;
    box-sizing: border-box;

    &__header {
      position: relative;
      margin: 0 auto;
      min-height: 10vh;
      background-color: rgb(85, 116, 163);
      display: flex;

      &__edit {
        position: absolute;
        top: .58rem;
        right: .4rem;
        z-index: 100;
      }

      &__title {
        font-size: .3rem;
        flex: 1;
        margin: auto .8rem;
        letter-spacing: .1rem;
        color: #fff;
        min-width: 5rem;
      }

      &__image {
        margin: auto .65rem
      }
    }

    &__main {
      display: flex;
      margin: 0 auto;
      padding: .2rem;
      background-color: #F2F6FC;

      &__aside {
        position: relative;
        width: 1.8rem;
        margin-right: .2rem;
      }

      &__content {
        background: #fff;
        padding: .2rem;
        border-radius: .04rem;

      }
    }
  }

  .menu {
    position: relative;
    width: 1.8rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .15rem;
    background: #FFF;
    border-radius: .04rem;
    letter-spacing: .02rem;
  }

</style>
