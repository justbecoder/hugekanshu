//index.js
const app = getApp()

Page({
  data: {
    hotBooks: [],
    keyworld: '',
    avatarUrl: '',
    userInfo: undefined,
    record: []
  },

  onLoad: function() {
    wx.showLoading({
      title: '数据加载中....',
    })

    // 获取推荐图书
    wx.cloud.callFunction({
      name: 'getHotBooks',
      success: (res) => {
        wx.hideLoading()
        if (res.result) {
          this.setData({
            hotBooks: res.result
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '请求超时，请重试！',
          icon: 'none'
        })
        console.log(err)
      }
    })
  },

  onShow () {
    // 读取本地存储的阅读进度
    wx.getStorage({
      key: 'readingRecords',
      success: (res) => {
        if (res.data) {
          console.log(res.data)
          this.setData({
            record: res.data[0]
          })
        }
      },
    })
  },

  /**
   * inputValue() 输入搜索关键词
  */
  inputValue (e) {
    // console.log(e.detail)
    this.setData({
      keyworld: e.detail.value
    })
  },

  /**
   * doSearch() 跳转搜索页
  */
  doSearch () {
    wx.navigateTo({
      url: '/pages/search/search?keyworld=' + this.data.keyworld,
    })
  },

  /**
   * onGetUserInfo()
   * @description 获取用户登录信息，存储到云数据库
   * @param {object} e 获取的用户信息对象
  */
  onGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'saveUserInfo',
        data: {
          userInfo: e.detail.userInfo
        },
        success: (res) => {
          console.log(res)
          if (res.result && res.result._id) {
            wx.showToast({
              title: '保存成功',
            })
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '保存失败...',
            icon: 'none'
          })
        }
      })
    }
  }
})
