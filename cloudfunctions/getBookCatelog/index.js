// 云函数入口文件
const cloud = require('wx-server-sdk')
const sp = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')

cloud.init()

// 定义全局变量
const BASE_URL = 'https://www.booktxt.com'

// 处理sp的编码
charset(sp)

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 从event中获取参数
  let link = event.link
  let html = await sp.get(link).charset('gbk')
  let $ = cheerio.load(html.text)

  // 目录
  let bookCatelog = []

  // 捕获目录结构
  $('#list dd a').each(function () {
    let name = $(this).text()
    let link = BASE_URL + $(this).attr('href')
    bookCatelog.push({
      name,
      link
    })
  })
  
  return bookCatelog
}