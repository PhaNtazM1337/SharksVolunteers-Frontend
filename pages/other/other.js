//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    array: ['MHS', 'ES1', 'ES2', 'Other'],
    objectArray: [
      {
        id: 0,
        name: 'MHS'
      },
      {
        id: 1,
        name: 'ES1'
      },
      {
        id: 2,
        name: 'ES2'
      },
      {
        id: 3,
        name: 'Other'
      }
    ],
    index:0,
    building: '',
    price: '',
    location:'',
    des: '',
    phone: '',
    date: '',
    time: '',
    currentdate: '',
    currenttime: '',
    date2: '',
    time2: '',
    wx_id:wx.getStorageSync("user").id
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  bindTimeChange2: function(e) {
    this.setData({
      time2: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log(this.data.date)
    this.setData({
      index: e.detail.value,
    })
  },
  navTo(e) {
    app.com.navTo(e)
  },
  locationInput:function(e){//获取input里的value值
    this.setData({
      location: e.detail.value
    })
  },
  whentaskInput:function(e){//获取input里的value值
    this.setData({
      whentask: e.detail.value
    })
  },
  formSubmit(e) {
    this.setData({
      building: this.data.array[this.data.index]
    })
    let formId = e.detail.formId
    let isTeacher=this.data.isTeacher
    let building = this.data.building
    let location=this.data.location
    let date = this.data.date
    let date2 = this.data.date2
    let time = this.data.time
    let time2 = this.data.time2
    if (e.detail.value.des == '') {
      wx.showToast({
        title: 'Enter description',
        icon: 'none'
      })
    } 
    else if (location == ''){
      wx.showToast({
        title: 'Enter location',
        icon: 'none'
      })
    } else if (isTeacher == 1) {
      wx.showLoading({
        title: 'Loading',
      })
      app.com.post('help/add', {
        openid: wx.getStorageSync("user").openid, 
        des: e.detail.value.des,
        location:building + " " + location,
        wx_id: wx.getStorageSync("user").id,
        total_fee: 10,
        a_id: wx.getStorageSync("area").pk_id,
        title:this.data.title,
        mu: this.data.address,
        qi: e.detail.value.qi,
        whentask: date + " " + time,
        whenend: date2 + " " + time2,
        form_id: e.detail.formId,
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          _this.wxpay(res)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }else{
      wx.showToast({
        title: 'Not authorized',
        icon: 'none'
      })
    }
  },
  wxpay(msg) {
    app.com.wxpay(msg)
  },
  navTo(e) {
    app.com.navTo(e)
  },
  navToArea() {
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  publist() {
    wx.navigateTo({
      url: '/pages/pub/pub',
    })
  },
  tagsClick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      price:this.data.msg.tagsFilter[index].price,
      whentask:this.data.msg.tagsFilter[index].whentask,
      location:this.data.msg.tagsFilter[index].location,
      des: this.data.msg.tagsFilter[index].label,
    })
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  formatTime(date) {
    var hour = date.getHours()
    var minute = date.getMinutes()
  
    return [hour, minute].map(this.formatNumber).join(':')
  },
  formatDate(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
  
    return [year, month, day].map(this.formatNumber).join('-')
  },
  onLoad: function (options) {
    _this = this
    let msg = wx.getStorageSync("server")[options.index];
    let date=this.formatDate(new Date());
    let time=this.formatTime(new Date());
    console.log(date);
    let tags = msg.tags ?  msg.tags.split(','):[];
    let arr= []
    for(let i in tags){
      arr.push({ label: tags[i], price: tags[i].replace(/[^0-9]/ig, "")})
    }
    msg.tagsFilter = arr
    
    this.setData({
      title:options.label,
      msg: msg,
      date: date,
      time: time,
      date2: date,
      time2: time,
      currentdate: date,
      currenttime: time
    })
    wx.setNavigationBarTitle({
      title: options.label,
    })
    if (wx.getStorageSync("address")) {
      let add = wx.getStorageSync("address")
      this.setData({
        address: add.address + '-' + add.detail
      })
    }
    app.com.post('help/getTeacher',{wx_id:wx.getStorageSync("user").id},function(val){
      if (val.code == 1) {
        _this.setData({
          isTeacher:val.data,
        })
      }
    })
  },
  onShow() {
  if (wx.getStorageSync("user").phone) {
      this.setData({
          userInfo: wx.getStorageSync("user")
      })
  } else {
      wx.navigateTo({
          url: '/pages/login/login',
      })
  }
    // if (wx.getStorageSync('area')) {
    //   this.setData({
    //     area: wx.getStorageSync('area')
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/area/area',
    //   })
    // }
  }

})
