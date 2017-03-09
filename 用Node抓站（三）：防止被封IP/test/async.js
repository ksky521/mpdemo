var spider = require('../lib/spider')
var _ = require('lodash')
var Promise = require('bluebird')
var async = require('async')
var fs = require('fs-extra')
var path = require('path')
var moment = require('moment')
var uniqueArray = []
const UNIQUE_ARRAY_URL = './_fetchedList.json'
try {
  // uniqueArray = require(UNIQUE_ARRAY_URL)
} catch (e) {
}
function fetchList () {
  return spider({
    url: 'http://www.dytt8.net/index.htm',
    decoding: 'gb2312'
  }, {
    items: {
      selector: '.co_area2 .co_content2 ul a!attr:href'
    }
  })
}

function dealListData (data) {
  return new Promise((resolve, reject) => {
    var urls = _.get(data, 'items')
    if (urls) {
      urls = urls.map(url => {
        return 'http://www.dytt8.net' + url
      }).filter(url => {
        return uniqueArray.indexOf(url) === -1
      })
      urls.length ? resolve(urls) : reject('empty urls')
    } else {
      reject(urls)
    }
  })
}

function fetchContents (urls) {
  return new Promise((resolve, reject) => {
    var results = []
    async.eachLimit(urls, 3, (url, callback) => {
      spider({url: url, decoding: 'gb2312'}, {
        url: {
          selector: '#Zoom table td a!text'
        },
        title: {
          selector: '.title_all h1!text'
        }
      }).then((d) => {
        var time = moment().format('HH:mm:ss')
        console.log(`${url}===>success, ${time}`)
        results.push(d)
        setTimeout(callback, 2e3)
      }, () => {
        callback()
      })
    }, () => {
      resolve(results)
    })
  })
}

function addUniqueArray (url) {
  uniqueArray.push(url)
  if (uniqueArray.length > 300) {
    // 超长就删掉多余的
    uniqueArray.shift()
  }
}

fetchList().then(dealListData).then(fetchContents).then((d) => {
  console.log(d, d.length)
  fs.writeJson(path.join(__dirname, UNIQUE_ARRAY_URL), uniqueArray)
}).catch((e) => {
  console.log(e)
})
