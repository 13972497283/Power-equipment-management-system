<template>
  <div class="continer" @click="showEC=false">
    <Header />
    <div class="continer__main">
      <Aside current="record" />
      <div class="continer__main__content">
        <div class="buttons">
          <el-input placeholder="请输入关键字" clearable v-model="input" style="width:3rem ;margin-right:.1rem" />
          <el-button type="primary"><span class="iconfont" style="margin-right:.05rem;font-size:.2rem">&#xe621;</span>查询
          </el-button>
        </div>

        <el-table :data="tableData" style="width: 9.8rem" height="395" border highlight-current-row fit>
          <el-table-column fixed prop="RFID" label="RFID编码" align="center" width="100" />
          <el-table-column prop="status" label="运行状态" align="center" width="100" />
          <el-table-column prop="manufacturer" label="厂家" align="center" width="200" />
          <el-table-column prop="money" label="购置金额" align="center" width="100" />
          <el-table-column prop="buyTime" label="购置时间" align="center" width="200" />
          <el-table-column prop="scrapTime" label="报废时间" align="center" width="200" />
          <el-table-column prop="location" label="所在地" align="center" width="200" />
          <el-table-column prop="use" label="设备用途" align="center" width="200" />
          <el-table-column prop="type" label="设备类型" align="center" width="100" />
          <!-- prop="maintainList"  scope.row就相当于取这一行的所有数据，即列表中这完整的一项-->
          <el-table-column label="维修情况" align="center" width="200">
            <template v-slot="scope">
              <div v-for="(item,index) in scope.row.maintainList" :key="index">
                {{item.time}}:{{item.describe}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label=" 操作" fixed="right" align="center" width="200">
            <!-- <div> -->
            <template v-slot="scope">
              <el-button @click="openDetail(scope)">查看</el-button>
              <el-button type="primary" :disabled="notUse(scope.$index,scope.row)"
                @click="editItem(scope.row,scope.$index)">修改
              </el-button>
              <el-button type="danger" :disabled="notUse(scope.$index,scope.row)" @click="scrapItem(scope.$index)">报废
              </el-button>
            </template>

          </el-table-column>
        </el-table>


      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Aside from '../components/Aside.vue'
  export default {
    name: 'Record',
    components: {
      Header,
      Aside
    },
    setup() {

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



    &__main {
      display: flex;
      margin: 0 auto;
      padding: .2rem;
      background-color: #F2F6FC;

      &__content {
        background: #fff;
        padding: .2rem;
        border-radius: .04rem;

      }
    }
  }

  .buttons {
    display: flex;
    margin-bottom: .1rem;
  }

</style>
