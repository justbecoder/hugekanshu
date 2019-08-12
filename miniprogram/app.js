//app.js
App({
  onLaunch: async function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'kanshu-bgp70',
        traceUser: true,
      })
    }

    // 读取用户是否登录
    let userInfo = wx.getStorageSync('userInfo')
  
    this.globalData = {
      isLogin: userInfo ? true : false,
      userInfo: userInfo
    }
  }
})
