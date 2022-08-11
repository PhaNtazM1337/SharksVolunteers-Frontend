// pages/feedback/feedback.js
const app = getApp()
let _this;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wx_id:wx.getStorageSync("user").id,
        feedback:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    tagsClick(e){
        let index = e.currentTarget.dataset.index
        this.setData({
          feedback: this.data.msg.tagsFilter[index].label,
        })
    },
    formSubmit(e) {
        if (e.detail.value.feedback == '') {
            wx.showToast({
              title: 'Enter feedback',
              icon: 'none'
            })
          } 
        else{
            app.com.post('help/submitFeedback',{wx_id:wx.getStorageSync("user").id, feedback:e.detail.value.feedback},function(val){
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
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (wx.getStorageSync("user").phone) {
            this.setData({
                userInfo: wx.getStorageSync("user")
            })
        } else {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})