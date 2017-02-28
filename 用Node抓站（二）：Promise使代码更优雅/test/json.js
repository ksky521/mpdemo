
var spider = require('../lib/spider')

spider('http://www.smzdm.com/json_more?timesort=148793822041', (err, data, body, req) => {
  if (!err) {
    console.log(data)
  }
}, {
  items: {
    selector: '*',
    handler: {
      title: {
        selector: 'article_title'
      },
      id: {
        selector: 'article_id'
      },
      category: 'category_layer[0].title',
      minfo: {
        selector: 'mall_more_info[0].title'
      }
    }
  }
})
