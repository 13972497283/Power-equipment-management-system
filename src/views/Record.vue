<template>
  <div class="continer" @click="showEC=false">
    <Header />
    <div class="continer__main">
      <Aside current="record" />
      <div class="continer__main__content">
        <div class="buttons">
          <el-input placeholder="请输入关键字" clearable v-model="input" style="width:3rem ;margin-right:.1rem" />
          <el-button type="primary" @click="handleSearch"><span class="iconfont"
              style="margin-right:.05rem;font-size:.2rem">&#xe621;</span>查询
          </el-button>
        </div>

        <el-table :data="empty==''?recordList:selectedList" style="width: 9.8rem" height="395" border
          highlight-current-row fit>
          <el-table-column prop="RFID" label="RFID编码" align="center" />
          <el-table-column prop="time" label="时间" align="center" />
          <el-table-column prop="handle" label="操作" align="center" />
          <el-table-column prop="handler" label="操作者" align="center" />
          <!-- <el-table-column label=" 操作" align="center">
       
            <template v-slot="scope">
              <el-button @click="openDetail(scope)">查看</el-button>
              <el-button type="primary" :disabled="notUse(scope.$index,scope.row)"
                @click="editItem(scope.row,scope.$index)">修改
              </el-button>
              <el-button type="danger" :disabled="notUse(scope.$index,scope.row)" @click="scrapItem(scope.$index)">报废
              </el-button>
            </template>

          </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Aside from '../components/Aside.vue'
  import {
    useStore
  } from 'vuex'
  import {
    ref,
    reactive
  } from 'vue'
  export default {
    name: 'Record',
    components: {
      Header,
      Aside
    },
    setup() {
      const store = useStore()
      const recordList = reactive(store.state.historyRecord)
      let input = ref('')
      let empty = ref('')
      let selectedList = ref([])
      const handleSearch = () => {
        selectedList.value = []
        empty.value = input.value
        let obj = {}
        if (empty.value !== '') {
          for (let record in recordList) {
            for (let item in recordList[record]) {
              if (recordList[record][item].indexOf(input.value) > -1) {
                if (!obj[recordList[record].key]) {
                  console.log(recordList[record][item], '符合')
                  selectedList.value.push(recordList[record])
                  obj[recordList[record].time] = true
                }
              }


            }

          }
        }
      }
      return {
        recordList,
        handleSearch,
        input,
        empty,
        selectedList
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
