   <template>
     <div class="header">
       <div class="header__title">电力设备管理系统
       </div>
       <div class="header__image" @mouseenter="showEC=!showEC">
         <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
       </div>
       <div v-show="showEC" @mouseleave="showEC=!showEC">
         <el-card shadow="hover" class="header__edit">
           <div @click="editVisible">个人中心</div>
           <el-divider />
           <div>退出登录</div>
         </el-card>

         <el-dialog v-model="dialogVisible" title="个人中心" width="30%" :before-close="handleClose">
        <!-- 头像 -->
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>


           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible = false">Cancel</el-button>
               <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
             </span>
           </template>
         </el-dialog>

       </div>
     </div>
   </template>

   <script>
     import {
       ref,
       reactive,
     } from 'vue'
     import {
       ElMessageBox
     } from 'element-plus'

     export default {
       name: 'Header',
       setup() {
         let showEC = ref(false)
         const dialogVisible = ref(false)
         const editVisible = () => {
           dialogVisible.value = true
           console.log("个人中心")
         }
         const handleClose = () => {
           ElMessageBox.confirm('Are you sure to close this dialog?')
             .then(() => {
               done()
             })
             .catch(() => {
               // catch error
             })
         }



         return {
           showEC,
           handleClose,
           dialogVisible,
           editVisible
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

   </style>
