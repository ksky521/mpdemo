var spider = require('../lib/spider')

spider({
  url: 'http://www.dytt8.net/index.htm',
  decoding: 'gb2312'
}, (err, data, body, req) => {
  if (!err) {
    if (data && data.items) {
      var urls = data.items.url
      urls.forEach(function (url) {
        url = 'http://www.dytt8.net' + url
        spider({url: url, decoding: 'gb2312'}, (e, d) => {
          if (!e) {
            console.log(d)
          }
        }, {
          url: {
            selector: '#Zoom table td a!text'
          },
          title: {
            selector: '.title_all h1!text'
          }
        })
      })
    }
  }
}, {
  items: {
    selector: '.co_area2 .co_content2 ul',
    handler: {
      url: {
        selector: 'a!attr:href'
      },
      title: {
        selector: 'a!text'
      }
    }
  }
})
