var spider = require('../lib/spider')
// var _ = require('lodash')

function fetchProxy () {
  return spider({
    url: 'http://www.kuaidaili.com/proxylist/3/'
  }, {
    selector: '#index_free_list tbody tr',
    handler: function ($tr, $) {
      var proxy = []
      $tr.find('td').each(function (i) {
        proxy[i] = $(this).html().trim()
      })
      if (proxy[0] && proxy[1] && /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/.test(proxy[0]) && /\d{2,6}/.test(proxy[1])) {
      } else {
                // console.log(proxy);
      }
      return proxy
    }
  })
}

fetchProxy().then(data => {
  var len = data.length
  var succArray = []
  data.forEach(p => {
    checkProxy(`http://${p[0]}:${p[1]}`).then(() => {
      succArray.push(p)
    }).finally(done).catch(e => void (e))
  })

  function done () {
    len--
    if (len === 0) {
      console.log(succArray)
    }
  }
})

function checkProxy (proxy) {
  return spider({
    url: 'http://www.dytt8.net/index.htm',
    proxy: proxy,
    timeout: 5e3,
    decoding: 'gb2312'
  }, {
    items: {
      selector: '.co_area2 .co_content2 ul a!attr:href'
    }
  })
}
