/**
 * Created by skz on 2016/12/29 0029.
 */
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
const multer  = require('multer');

let App = require('./appApi');
let User = require('./userApi');
let FileUpload = require('../utils/FileUpload');
let FileUtil = require('../utils/FileUtil');
const Server = require('../core/Server');
const Config = require('../config');
const {Spawns} = require('../utils/Spawns');

// API of Applications
router.route("/app")
  .get(App.getApps)
  .post(App.createApp);

router.route("/app/:id")
  .get(App.getApp)
  .delete(App.deleteApp)
  .put(App.updateApp);

// API of Users
router.route("/user")
  .get(User.getUsers)
  .post(User.createUser);

router.route("/user/:id")
  .get(User.getUser)
  .delete(User.deleteUser)
  .put(User.updateUser);

router.route("/auth")
  .get(User.guest)
  .post(User.auth);


router.get('/test', function(req, res, next) {
  User.find(function (err, user) {
    if (err) return next(err);
    res.json({result: true});
  });
});

router.post('/upload',function(req, res) {

  const fileService = (type,serverpath,req) => {
    "use strict";
    let isMoved;
    let tmpUploaderPath = path.join(__dirname,'../'+req.path,req.file.originalname);
    let destination = path.join(serverpath,req.file.originalname);

    isMoved = Server.moveZipToServer(tmpUploaderPath,destination);
    (type !== 'java' && !isMoved) && Server.extractZipToFolder(destination,serverpath);
    type !== 'java' && Server.removeFile(destination);
    Server.removeFile(tmpUploaderPath);
    return type === 'php' ? Config.serverVisitPath.php : (type === 'node' ? Config.serverVisitPath.node : Config.serverVisitPath.java);
  };

  FileUpload.uploadSingle('./upload/','app',req,res,(req,res) => {
    "use strict";
    const type = req.body.type;
    const phpServerPath = Config.serverPath.php;
    const nodeServerPath = Config.serverPath.node;
    const javaServerPath = Config.serverPath.java;

    //const destFolder = "E:/uploader/php/";
    //const destination = path.join(destFolder,req.file.originalname);
    let result;
    let visitPath ;
    let serverPath;

    const isZip = FileUtil.isZip(req.file.originalname);
    if(isZip){
      try {
        switch (type){
          case 'node':
            visitPath = fileService(type,nodeServerPath,req);
            serverPath = path.join(nodeServerPath,req.file.originalname);
            break;
          case 'php':
            visitPath = fileService(type,phpServerPath,req);
            serverPath = path.join(phpServerPath,req.file.originalname);
            break;
          case 'java':
            visitPath = fileService(type,javaServerPath,req);
            serverPath = path.join(javaServerPath,req.file.originalname);
            break;
        }
      }catch (err){
        //res.send({result: false,message: "error when moeve or unzip file"});
        result = {result: false,message: "error when moeve or unzip file"};
      }
    }else{
      //res.send({result: false,message: "It's not a zip file"});
      result = {result: false,message: "It's not a zip file"};
    }
    const filename = req.file.originalname.slice(req.file.originalname.lastIndexOf('/') + 1);
    const projectName = filename.slice(0,filename.lastIndexOf('.'));
    // 存储路径
    req.body.path = serverPath;
    // 访问url
    req.body.url = visitPath + projectName;

    // save to db
    App.createApp(req,res);

  })
});

router.post('/start',function(req, res) {
  "use strict";
  const type = req.body.type;
  const action = req.body.action;
  console.log(type);
  console.log(action);

  const startPhp = (action) => {
    action == 1 ? Spawns.startPHP() : action == 2 ? Spawns.stopPHP() : Spawns.restartPHP();
  };
  const startNode = (action) => {

  };
  const startJava = (action) => {
    action == 1 ? Spawns.startTomcat() : action == 2 ? Spawns.stopTomcat() : Spawns.restartTomcat();
  };

  switch(type){
    case 'php':
      startPhp(action);
          break;
    case 'node':
      startNode(action);
          break;
    case 'java':
      startJava(action);
          break;
  }
  res.send({result: true,message:'TODO 返回服务状态信息'})
});

module.exports = router;
