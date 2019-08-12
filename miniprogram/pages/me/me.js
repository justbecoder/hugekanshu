// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  },

  /**
   * getUserInfo()
   * @description 获取用户登录信息并保存
  */
  getUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return
    }
    wx.cloud.callFunction({
      name: 'saveUserInfo',
      data: {
        userInfo: e.detail.userInfo
      },
      success: (res) => {
        if (res && res.result) {
          // 登录成功 - 设置全局标记
          app.globalData.isLogin = true
          app.globalData.userInfo = e.detail.userInfo
          this.setData({
            userInfo: e.detail.userInfo
          })
          wx.setStorage({
            key: 'userInfo',
            data: e.detail.userInfo
          })
        }
      },
      fail: () => {
        this.showToast({
          title: '登录失败，请重试!',
          icon: 'none'
        })
      }
    })
  }
})