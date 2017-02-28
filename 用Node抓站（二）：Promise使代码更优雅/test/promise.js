var spider = require('../lib/spider')
var _ = require('lodash')
var Promise = require('bluebird')

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
      urls = urls.map((url) => {
        return 'http://www.dytt8.net' + url
      })
      resolve(urls)
    } else {
      reject(urls)
    }
  })
}

function fetchContents (urls) {
  return new Promise((resolve, reject) => {
    var count = 0
    var len = urls.length
    var results = []
    while (len--) {
      var url = urls[len]
      count++
      spider({url: url, decoding: 'gb2312'}, {
        url: {
          selector: '#Zoom table td a!text'
        },
        title: {
          selector: '.title_all h1!text'
        }
      }).then((d) => {
        results.push(d)
      }).finally(() => {
        count--
        if (count === 0) {
          resolve(results)
        }
      })
    }
  })
}

fetchList().then(dealListData).then(fetchContents).then((d) => {
  console.log(d, d.length)
}).catch((e) => {
  console.log(e)
})

// Promise.resolve(10).then((len) => {
//   var arr = []
//   while (len--) {
//     arr.push(len === 0 ? Promise.reject(len) : Promise.resolve(len))
//   }
//   console.log(arr)
//   return Promise.all(arr)
// }).then((data) => {
//   console.log(data)
// }).catch((e) => {
//   console.log('error===>', e)
// })
