<template>
  <div class="continer" @click="showEC=false">
    <Header />
    <div class="continer__main">
      <Aside current='home' />
      <div class="continer__main__content">
        <div class="buttons">
          <el-input placeholder="请输入关键字" clearable v-model="input" style="width:3rem ;margin-right:.1rem" />
          <el-button type="primary" @click="handleSearch" :disable="permission"><span class="iconfont"
              style="margin-right:.05rem;font-size:.2rem">&#xe621;</span>查询
          </el-button>
          <el-button type="primary" @click="handleAdd" :disabled="permission"><span class="iconfont"
              style="margin-right:.05rem">&#xe60e;</span>新增
          </el-button>
        </div>

        <el-table :data="empty==''? tableData:selectedList" style="width: 9.8rem" height="395" border
          highlight-current-row fit>
          <el-table-column fixed prop="RFID" label="RFID编码" align="center" width="100" />
          <el-table-column prop="status" label="运行状态" align="center" width="100" />
          <el-table-column prop="use" label="设备用途" align="center" width="200" />
          <el-table-column prop="type" label="设备类型" align="center" width="100" />
          <el-table-column prop="buyTime" label="购置时间" align="center" width="200" />
          <el-table-column prop="location" label="所在地" align="center" width="200" />

          <el-table-column prop="scrapTime" label="报废时间" align="center" width="200" />

          <!-- prop="maintainList"  scope.row就相当于取这一行的所有数据，即列表中这完整的一项-->
          <el-table-column prop="manufacturer" label="厂家" align="center" width="200" />
          <el-table-column prop="money" label="购置金额" align="center" width="100" />

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
              <el-button @click="openDetail(scope.row)" >查看</el-button>
              <el-button type="primary" :disabled="notUse(scope.$index,scope.row)"
                @click="editItem(scope.row,scope.$index)">修改
              </el-button>
              <el-button type="danger" style="margin:6px 0px 0px 0px" :disabled="notUse(scope.$index,scope.row)"
                @click="scrapItem(scope.$index,scope.row)">报废
              </el-button>
              <el-button type="warning" :disabled="notUse(scope.$index,scope.row)"
                @click="deleteItem(scope.$index,scope.row)" style="margin:6px 0px 0px 12px">删除
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
                <!-- prop用来对应校验规则rules中的每一项 -->
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
                </el-select>
              </el-form-item>
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
          <el-form  :model="currentItem" label-width="120px" :rules="rules" ref="editrule" >
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

            <el-button type="text" style="margin-left:1.21rem; position=relative;margin-top:-50px"
              @click="addmaintain=true">新建维修
            </el-button>
            <el-form-item label="维修时间" v-if="addmaintain" prop="newMaintainTime">
              <el-date-picker v-model="newMaintain.time" type="date" placeholder="选择日期" style="width: 2rem"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
              <el-button type="danger" style="margin-left:5px" @click="deleteNewMaintain">删除</el-button>
              <el-button type="primary" style="margin-left:5px" @click="handleAddMaintain">确认</el-button>
            </el-form-item>
            <el-form-item label="维修描述" v-if="addmaintain" prop="newMaintainDescribe">
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

        <!-- 查看 -->
        <el-dialog v-model="detailDialogVisible" title="详情" width="60%" :before-close="handleClose">
        
          <div class="app-container" id="printForm">
            <div style="display: flex;"><h2 align="center" style="margin-bottom: 15px;text-align: center;width: 100%;">设备信息详情表 </h2> 
            <div class="iconfont" @click="print" style="margin-top: 5px;font-size: 20px;cursor: pointer;">&#xe6c9;</div>
          </div>
            <p align="right" style="margin-bottom: 10px;">负责人：{{printTable.handler}}&emsp; &emsp; &emsp;&emsp;日期：{{printTable.currentTime}}</p>
            
            <!-- 表格 -->
            <table align="center" valign="middle" border="1" width="100%"
              cellspacing="0">
                <tr align="center" valign="middle">
                    <td rowspan="2" width="25%" style="padding: 10px;">RFID编码</td>
                    <td rowspan="2" width="25%" style="padding: 10px;">{{printTable.RFID}}</td>
                    <td width="25%" style="padding: 10px;">运行状态</td>
                    <td width="25%" style="padding: 10px;">{{printTable.status}}</td>
                </tr >
                <tr align="center" valign="middle">
                    <td style="padding: 10px;">设备类型</td>
                    <td style="padding: 10px;">{{printTable.type}}</td>
                </tr>
        
                <tr align="center">
                    <td style="padding: 10px;">购置时间</td>
                    <td  style="padding: 10px;" align="center" valign="middle">{{printTable.buyTime}}</td>
                    <td style="padding: 10px;">报废时间</td>
                    <td  style="padding: 10px;" align="center" valign="middle">{{printTable.scrapTime||'未报废'}}</td>
                </tr>
                <tr align="center">
                  <td style="padding: 10px;">生产厂家</td>
                  <td style="padding: 10px;" align="center" valign="middle">{{printTable.manufacturer}}</td>
                  <td style="padding: 10px;">购置金额</td>
                  <td style="padding: 10px;" align="center" valign="middle">{{printTable.money}}元</td>
              </tr>
              <tr align="center">
                <td style="padding: 10px;">设备所在地</td>
                <td style="padding: 10px;" align="center" colspan="3" valign="middle">{{printTable.location}}</td>
                
            </tr>
            <tr align="center">
              <td style="padding: 10px;">设备用途</td>
              <td style="padding: 10px;" align="center" colspan="3" valign="middle">{{printTable.use}}</td>
          </tr>
          <tr align="center">
            <td style="padding: 10px;" colspan="4">维修情况</td>      
        </tr>
        <tr align="center">
          <td style="padding: 10px;" colspan="1">维修时间</td>  
          <td style="padding: 10px;" colspan="3">维修描述</td>    
      </tr>
      <tr align="center" v-for="(item,index) in printTable.maintainList " :key=index>
        <td style="padding: 10px;" colspan="1">{{item.time}}</td>  
        <td style="padding: 10px;" colspan="3">{{item.describe}}</td>    
    </tr>
    <tr v-if="!printTable.maintainList">
      <td colspan="4" style="padding: 10px;" align="center">暂无维修信息</td>
    </tr>
            </table>
        </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="detailDialogVisible = false">关闭</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    ref,
    reactive
  } from 'vue'
  import '../style/iconfont.css'
  import {
    ElMessageBox,
    ElMessage
  } from 'element-plus'
  import {
    useStore
  } from 'vuex'
  import
  Header
  from '../components/Header'
  import Aside from '../components/Aside.vue'
  // import printJS from 'print-js'
  import print from 'print-js'
  function clone(obj) {
    if (typeof obj === "string", typeof obj === "number", typeof obj === "boolean", typeof obj === "undefined") {
      return obj;
    } else if (Array.isArray(obj)) {
      let arr = JSON.parse(JSON.stringify(obj));
      return arr;
    } else if (obj instanceof(obj)) {
      let obj2 = {};
      for (let k in obj) {
        obj2[k] = clone(obj[k]);
      }
      return obj2;
    }
  }
  const getCurrentTime = () => {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  var currentTime = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds

  return currentTime
}
  export default {
    name: 'Home',
    components: {
      Header,
      Aside
    },
    setup() {
      let showEC = ref(false)
      let input = ref("")
      const dialogVisible = ref(false)
      const editDialogVisible = ref(false)
      const  detailDialogVisible=ref(false)
      const store = useStore()
      const tableData = reactive(store.state.equipmentList)
      let currentItem = ref({})
      let currentTitle = ref('')
      let addmaintain = ref(false)
      let empty = ref('')
      let selectedList = ref([])
      let printTable=ref({})
      let permission=ref(store.state.loginState==1?false:true)
   
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
            detailDialogVisible.value=false
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
        newMaintainTime: [{
          required: true,
          message: '请选择维修时间，如不需要此项请点击"删除"',
          trigger: 'blur'
        }],
        newMaintainDescribe: [{
          required: true,
          message: '请输入维修描述，如不需要此项请点击"删除"',
          trigger: 'blur'
        }]
      })
      let formrule = ref(null) //将表单节点绑定在此元素上
      const addSubmit = () => {
        const subForm = form.value
        formrule.value.validate(valid => { //根据输入是否合法进行不同操作
          if (valid) {

            console.log(111)
            store.commit('addEquipments', subForm)
            store.commit('addRecord', {
              'RFID': subForm.RFID,
              'handle': '新增设备'
            })
            console.log(store.state.historyRecord, '历史记录')


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

      const scrapItem = (index, row) => {
        ElMessageBox.confirm(
            '是否确定报废该设备？该操作不可逆，报废后将无法操作该设备，请谨慎操作！！！',
            'Warning', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
          .then(() => {
            store.commit('scrapEquipment', index)
            store.commit('addRecord', {
              'RFID': row.RFID,
              'handle': '报废设备'
            })
            ElMessage({
              type: 'success',
              message: '操作成功',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '操作取消',
            })
          })

      }
      const notUse = (index, row) => {
        if(permission.value){
          return true
        }else{
          if (row.status == "已报废") {
          console.log("1")
          return true
        }
        console.log("2")
        return false
      }
        }
        

      const openDetail = (row) => {
        printTable.value=row
        printTable.value.handler=store.state.identifications[store.state.loginState - 1].name
        printTable.value.currentTime=getCurrentTime()
        detailDialogVisible.value=true  
        store.commit('addRecord', {
                  'RFID': printTable.value.RFID,
                  'handle': '查看设备信息'
                })      
        console.log(printTable,"print")
      }

      /*打印设备信息*/
  const print=()=>{
    printJS('printForm','html')
    store.commit('addRecord', {
                  'RFID': printTable.value.RFID,
                  'handle': '打印设备信息'
                })    
  }
      const editItem = (row, index) => {
        editDialogVisible.value = true
        currentItem.value.status = row.status
        currentItem.value.location = row.location
        currentItem.value.use = row.use
        currentItem.value.maintainList = clone(row.maintainList)
        currentTitle.value = row.RFID
        console.log(currentItem.value)
        equipmentIndex.value = index
      }

      const handleAddMaintain = () => {
        addmaintain.value = false
        if (!currentItem.value.maintainList) {
          currentItem.value.maintainList = []
        }
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

      let editrule = ref(null)

      const editSubmit = () => {

        editrule.value.validate(valid => { //根据输入是否合法进行不同操作
          if (valid) {
            //   ElMessage({
            //     message: '添加成功',
            //     type: 'success',
            //   })
            // } else {
            //   ElMessage({
            //     message: '添加失败，存在不符合要求的输入',
            //     type: 'error',
            //   })

            ElMessageBox.confirm(
                '确认提交此次修改吗',
                'Warning', {
                  confirmButtonText: '确认',
                  cancelButtonText: '取消',
                  type: 'warning',
                }
              )
              .then(() => {
                store.commit('editEquipment', {
                  'index': equipmentIndex.value,
                  'item': currentItem.value
                })
                store.commit('addRecord', {
                  'RFID': currentTitle.value,
                  'handle': '修改设备信息'
                })
                editDialogVisible.value = false
                ElMessage({
                  type: 'success',
                  message: '修改信息已提交',
                })
              }).catch(() => {
                ElMessage({
                  type: 'info',
                  message: '取消操作',
                })
              })
          } else {
            ElMessage({
              message: '修改失败，存在不符合要求的输入',
              type: 'error',
            })
          }
        })
            }
      const deleteItem = (index, row) => {
        ElMessageBox.confirm(
            '确认删除该设备信息？该操作不可逆，删除后将无法恢复该设备任何信息，请谨慎操作！！！',
            'Warning', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
          .then(() => {
            store.commit('deleteEquipment', index)
            store.commit('addRecord', {
              'RFID': row.RFID,
              'handle': '删除设备信息'
            })
            selectedList.value.splice(index, 1) //查询筛选中一并删除
            ElMessage({
              type: 'success',
              message: '设备删除成功',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消操作',
            })
          })
      }
      const handleSearch = () => {
        selectedList.value = []
        empty.value = input.value
        let obj = {}
        if (empty.value !== '') {
          for (let equipment in tableData) {
            for (let item in tableData[equipment]) {
              if (tableData[equipment][item].indexOf(input.value) > -1) {
                if (!obj[tableData[equipment].RFID]) {
                  console.log(tableData[equipment][item], '符合')
                  selectedList.value.push(tableData[equipment])
                  obj[tableData[equipment].RFID] = true
                }
              }
            }
          }
        }
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
        editrule,
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
        editSubmit,
        deleteItem,
        selectedList,
        handleSearch,
        empty,
        detailDialogVisible,
        printTable,
        print,
        permission
      }
    }

  }

</script>


<style scoped lang="scss">
  .continer {
    margin: 0;
    padding: 0;
    background-color: #F2F6FC;
    margin-bottom: 0;
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
