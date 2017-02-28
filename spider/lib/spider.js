var request = require('request')
var parser = require('./parser')
var _ = require('lodash')

var spider = function (url, callback, handlerMap) {
  var opts
  if (_.isString(url)) {
    opts = {
      url: url
    }
  } else {
    // 是对象
    opts = url
  }
  if (_.isFunction(callback)) {
    opts.callback = getCallback(callback, handlerMap, opts)
  }
  return request(opts)
}

function getCallback (callback, handlerMap, opts) {
  return (err, res, body) => {
    if (!err) {
      var contentType = res.headers['content-type']
      // console.log(body, contentType);
      // 处理json
      if (opts.dataType === 'json' || contentType.indexOf('application/json') !== -1) {
        return callback(err, parser(JSON.parse(body), handlerMap))
      } else if (opts.dataType === 'xml' || opts.dataType === 'html' || contentType.indexOf('text/html') !== -1 || contentType.indexOf('/xml') !== -1) {
        return callback(err, parser(body, handlerMap), res)
      }
      callback(err, body, res)
    } else {
      callback(err, body, res)
    }
  }
}

module.exports = spider
