//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    teachername:'',
    department:'',
    wx_id:wx.getStorageSync("user").id
  },
  navTo(e) {
    app.com.navTo(e)
  },
  usernameInput:function(e){//获取input里的value值
    this.setData({
      teachername: e.detail.value
    })
  },
  departmentInput:function(e){//获取input里的value值
    this.setData({
      department: e.detail.value
    })
  },
  formSubmit(e) {
    let teachername = this.data.teachername
    let department = this.data.department
    if (teachername == '') {
      wx.showToast({
        title: 'Enter name',
        icon: 'none'
      })
    }else if(department == ''){
      wx.showToast({
        title: 'Enter department/position',
        icon: 'none'
      })
    }else{
      app.com.post('help/regTeacher',{wx_id:wx.getStorageSync("user").id, department:department, teachername:teachername},function(val){
        if (val.code == 1) {
            wx.navigateBack({
            })
            wx.showToast({
                title: 'Submitted',
                icon: 'none'
            })
        }
      })
    }
  },
  navTo(e) {
    app.com.navTo(e)
  },
  navToArea() {
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  navToMine() {
    wx.navigateTo({
        url: '/pages/mine/mine',
    })
  },
  publist() {
    wx.navigateTo({
      url: '/pages/pub/pub',
    })
  },
  onLoad: function (options) {
    _this = this
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
