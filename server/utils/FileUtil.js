/**
 * Created by skz on 2017/1/2 0002.
 */
const fs = require('fs');

module.exports = FileUtil = {
  zipext: ['war','zip','rar'],
  isZip(filename){
    "use strict";
    const ext = filename.slice(filename.lastIndexOf('.') + 1);
    return this.zipext.includes(ext) ? true : false;
  },
  fileExist(filepath){
    "use strict";
    return fs.existsSync(filepath) ? true : false;
  }
};
