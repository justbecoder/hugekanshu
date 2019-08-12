// 云函数入口文件
const cloud = require('wx-server-sdk')
const sp = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')

cloud.init()

// 处理sp的编码
charset(sp)

const BASE_URL = 'https://www.booktxt.com'

// 云函数入口函数
exports.main = async (event, context) => {
  let html = await sp.get(event.link).charset('gbk')
  let $ = cheerio.load(html.text)

  // 获取目录
  let catelog = $('.bottem2 a').eq(1).attr('href')
  // 获取上一章 --- 判断是否有上一章
  let prev = $('.bottem2 a').eq(0).attr('href') === catelog ? '' : $('.bottem2 a').eq(0).attr('href')
  // 获取下一章
  let next = $('.bottem2 a').eq(2).attr('href') === catelog ? '' : $('.bottem2 a').eq(2).attr('href')

  return {
    name: $('.bookname h1').text(),
    content: $('#content').html(),
    prev: prev ? BASE_URL + prev : '',
    next: next ? BASE_URL + next : '',
    catelog: BASE_URL + catelog
  }
}