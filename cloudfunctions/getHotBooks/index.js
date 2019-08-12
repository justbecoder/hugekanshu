/**
 * @description 获取热门小说
 * 
*/

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

// 云函数入口函数
exports.main = async (event, context) => {
  let html = await sp.get(BASE_URL).charset('gbk')
  let $ = cheerio.load(html.text)
  let books = []
  $('#hotcontent .item').each(function () {    
    let name = $(this).find('dl dt a').text()
    let image = $(this).find('.image img').attr('src')
    let link = BASE_URL + $(this).find('dl dt a').attr('href')
    let author = $(this).find('dl dt span').text()
    let brief = $(this).find('dl dd').text()
    books.push({
      // 文章目录
      link,
      // 小说名称,
      name,
      // 小说作者,
      author,
      // 小说简介
      brief,
      // 小说图片
      image
    })
  })
  return books
}