/**
 * Created by skz on 2016/12/30 0030.
 */
const fs = require('fs');
const multer  = require('multer');

// upload file configure
let folderPath = './upload/';

const storage = (dest,filename) => {
  return multer.diskStorage({
    destination: (req,file,cb) => {
      "use strict";
      // 自定义保存路径
      cb(null,dest);
    },
    filename: (req,file,cb) => {
      "use strict";
      // 自定义文件名  (file.fieldname + '-' + Date.now())
      cb(null, file.originalname);
    }
  });
};

let limits =  {
  fileSize: 500*1024*1024 // Max file size in bytes (50 MB)
};

const fileFilter = (req, file, cb) => {
  //
  var mimetypes = (['text/*', 'image/*', 'video/*', 'audio/*','application/zip']).join(',');
  var testItems = file.mimetype.split('/');
  if ((new RegExp('\\b' + testItems[0] + '/\\*', 'i')).test(mimetypes) || (new RegExp('\\*/' + testItems[1] + '\\b', 'i')).test(mimetypes) || (new RegExp('\\b' + testItems[0] + '/' + testItems[1] + '\\b', 'i')).test(mimetypes)) {
    cb(null, true);
  } else {
    return cb(new Error('Only zip format files are allowed!'), false);
  }
};

const createFolder = (folder) => {
  "use strict";
  try{
    fs.accessSync(folder);
  }catch (err){
    fs.mkdirSync(folder)
  }
};

const uploadSingle = (dest,fieldname,req,res,cb) => {
  "use strict";
  const uploadDest = dest || folderPath;
  createFolder(uploadDest);

  const multerConfig = {
    storage: storage(uploadDest),
    limits: limits//,
    //fileFilter: fileFilter
  };

  const upload = multer(multerConfig).single( fieldname || 'file');
  upload(req, res, function (err) {
    if (!err) {
      //req.file
      cb && cb(req,res);
    } else {
      res.send({result: false,message: err.statck})
      console.error(err.stack);
    }
  });
};

// 多文件
const uploadArray = (fieldname,req,res,cb,dest) => {
  "use strict";
  const uploadDest = dest || folderPath;
  createFolder(uploadDest);

  const multerConfig = {
    storage: storage(uploadDest),
    limits: limits,
    fileFilter: fileFilter
  };

  const upload = multer(multerConfig).array( (fieldname || 'file'),5);
  upload(req, res, function (err) {
    if (!err) {
      cb && cb(req.files,res);
    } else {
      console.error(err.stack);
    }
  });
};

const uploadMix = (fields,req,res,cb,dest) => {
  "use strict";
  const uploadDest = dest || folderPath;
  createFolder(uploadDest);

  const multerConfig = {
    storage: storage(uploadDest),
    limits: limits,
    fileFilter: fileFilter
  };

  const upload = multer(multerConfig).fields( (fieldname || 'file'),5);
  upload(req, res, function (err) {
    if (!err) {
      cb && cb(req.files,res);
    } else {
      console.error(err.stack);
    }
  });
};

module.exports = {uploadSingle,uploadArray,uploadMix};
