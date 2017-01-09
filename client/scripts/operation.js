/**
 * operation
 * Created by skz on 2016/12/19 0019.
 */

import Vue from 'vue'
import { Notification } from 'element-ui';

import Moment from 'moment'
import {Spawns} from '../store/spawns'

const {shell} = require('electron');
const spawn  = require("child_process").spawn ;
const process = require('process');
const path = require('path');
const fs = require('fs');

// import jar file
export function jarFileImport(originalFilePath,jarName,callback){
  var folder = path.join(__dirname, '/jarlibs/');
  if(!fs.existsSync(folder)){
    fs.mkdirSync(folder,0o777);
  }
  var filePath = path.join(folder,jarName);
  if(originalFilePath!=filePath){
    fs.createReadStream(originalFilePath).pipe(fs.createWriteStream(filePath));
  }
  typeof callback === 'function' && callback(jarName,filePath);
}

// file select
export function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.
  var jarName = files[0].name;
  var suffix = jarName.substring(jarName.lastIndexOf("."),jarName.length);
  if(suffix!=".jar"){
    Notification.warning({title: '警告', message: '请导入Jar包文件'});
    return;
  }
  jarFileImport(files[0].path,jarName)
}

// drag over action
export function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// 执行 app
export function startApp(app){
  "use strict";
  const logpath = path.join(__dirname, '../../monitor/log/',app.name.replace(".jar","/"),"Logger-"+ Moment().format('YYYYMMDD-HHmmss') +".log");
  let logFileArg = "--logging.file=" + logpath;
  let runPort = "--server.port=" + app.port;

  var startRun = spawn("java",["-jar",app.path,runPort,logFileArg]);
  app.pid = startRun.pid;
  app.logpath = logpath;

  startRun.stdout.on('data', (data) => {
    var d = data+'';
    if(d.indexOf('APPLICATION FAILED TO START')!= -1){
      app.status = 0;
    }
  });
  startRun.stderr.on('data', (data) => {

  });

  startRun.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  const spawns = new Spawns();
  spawns.push(app.id,startRun);
 // window.spawns.push({id: app.id,spawns: startRun});
}

// open log file
export function openLogFile(type,app,failure,success){
  "use strict";
  if(!type){
    (app.logpath && shell.showItemInFolder(app.logpath)) ? typeof success == 'function' && success()
       : typeof failure == 'function' && failure();
  }else{
    (app.logpath && shell.openItem(app.logpath)) ? typeof success == 'function' && success()
        : typeof failure == 'function' && failure();
  }
}
