var request = require('request')
var cheerio = require('cheerio')

cheerio.prototype.removeTagText = function () {
  var html = this.html()
  return html.replace(/<([\w\d]+)\b[^<]+?<\/\1>/g, (m) => {
    return ''
  })
}
request('http://www.smzdm.com/youhui/', (err, req) => {
  if (!err) {
    var body = req.body
    var $ = cheerio.load(body, {
      decodeEntities: false
    })
    $('.list.list_preferential').each((i, item) => {
      var $title = $('.itemName a', item)
      var url = $title.attr('href')
      var title = $title.removeTagText().trim()

      var hl = $title.children().text().trim()
      var img = $('img', item).attr('src')
      var desc = $('.lrInfo', item).html().trim()
      desc = desc.replace(/<a\b.+?>阅读全文<\/a>/g, '')
      var mall = $('.botPart a.mall', item).text().trim()

      console.log({title, hl, url, img, desc, mall})
    })
  }
})
