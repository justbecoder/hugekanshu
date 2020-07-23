// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  console.log(openid)
  let data = await db.collection('bookStore').where({
    openid
  }).get()
  
  let [{ bookStore = [] }] = data.data
  console.log(bookStore)
  return bookStore
}