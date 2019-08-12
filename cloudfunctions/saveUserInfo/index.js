// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 数据库链接
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 全局的工具类，在云函数中获取微信的调用上下文
  const wxContext = cloud.getWXContext()

  // 云数据库操作
  try {
    let data = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    // 区分：首次登录与非首次登录
    if (data && data.data  && data.data.length) {
      // 更新
      return await db.collection('users').where({
        openid: wxContext.OPENID
      }).update({
        data: {
          userInfo: event.userInfo
        }  
      })
    } else {
      // 新增
      return await db.collection('users').add({
        data: {
          created: new Date(),
          userInfo: event.userInfo,
          openid: wxContext.OPENID
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}