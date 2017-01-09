/**
 * Created by skz on 2017/1/2 0002.
 */
const fs = require('fs');
var archiver = require('archiver');
var unzip = require("unzip");

/**
 * move file to server
 * @param filepath
 * @param destination
 * @returns {string}
 */
const moveZipToServer = (filepath,destination) => {
  "use strict";
  let resutl = '';
  try{
    // rename 不支持跨分区(C:,D:盘)移动文件
    resutl = fs.renameSync(filepath, destination);
    //const readStream = fs.createReadStream(filepath);
    //const writeStream = fs.createWriteStream(destination);
    //readStream.pipe(writeStream);
  }catch (err){
    resutl = err;
  }
  return resutl;
};

/**
 * extract/unzip zip file to folder
 * @link see https://github.com/EvanOxfeld/node-unzip
 * @param zipFilepath
 * @param destination
 */
const extractZipToFolder = (zipFilepath,destination) => {
  "use strict";
  try{
    fs.createReadStream(zipFilepath).pipe(unzip.Extract({ path: destination }));
  }catch (err){
    console.log('error: ',err)
  }
};

/**
 * @link see https://archiverjs.com/docs/
 * @param filepath
 */
const compressFileToZip = (filepath) => {
  "use strict";
  var output = fs.createWriteStream(filepath);
  var archive = archiver('zip');

  archive.on('error', function(err){
    throw err;
  });

  archive.pipe(output);
  //archive.bulk([
  //  { src: ['archiver/**']}
  //]);
  archive.finalize();
};

/**
 * remove file
 * @param filepath
 */
const removeFile = (filepath) => {
  "use strict";
  fs.existsSync(filepath) && fs.unlinkSync(filepath);
};

/**
 * remvoe folder
 * @param folderpath
 */
const removeFolder = (folderpath) => {
  "use strict";
  if( fs.existsSync(folderpath) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        removeFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


module.exports = {moveZipToServer,extractZipToFolder,moveZipToServer,compressFileToZip,removeFile,removeFolder};
