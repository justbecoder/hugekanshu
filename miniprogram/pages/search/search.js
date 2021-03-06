// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: undefined,
    keyworld: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  lazyLoadObserve () {
    let intersectionObserver = wx.createIntersectionObserver(this, {
      observeAll: true
    })
    intersectionObserver.relativeToViewport({ bottom: 100 }).observe('.item-link-img', (res) => {
      if (!res.dataset.show) {
        let { books } = this.data
        books[res.dataset.index].show = true
        this.setData({
          books
        })
      } else {
        return
      }
    })
  },

  /**
   * inputSearchKeyworld()
   * @description 输入查询关键字
  */
  inputSearchKeyworld (e) {
    this.setData({
      keyworld: e.detail.value
    })
  },

  /**
   * doSearch() 执行查询
  */
  doSearch () {
    let { keyworld } = this.data
    wx.showLoading({
      title: '查询中...'
    })
    wx.cloud.callFunction({
      name: 'getSearchResult',
      data: {
        keyworld
      },
      success: (res) => {
        wx.hideLoading()
        this.setData({
          books: res.result
        }, () => {
          this.lazyLoadObserve()
        })
      }
    })
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