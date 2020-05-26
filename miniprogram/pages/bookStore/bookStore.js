// pages/bookStore/bookStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab: 1 书架 2 阅读记录
    tab: 1
  },

  changeTab (e) {
    console.log(e)
    let { tab } = e.target.dataset
    switch (parseInt(tab)) {
      case 1:
        console.log('书架')
        break
      case 2:
        console.log('阅读记录')
        break  
    }
    this.setData({
      tab: parseInt(tab)
    })
  },

  /**
   * getBookStoreAction()
   * @description 获取书架信息
  */
  getBookStoreAction () {
    wx.cloud.callFunction({
      name: 'getBookStoreInfo',
      success (res) {
        console.log(res)
      }
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getBookStoreAction()
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