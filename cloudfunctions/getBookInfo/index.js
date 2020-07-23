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
  console.log(link)
  let html = await sp.get(link).charset('gbk')
  let $ = cheerio.load(html.text)

  // 目录
  let bookCatelog = []

  // 作者
  let authorText = $('#info p:contains("作")').text()
  // 最后更新时间
  let lastModifyTimeStr = $('#info p:contains("最后更新：")').text()
  // 状态
  let statusStr = $('#info p:contains("状")').text()

  // 基本信息
  let basicInfo = {
    name: $('#info h1').text(),
    image: $('#fmimg img').attr('src'),
    intro: $('#intro p').eq(0).html(),
    author: authorText.slice(authorText.indexOf('：') + 1),
    lastModifyTime: lastModifyTimeStr.slice(lastModifyTimeStr.indexOf('：') + 1),
    status: statusStr.slice(statusStr.indexOf('：') + 1, statusStr.indexOf(',')),
    lastChapter: {
      name: $('#info p:contains("最新章节") a').text(),
      link: BASE_URL + $('#info p:contains("最新章节") a').attr('href')
    }
  }

  // 捕获目录结构
  $('#list dd a').each(function () {
    let name = $(this).text()
    let link = BASE_URL + $(this).attr('href')
    bookCatelog.push({
      name,
      link
    })
  })
  
  return {
    bookCatelog,
    basicInfo
  }
}