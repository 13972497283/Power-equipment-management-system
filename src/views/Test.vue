<template>
    <div class="app-container" id="printForm">
  
        <!-- 表单 -->
        <!-- <el-form id="printForm" ref="form" :model="order" :inline="true" size="mini" label-width="80px">
          <el-form-item label="订单号">
          123
          </el-form-item>
          <el-form-item label="合同号">
           456
          </el-form-item>
        <div>
          <el-button type="primary" @click="print">打印</el-button>
        </div>
        </el-form> -->
        <h2 align="center">设备信息详情表</h2>
        <p align="right" style="margin-bottom: 10px;">负责人：admin&emsp;  &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;日期：2022/4/19&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;  &emsp;&emsp;&emsp; &emsp;&emsp;</p>
        
        <!-- 表格 -->
        <table align="center" valign="middle" border="1"
         width="1100" height="560" cellspacing="0">
            <tr align="center" valign="middle">
                <td rowspan="2" width="300">RFID编码</td>
                <td rowspan="2" width="300">001</td>
                <td width="300">运行状态</td>
                <td width="300"></td>
            </tr >
            <tr align="center" valign="middle">
                <td>设备类型</td>
                <td></td>
            </tr>
            <!-- 3 -->
            <tr align="center">
                <td>购置时间</td>
                <td  align="center" valign="middle"></td>
                <td>报废时间</td>
                <td  align="center" valign="middle"></td>
            </tr>
            <tr align="center">
              <td>生产厂家</td>
              <td  align="center" valign="middle"></td>
              <td>购置金额</td>
              <td  align="center" valign="middle"></td>
          </tr>
          <tr align="center">
            <td>设备所在地</td>
            <td  align="center" colspan="3" valign="middle">湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市</td>
            
        </tr>
        <tr align="center">
          <td>设备用途</td>
          <td  align="center" colspan="3" valign="middle">湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市湖北省宜昌市</td>
          
      </tr>
      <tr align="center">
        <td colspan="4">维修情况</td>      
    </tr>
    <tr align="center">
      <td colspan="1">维修时间</td>  
      <td colspan="3">维修描述</td>    
  </tr>
        </table>
        
     
       
    </div>

    <button @click="print">
      打印
    </button>
  </template>
  
  <script>

  export default{
    name:"Test",
    setup() {
    const   print=() =>{
        // 打印表单
        printJS('printForm', 'html')
    }
  
  return{
    print
  }}
}
</script>