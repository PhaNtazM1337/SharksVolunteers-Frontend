const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'12345678901',
    dphone:''
  },
  ddinput(e){
    let name = e.currentTarget.dataset.name;
    this.data[name] = e.detail.value;
    
    this.setData({
      phone: this.data.phone,
      dphone: this.data.dphone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#6e42d3',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: 'Collect username info', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success:(res)=>{
        console.log(res);
        let userInfo = res.userInfo
        userInfo.id = wx.getStorageSync("user").id
        userInfo.phone = this.data.phone
        userInfo.dphone = this.data.dphone
        app.com.post('wx/user/update', userInfo, function (res) {
          wx.hideLoading()
          if(res.code == 1){
            wx.showToast({
              title: 'Success',
              mask:true,
              duration:800
            })
            let user = res.data
            user.phone = userInfo.phone
            wx.setStorage({
              key: 'user',
              data: user,
            })
            // wx.setStorageSync("user", user)
            setTimeout(function(){
              wx.navigateBack({
                detal:1
              })
            },900)
          }
        })
      },
      fail: (res) => {
        console.log("Error",res);
      }
    })
  },
  getUserInfo: function (e) {
    wx.showLoading({
      title: 'Authorizing',
      task:true
    })
    let userInfo = e.detail.userInfo
    userInfo.id = wx.getStorageSync("user").id
    userInfo.phone = this.data.phone
    userInfo.dphone = this.data.dphone
    app.com.post('wx/user/update', userInfo, function (res) {
      wx.hideLoading()
      console.log(res)
      if(res.code == 1){
        wx.showToast({
          title: 'Success',
          mask:true,
          duration:800
        })
        let user = res.data
        user.phone = userInfo.phone
        wx.setStorage({
          key: 'user',
          data: user,
        })
        // wx.setStorageSync("user", user)
        setTimeout(function(){
          wx.navigateBack({
            detal:1
          })
        },900)
      }else{
        wx.showToast({
          title: 'Error',
          icon:'none'
        })
      }
    })
  },
 
})