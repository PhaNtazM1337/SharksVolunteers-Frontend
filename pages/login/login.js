const app = getApp()
let _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'12345678901',
    dphone:'',
    email:'',
  },
  ddinput(e){
    let name = e.currentTarget.dataset.name;
    this.data[name] = e.detail.value;
    
    this.setData({
      email: this.data.email,
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
    if (this.data.email==''){
      wx.showToast({
        title: 'Enter email',
        icon:'none'
      })
    }
    else{
      wx.getUserProfile({
        desc: 'Collect username info', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success:(res)=>{
          let userInfo = res.userInfo
          userInfo.id = wx.getStorageSync("user").id
          userInfo.phone = this.data.phone
          userInfo.dphone = this.data.dphone
          userInfo.email = this.data.email
          console.log(userInfo);
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
    }
  },
})