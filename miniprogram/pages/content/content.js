// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    content: '',
    prev: '',
    next: '',
    catelog: '',
    chapterContent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChapterContent(options.link)
  },

  /**
   * getChaptorContent() 
   * @description 获取章节内容
   * @param {String} link 请求的链接地址
   * @param {String} refreshDirection 触发请求的方式 down 下拉  up 上拉触底
  */
  getChapterContent (link, refreshDirection = 'up') {
    wx.showLoading({
      title: '数据请求中...',
    })
    wx.cloud.callFunction({
      name: 'getBookChapterContent',
      data: {
        link
      },
      success: (res) => {
        let chapterContent = this.data.chapterContent

        if (refreshDirection === 'up') {
          chapterContent.push({
            name: res.result.name,
            content: res.result.content 
          })
        } else {
          chapterContent.unshift({
            name: res.result.name,
            content: res.result.content
          })
          wx.stopPullDownRefresh()
        }
        /**
         * 注意：
         *  在执行请求刷新时，如果是上拉刷新就更新next;如果是下拉刷新就更新prev
         * 如果prev和next是不存在的，说明是初始化，直接进行赋值操作
        */
        if (refreshDirection === 'up') {
          this.setData({
            next: res.result.next
          })
          if (!this.data.prev) {
            this.setData({
              prev: res.result.prev
            })
          }
        } else {
          this.setData({
            prev: res.result.prev
          })
          if (!this.data.next) {
            this.setData({
              next: res.result.next
            })
          }
        }
        this.setData({
          catelog: res.result.catelog,
          chapterContent
        })

        /**
         * 将当前的章节信息存储到本地
         *  后期可考虑如果用户已登录，写入到用户的数据库中
        */
        wx.setStorage({
          key: 'currentReadingChapterInfo',
          data: {
            name: res.result.name,
            link
          }
        })

        wx.hideLoading()
      }
    })
  },
  /**
   * readNext()
   * @description 读取下一章
  */
  readNext () {
    console.log(this.data.next)
    if (!this.data.next) {
      wx.showToast({
        title: '无下一章',
      })
      return
    }
    this.getChapterContent(this.data.next)
  },

  /**
   * 
  */
  readPrev () {
    if (!this.data.prev) {
      wx.showToast({
        title: '暂无上一章',
      })
      return
    }
    this.getChapterContent(this.data.prev)
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
    // 判断是否是最后一章了
    if (!this.data.prev) {
      wx.showToast({
        title: '已经是第一章啦...',
        icon: 'none'
      })
      wx.stopPullDownRefresh()
      return
    }
    this.getChapterContent(this.data.prev, 'down')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否是最后一章了
    if (!this.data.next) {
      wx.showToast({
        title: '已经是最后一章啦...',
        icon: 'none'
      })
      return
    }
    this.getChapterContent(this.data.next)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})