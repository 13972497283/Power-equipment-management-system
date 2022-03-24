import { createStore } from 'vuex'
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
export default createStore({
  state: {
    identifications: [{
      name: 'admin',
      password: '123456'
    },
    {
      name: 'gLeader',
      password: '123456'
    }], //管理员与组长的账号密码
    loginState: null,//判断登陆者的身份，1为管理员，2为组长,0是未登录
    equipmentList: [{
      RFID: '001',
      status: '正常',//运行状态
      manufacturer: '三峡电力设备有限公司',//厂家
      money: '180',
      buyTime: '2022-2-19',//购置时间
      scrapTime: '',//报废时间
      location: '湖北宜昌',
      use: '用于三峡大学教学楼供电',//用途
      type: '配电柜',
      maintainList: [{ time: '2022-3-19', describe: '外壳维修' }, { time: '2022-3-19', describe: '外壳维修' }],//维修情况
    }, {
      RFID: '002',
      status: '正常',//运行状态
      maintainList: [{ time: '2022-3-19', describe: '外壳维修' }, { time: '2022-3-19', describe: '外壳维修' }],//维修情况
      manufacturer: '三峡电力设备有限公司',//厂家
      money: '180',
      buyTime: '2022-2-19',//购置时间
      scrapTime: '',//报废时间
      location: '湖北宜昌',
      use: '用于三峡大学教学楼供电',//用途
      type: '配电柜'
    },],

    historyRecord: [{
      time: '',
      RFID: '',
      handle: '',//操作
      handler: ''//操作者
    }]

  },
  mutations: {


    setLoginState (state, payload) {//payload为参数
      state.loginState = payload
    },
    // 添加设备
    addEquipments (state, payload) {
      state.equipmentList.push(payload)
    },
    scrapEquipment (state, payload) {
      state.equipmentList[payload].status = "已报废"
      state.equipmentList[payload].scrapTime = getCurrentTime()
    }
  },


  actions: {
  },
  modules: {
  }
})
