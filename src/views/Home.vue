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
        <div class="buttons">
          <el-input placeholder="请输入关键字" clearable v-model="input" style="width:3rem ;margin-right:.1rem" />
          <el-button type="primary"><span class="iconfont" style="margin-right:.05rem;font-size:.2rem">&#xe621;</span>查询
          </el-button>
          <el-button type="primary" @click="handleAdd"><span class="iconfont"
              style="margin-right:.05rem">&#xe60e;</span>新增
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

        <!-- 新增 -->
        <el-dialog v-model="dialogVisible" title="添加" width="60%" :before-close="handleClose">
          <!-- 添加设备 -->
          <el-form :model="form" label-width="120px" :rules="rules" ref="formrule">
            <!--  ref用于将表单节点绑定在此元素上 -->
            <div style="display:flex">
              <el-form-item label="RFID编码" prop="RFID">
                <el-input v-model="form.RFID" style="width:2rem " />
              </el-form-item>
              <el-form-item label="设备用途" prop="use">
                <el-input style="width:2rem" v-model="form.use" />
              </el-form-item>
            </div>
            <div style="display:flex">
              <el-form-item label="设备类型" prop="type">
                <el-input style="width:2rem" v-model="form.type" />
              </el-form-item>
              <el-form-item label="所在地" prop="location">
                <el-input style="width:2rem" v-model="form.location" />
              </el-form-item>
            </div>
            <div style="display:flex">
              <el-form-item label="购置时间" prop="buyTime">
                <el-date-picker v-model="form.buyTime" type="date" placeholder="选择日期" style="width: 2rem"
                  format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
              </el-form-item>
              <el-form-item label="购置金额" prop="money">
                <el-input style="width:2rem" v-model="form.money" placeholder="单位：元" />
              </el-form-item>
            </div>
            <div style="display:flex">
              <el-form-item label="厂家" prop="manufacturer">
                <el-input style="width:2rem" v-model="form.manufacturer" />
              </el-form-item>
              <el-form-item label="运行状态" prop="status">
                <el-select v-model="form.status" placeholder="选择状态" style="width:2rem">
                  <el-option label="正常" value="正常" />
                  <el-option label="暂停" value="暂停" />
                  <el-option label="维修中" value="维修中" />
                  <!-- <el-option label="报废" value="报废" /> -->
                </el-select>
              </el-form-item>
              <!-- <input v-model="test" /> -->
            </div>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addSubmit">提交</el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 新增 -->

        <!-- 修改 -->
        <el-dialog v-model="editDialogVisible" :title="currentTitle" width="40%" :before-close="handleClose">
          <el-form :model="currentItem" label-width="120px">
            <!-- <el-form :model="currentItem" label-width="120px" :rules="rules" ref="formrule"> -->
            <!--  ref用于将表单节点绑定在此元素上 -->

            <el-form-item label="设备用途" prop="use">
              <el-input style="width:2rem" v-model="currentItem.use" />
            </el-form-item>
            <el-form-item label="所在地" prop="location">
              <el-input style="width:2rem" v-model="currentItem.location" />
            </el-form-item>

            <el-form-item label="运行状态" prop="status">
              <el-select v-model="currentItem.status" placeholder="选择状态" style="width:2rem">
                <el-option label="正常" value="正常" />
                <el-option label="暂停" value="暂停" />
                <el-option label="维修中" value="维修中" />
              </el-select>
            </el-form-item>
            <el-form-item label="维修情况">
              <template v-for="(item,index) in currentItem.maintainList" :key=index>
                {{item.time}}:{{item.describe}}<br />
              </template>
            </el-form-item>

            <el-button type="text" style="margin-left:1.21rem; position=relative;margin-top:-40px"
              @click="addmaintain=true">新建维修
            </el-button>

            <el-form-item label="维修时间" v-if="addmaintain">
              <el-date-picker v-model="newMaintain.time" type="date" placeholder="选择日期" style="width: 2rem"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
              <el-button type="danger" style="margin-left:5px" @click="deleteNewMaintain">删除</el-button>
              <el-button type="primary" style="margin-left:5px" @click="handleAddMaintain">确认</el-button>

            </el-form-item>
            <el-form-item label="维修描述" v-if="addmaintain">
              <el-input type="textarea" style="width:2rem " rows="2" v-model="newMaintain.describe" />

            </el-form-item>

          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="editSubmit">提交</el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 修改 -->

      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    reactive,
    nextTick
  } from 'vue'
  import '../style/iconfont.css'
  import {
    ElMessageBox,
    ElMessage
  } from 'element-plus'
  import {
    useStore
  } from 'vuex'

  export default {
    name: 'Home',
    setup() {
      let showEC = ref(false)
      let input = ref("")
      const dialogVisible = ref(false)
      const editDialogVisible = ref(false)
      const store = useStore()
      const tableData = reactive(store.state.equipmentList)
      let currentItem = ref({})
      let currentTitle = ref('')
      let addmaintain = ref(false)
      let newMaintain = ref({
        time: '',
        describe: ''
      })
      let equipmentIndex = ref("")
      let form = ref({
        RFID: '',
        use: '',
        type: '',
        location: '',
        buyTime: '',
        money: '',
        manufacturer: '',
        status: '',
      })
      const handleClose = () => {
        ElMessageBox.confirm('确定关闭此窗口?')
          .then(() => {
            dialogVisible.value = false
            editDialogVisible.value = false
          })
          .catch(() => {
            // catch error
          })
      }
      const rules = reactive({
        RFID: [{
          required: true,
          message: '请输入RFID编码',
          trigger: 'blur'
        }],
        use: [{
          required: true,
          message: '请输入设备用途',
          trigger: 'blur',
        }, ],
        type: [{
          required: true,
          message: '请输入设备类型',
          trigger: 'blur',
        }, ],
        location: [{
          required: true,
          message: '请输入所在地',
          trigger: 'blur',
        }, ],
        buyTime: [{
          type: 'date',
          required: true,
          message: '请选择购置时间',
          trigger: 'blur',
        }, ],
        money: [{
          required: true,
          message: '请输入购置金额',
          trigger: 'blur',
        }, ],
        manufacturer: [{
          required: true,
          message: '请输入厂家',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '请选择运行状态',
          trigger: 'blur'
        }],
      })
      let formrule = ref(null) //将表单节点绑定在此元素上

      const addSubmit = () => {

        const subForm = form.value
        formrule.value.validate(valid => {
          if (valid) {
            console.log(111)
            store.commit('addEquipments', subForm)
            console.log(store.state.equipmentList, form)
            dialogVisible.value = false
            ElMessage({
              message: '添加成功',
              type: 'success',
            })

          } else {

            ElMessage({
              message: '添加失败，存在不符合要求的输入',
              type: 'error',
            })
          }

        })

      }




      const handleAdd = () => {
        console.log(1)
        form.value = {
          RFID: '',
          use: '',
          type: '',
          location: '',
          buyTime: '',
          money: '',
          manufacturer: '',
          status: '',
        }
        console.log(2)
        dialogVisible.value = true
      }

      const scrapItem = (index) => {
        store.commit('scrapEquipment', index)
      }
      const notUse = (index, row) => {
        if (row.status == "已报废") {
          console.log("1")
          return true
        }
        console.log("2")
        return false
      }

      const openDetail = (scope) => {
        console.log(scope, "scope")
      }
      const editItem = (row, index) => {
        editDialogVisible.value = true
        currentItem.value = row
        currentTitle.value = currentItem.value.RFID
        console.log(currentItem.value)
        equipmentIndex.value = index
      }

      const handleAddMaintain = () => {
        addmaintain.value = false
        currentItem.value.maintainList.push(newMaintain.value)
        console.log(currentItem)
        newMaintain.value = {
          time: '',
          describe: ''
        }
      }
      const deleteNewMaintain = () => {
        // currentItem.value.maintainList.pop()
        addmaintain.value = false
        console.log(currentItem.value.maintainList)
      }
      const editSubmit = () => {
        store.commit('editEquipment', {
          'index': equipmentIndex.value,
          'item': currentItem.value
        })
        editDialogVisible.value = false
      }
      return {
        tableData,
        showEC,
        input,
        form,
        dialogVisible,
        editDialogVisible,
        handleClose,
        rules,
        addSubmit,
        formrule,
        handleAdd,
        scrapItem,
        notUse,
        openDetail,
        editItem,
        currentItem,
        currentTitle,
        addmaintain,
        handleAddMaintain,
        newMaintain,
        deleteNewMaintain,
        editSubmit
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
        cursor: pointer;

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
        margin: auto .65rem;
        cursor: pointer;

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
    cursor: pointer;
  }

  .buttons {
    display: flex;
    margin-bottom: .1rem;
  }

</style>
