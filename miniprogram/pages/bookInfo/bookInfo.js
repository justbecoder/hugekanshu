// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: '',
    catelog: [],
    basicInfo: undefined,
    currentPage: 1,
    pageSize: 10,
    pageList: [],
    totalPage: undefined,
    totalCount: undefined,
    currentCatelog: [],
    sortUp: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中...'
    })
    wx.cloud.callFunction({
      name: 'getBookInfo',
      data: {
        link: options.link
      },
      success: (res) => {
        wx.hideLoading()
        this.setData({
          catelog: res.result.bookCatelog,
          basicInfo: res.result.basicInfo,
          link: options.link
        }, () => {
          this.initPage()
        })
      },
      fail: (error) => {
        wx.hideLoading()
        wx.showModal({
          title: '请求失败',
          content: '请返回重新尝试',
          confirmText: '确定',
          showCancel: false
        })
      }
    })
  },

  /**
   * initPage() 初始化分页信息 
   */
  initPage () {
    let totalPage = Math.ceil(this.data.catelog.length / this.data.pageSize)
    let totalCount = this.data.catelog.length
    let pageList = []
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(i)
    }
    this.setData({
      totalPage,
      totalCount,
      pageList
    }, () => {
      this.setCurrentCatelog()
    })
  },

  /**
   * setCurrentCatelog() 设置当前目录 
   */
  setCurrentCatelog () {
    let { currentPage, totalPage, totalCount, pageSize, catelog} = this.data
    let currentCatelog = catelog.slice(pageSize * ( currentPage - 1), pageSize * currentPage)
    this.setData({
      currentCatelog
    })
  },

  /**
   * setCurrentPage() 设置当前页码
   */
  setCurrentPage (type, pageNum) {
    let { currentPage, totalPage } = this.data
    switch (type) {
      case 'home':
        if (currentPage === 1) {
          return
        }
        currentPage = 1
        break
      case 'end':
        if (totalPage === currentPage) {
          return
        }
        currentPage = totalPage
        break
      case 'prev':
        if (currentPage === 1) {
          return
        }
        currentPage--
        break
      case 'next':
        if (currentPage === totalPage) {
          return
        }
        currentPage++
        break
      case 'num':
        currentPage = pageNum
        break
    }
    this.setData({
      currentPage
    }, () => {
      this.setCurrentCatelog()
    })
  },

  /**
   * changePage() 改变页码 
   */
  changePage (e) {
    this.setCurrentPage(e.target.dataset.type)
  },

  /**
   * getPickerPage() 显示页码选择器中的页码
   */
  getPickerPage (e) {
    this.setCurrentPage('num', Number(e.detail.value) + 1)
  },

  /**
   * sortCatelog() 对目录进行排序
   */
  sortCatelog () {
    // sortUp true 正序 false 倒序
    let { sortUp, catelog } = this.data
  
    // 反转
    catelog = catelog.reverse()
  
    this.setData({
      sortUp: !sortUp,
      catelog
    }, () => {
      this.setCurrentCatelog()
    })
  },

  /**
   * addBookToStore() 添加书籍到书架
   */
  addBookToStore () {
    let { basicInfo, link } = this.data
    console.log(basicInfo, link)
    wx.cloud.callFunction({
      name: 'addBookToStore',
      data: {
        bookInfo: {
          name: basicInfo.name,
          author: basicInfo.author,
          image: basicInfo.image,
          link
        }
      },
      success (res) {
        wx.showToast({
          title: '加入书架成功!'
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