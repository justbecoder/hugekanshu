/**
 * addBookToStore() 添加书籍到书架
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 实例化数据库
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { bookInfo } = event
  let openid = wxContext.OPENID
  let data = await db.collection('bookStore').where({
    openid
  }).get('')
  let bookStore = data.data[0].bookStore
  let res
  if (!bookStore.length) {
    // 空书架 -- 插入
    bookStore.push(bookInfo)
    res = await db.collection('bookStore').add({
      data: {
        openid,
        bookStore
      }
    })
  } else {
    // 判断当前图书是否在书架中
    let index
    for (let i = 0; i < bookStore.length; i++) {
      if (bookStore[i].name === bookInfo.name && bookStore[i].link === bookInfo.link) {
        index = i
        break
      }
    }
    if (index !== undefined) {
      bookStore.splice(index, 1)
    }
    bookStore.push(bookInfo)
    res = await db.collection('bookStore').where({
      openid
    }).update({
      data: {
        bookStore
      }
    })
  }
  return res
}