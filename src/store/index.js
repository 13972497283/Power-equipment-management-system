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
const setLocalEquipmentList = (state) => {
  const { equipmentList } = state
  const equipmentListString = JSON.stringify(equipmentList)// 将equipmentList对象转为字符串，以便存储到localStorage
  localStorage.equipmentList = equipmentListString
  // console.log(cartListString)cartListString为字符串
}

const getLocalEquipmentList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  if (localStorage.equipmentList) {
    return JSON.parse(localStorage.equipmentList)// 对应setLocalCartList（）中的const equipmentListString = JSON.stringify(equipmentList)将字符串localStorage.equipmentList转换成对象
  } else {
    return []
  }
}

const setLocalRecordList = (state) => {
  const { historyRecord } = state
  const historyRecordString = JSON.stringify(historyRecord)// 将equipmentList对象转为字符串，以便存储到localStorage
  localStorage.historyRecord = historyRecordString
  // console.log(cartListString)cartListString为字符串
  console.log(historyRecord)
}

const getLocalRecordList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  if (localStorage.historyRecord) {
    return JSON.parse(localStorage.historyRecord)// 对应setLocalCartList（）中的const equipmentListString = JSON.stringify(equipmentList)将字符串localStorage.equipmentList转换成对象
  } else {
    return []
  }
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
    loginState: JSON.parse(localStorage.loginState || null),//判断登陆者的身份，1为管理员，2为组长,0是未登录
    equipmentList: getLocalEquipmentList(),
    // [{
    //   RFID: '001',
    //   status: '正常',//运行状态
    //   manufacturer: '三峡电力设备有限公司',//厂家
    //   money: '180',
    //   buyTime: '2022-2-19',//购置时间
    //   scrapTime: '',//报废时间
    //   location: '湖北宜昌',
    //   use: '用于三峡大学教学楼供电',//用途
    //   type: '配电柜',
    //   maintainList: [{ time: '2022-3-19', describe: '外壳维修' }, { time: '2022-3-19', describe: '外壳维修' }],//维修情况
    // }, {
    //   RFID: '002',
    //   status: '正常',//运行状态
    //   maintainList: [{ time: '2022-3-19', describe: '外壳维修' }, { time: '2022-3-19', describe: '外壳维修' }],//维修情况
    //   manufacturer: '三峡电力设备有限公司',//厂家
    //   money: '180',
    //   buyTime: '2022-2-19',//购置时间
    //   scrapTime: '',//报废时间
    //   location: '湖北宜昌',
    //   use: '用于三峡大学教学楼供电',//用途
    //   type: '配电柜'
    // },],

    historyRecord: getLocalRecordList()
    //  [{
    //   time: '2022-4-3 14:46',
    //   RFID: '001',
    //   handle: '报废',//操作
    //   handler: '管理员'//操作者
    // },
    // {
    //   time: '2022-4-3 14:46',
    //   RFID: '002',
    //   handle: '报废',//操作
    //   handler: '管理员'//操作者
    // }]


  },
  mutations: {
    setLoginState (state, payload) {//payload为参数
      state.loginState = payload
      localStorage.loginState = JSON.stringify(state.loginState)
    },
    // 添加设备
    addEquipments (state, payload) {
      state.equipmentList.push(payload)
      setLocalEquipmentList(state)
    },
    scrapEquipment (state, payload) {
      state.equipmentList[payload].status = "已报废"
      state.equipmentList[payload].scrapTime = getCurrentTime()
      setLocalEquipmentList(state)

    },
    editEquipment (state, payload) {
      const index = payload.index
      const item = payload.item
      state.equipmentList[index].status = item.status
      state.equipmentList[index].location = item.location
      state.equipmentList[index].use = item.use
      state.equipmentList[index].maintainList = item.maintainList
      console.log(index, item, 'comm')
      setLocalEquipmentList(state)

    },
    deleteEquipment (state, payload) {
      state.equipmentList.splice(payload, 1)
      setLocalEquipmentList(state)

    },

    addRecord (state, payload) {
      console.log("vuex中历史记录")
      console.log(state.loginState, "登录状态")
      const { RFID, handle } = payload

      const currentRecord = {
        RFID: RFID,
        handle: handle,
        time: getCurrentTime(),
        handler: state.identifications[state.loginState - 1].name
        // handler: '管理员'
      }
      state.historyRecord.push(currentRecord)
      console.log(state.historyRecord)
      setLocalRecordList(state)
    }

  },


  actions: {
  },
  modules: {
  }
})
