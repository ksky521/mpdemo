var _ = require('lodash')
var cheerio = require('cheerio')

var parser = (data, map) => {
  var $ = data
  if (_.isString(data)) {
    $ = cheerio.load(data || '', {
      decodeEntities: false
    })
  } else if (_.isObject(data)) {
  } else {
    throw new Error('参数类型错误')
  }
}

module.exports = parser
