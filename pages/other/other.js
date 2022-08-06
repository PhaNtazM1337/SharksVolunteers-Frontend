//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    price: '',
    location:'',
    des: '',
    phone: '',
    hourMinuteSecond1: '',
    hourMinuteSecond2: '',
    wx_id:wx.getStorageSync("user").id
  },
  selectDateMinuteChange(e) {
    this.setData({
      hourMinuteSecond1: e.detail.value
    })
  },
  selectDateMinuteChange2(e) {
    this.setData({
      hourMinuteSecond2: e.detail.value
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
    let formId = e.detail.formId
    let isTeacher=this.data.isTeacher
    let location=this.data.location
    let whentask = this.data.hourMinuteSecond1
    let whenend = this.data.hourMinuteSecond2
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
    } else if (whentask == '' || whenend ==''){
      console.log(whentask)
      wx.showToast({
        title: 'Enter time',
        icon: 'none'
      })
    }else if (isTeacher == 1) {
      wx.showLoading({
        title: 'Loading',
      })
      app.com.post('help/add', {
        openid: wx.getStorageSync("user").openid, 
        des: e.detail.value.des,
        location:e.detail.value.location,
        wx_id: wx.getStorageSync("user").id,
        total_fee: 10,
        a_id: wx.getStorageSync("area").pk_id,
        title:this.data.title,
        mu: this.data.address,
        qi: e.detail.value.qi,
        whentask: whentask,
        whenend: whenend,
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
  onLoad: function (options) {
    _this = this
    let msg = wx.getStorageSync("server")[options.index];
    let tags = msg.tags ?  msg.tags.split(','):[];
    let arr= []
    for(let i in tags){
      arr.push({ label: tags[i], price: tags[i].replace(/[^0-9]/ig, "")})
    }
    msg.tagsFilter = arr
    this.setData({
      title:options.label,
      msg: msg,
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
