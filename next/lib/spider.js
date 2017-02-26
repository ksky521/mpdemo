var _ = require('lodash')
var request = require('request')
var parser = require('./parser')

function spider (opts, callback, handlerMap) {
  if (_.isObject(callback) && _.isUndefined(handlerMap)) {
    handlerMap = callback
    opts.callback = getHandler(opts.callback, handlerMap, opts)
  } else if (_.isObject(opts) && _.isFunction(callback)) {
    opts.callback = getHandler(callback, handlerMap, opts)
  } else if (_.isString(opts)) {
    opts = {
      url: opts,
      callback: getHandler(callback, handlerMap, opts)
    }
  }

  return request(opts)
}
module.exports = spider

function getHandler (callback, map, opts) {
  return function (error, response, body) {
    if (!error) {
      // 处理json
      try {
        body = JSON.parse(body)
      } catch (e) {
      }

      callback(error, parser(body, map), response)
    } else {
      callback(error, body, response)
    }
  }
}
