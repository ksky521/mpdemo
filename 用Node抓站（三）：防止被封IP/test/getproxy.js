var spider = require('../lib/spider')
// var _ = require('lodash')

function fetchProxy () {
  return spider({
    url: 'http://www.kuaidaili.com/proxylist/1/'
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
  console.log(data)
})
