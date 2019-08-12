/**
 * 通过作者或者书名进行搜索，返回搜索结果
*/

// 云函数入口文件
const cloud = require('wx-server-sdk')
const sp = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')

cloud.init()

// 处理sp的编码
charset(sp)

// 定义搜索的地址
const searchUrl = 'https://www.booktxt.com/search.php?keyword=';

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(sp)
  let html = await sp.get(searchUrl + escape(event.keyworld))
  let $ = cheerio.load(html.text)
  // console.log($('.result-item'))

  let bookList = []

  $('.result-item').each(function () {
    bookList.push({
      name: $(this).find('.result-item-title span').text().trim(),
      link: $(this).find('.result-item-title a').attr('href'),
      brief: $(this).find('.result-game-item-desc').text(),
      author: $(this).find('.result-game-item-info span').eq(1).text().trim(),
      image: $(this).find('.result-game-item-pic-link-img').attr('src')
    })
  })
  return bookList
}