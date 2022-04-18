   <template>
     <div class="header">
       <div class="header__title">电力设备管理系统
       </div>
       <div class="header__image" @mouseenter="showEC=!showEC">
         <el-avatar :src="imgUrl"></el-avatar>
       </div>
       <div v-show="showEC" @mouseleave="showEC=!showEC">
         <el-card shadow="hover" class="header__edit">
           <div @click="editVisible">个人中心</div>
           <el-divider />
           <div @click="logout">退出登录</div>
         </el-card>

         <el-dialog v-model="dialogVisible" title="个人中心" width="30%" >
        <!-- 头像 -->
        <div style="display: flex;">
           <div>
          <img style="width: 1rem; height: 1rem;" v-if="imgUrl" :src="imgUrl" @click="changeImage"  />
          <input type="file"  id="upload" style="display:none;" accept="image/gif,image/jpeg,image/png,image/jpg" @change="changepic"/>
        </div>
        <div style="margin-left:.05rem">
        <div style="font-size: .2rem;color: black;">用户名：{{username}}</div>
        <el-button type="text" @click="showOldInput=!showOldInput">想要修改密码？点这里</el-button>
        <div style="display: flex;">
          <el-input v-if="showOldInput" type="password" v-model="oldpassword" placeholder="请输入原始密码" style="margin: 0 .1rem .1rem 0;width: 1.8rem;" clearable />
        <el-button type="primary" v-if="showOldInput" @click="handleCheck" >验证</el-button>
        </div>
        <el-input v-if="showNewInput"  type="password" v-model="newpassword" placeholder="请输入新密码" style="margin-bottom:.1rem;width: 1.8rem;" clearable />
        <el-input v-if="showNewInput"  type="password" v-model="ensurepassword" placeholder="请再次确认新密码" style="width: 1.8rem;" clearable />
      </div>
      </div>
           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible = false">取消</el-button>
               <el-button type="primary" @click="handleSubmit">提交</el-button>
             </span>
           </template>
         </el-dialog>

       </div>
     </div>
   </template>

   <script >
     import {
       ref,
       reactive,
     } from 'vue'
     import {
       ElMessageBox
     } from 'element-plus'
     import { Plus } from '@element-plus/icons-vue'
     import { UploadFilled } from '@element-plus/icons-vue'
import '../style/iconfont.css'
import {
    useRouter
  } from 'vue-router'
  import {
    useStore
  } from 'vuex'

  import { ElMessage } from 'element-plus'
     export default {
       name: 'Header',
       setup() {
        //  密码修改
const store=useStore()
const username=store.state.identifications[store.state.loginState-1].name
console.log(username,"username")
console.log(store.state.identifications,"identifications")
const oldpassword=ref("")
const newpassword=ref("")
const ensurepassword=ref("")
const showNewInput=ref(false)
const showOldInput=ref(false)
const handleCheck=()=>{
  if(oldpassword.value==store.state.identifications[store.state.loginState-1].password){
    showOldInput.value=false
    showNewInput.value=true
  }else{
    ElMessage({
    showClose: true,
    message: '密码验证错误！！！',
    type: 'error',
  })
  }
}
const handleSubmit=()=>{
if(newpassword.value!==''&&ensurepassword.value!==''&&newpassword.value===ensurepassword.value){
  store.commit("setNewPassWord",newpassword)
  ElMessage({
    showClose: true,
    message: '密码修改成功！',
    type: 'success',
  })
}else{
  ElMessage({
    showClose: true,
    message: '两次密码不同，密码修改失败！',
    type: 'error',
  })
}
dialogVisible.value=false
}
// 图片上传
const imgUrl=ref(store.state.identifications[store.state.loginState-1].imageURL||'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
// if(store.state.identifications[store.state.loginState-1].imageURL){
// const  imgUrl=ref(store.state.identifications[store.state.loginState-1].imageURL
// }

function changeImage(){
  document.getElementById('upload').click()
}
var f
var img
    function changepic () {
      var reads = new FileReader()
      f = document.getElementById('upload').files[0]
      reads.readAsDataURL(f)
      reads.onload = function () {
        // document.getElementById('upload').src = this.result
        imgUrl.value = this.result
        // sessionStorage.img = JSON.stringify(imgUrl.value)
        store.commit("setHeadImage",imgUrl.value)
        console.log(this.result)
      }
    }
  
         let showEC = ref(false)
         const dialogVisible = ref(false)
         const editVisible = () => {
           dialogVisible.value = true
           console.log("个人中心")
         }
         const router=useRouter()
       const logout=()=>{
        store.commit('setLoginState', 0)
        console.log(store.state.loginState,"loginState")
         router.push({name:'Login'})
        
       }
         return {
           showEC,
          logout,
           dialogVisible,
           editVisible,
          changepic,
           imgUrl,
           changeImage,
           username,
           oldpassword,
           newpassword,
           ensurepassword,
          showNewInput,
          showOldInput,
          handleCheck,
          handleSubmit
         }
       }
     }

   </script>


   <style lang="scss" scoped>
     .header {
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

     .dialog-footer button:first-child {
       margin-right: 10px;
     }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .headImage{
   font-size: 0.7rem;
  }

   </style>
