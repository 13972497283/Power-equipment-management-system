   <template>
     <div class="header">
       <div class="header__title">电力设备管理系统
       </div>
       <div class="header__image" @mouseenter="showEC=!showEC">
         <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
       </div>
       <div v-show="showEC" @mouseleave="showEC=!showEC">
         <el-card shadow="hover" class="header__edit">
           <div>个人中心</div>
           <el-divider />
           <div>退出登录</div>
         </el-card>
       </div>
     </div>
   </template>

   <script>
     import {
       ref,
       reactive,
     } from 'vue'
     export default {
       name: 'Header',
       setup() {
         let showEC = ref(false)
         return {
           showEC
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

   </style>
