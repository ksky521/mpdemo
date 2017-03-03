var fs = require('fs-extra')
var path = require('path')

class Cache {
  constructor (filePath) {
    this.filePath = path.resolve(__dirname, filePath)
  }
  read (key) {}
  write (key, value) {}
  save () {
    fs.writeJson(path.join(cwd, './temp-cache.json'), data)
  }
}
