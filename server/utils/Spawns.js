/**
 * Created by skz on 2017/1/6 0006.
 */
const spawn  = require("child_process").spawn ;
const exec  = require("child_process").exec ;

const Config = require('../config');

const Spawns = {
  // tomcat
  startTomcat: () => {
     "use strict";
    const tomcatPath = Config.serverPath.java.replace('/webapps/','/bin/');
    const bat = spawn('cmd.exe', ['/s', '/c', 'catalina.bat start'], { cwd: tomcatPath, env: null, windowsVerbatimArguments: true });
  },
  stopTomcat: () => {
    "use strict";
    const tomcatPath = Config.serverPath.java.replace('/webapps/','/bin/');
    const bat = spawn('cmd.exe', ['/s', '/c', 'catalina.bat stop'], { cwd: tomcatPath, env: null, windowsVerbatimArguments: true });
  },
  restartTomcat: () => {
    "use strict";
  },

  // php
  startPHP: () => {
    "use strict";
    console.log('start php...');
    exec('net start wampapache64', function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    exec('net start wampmysqld64');
  },
  stopPHP: () => {
    "use strict";
    console.log('stop php...');
    exec('net stop wampapache64');
    exec('net stop wampmysqld64');
  },
  restartPHP: () => {
    "use strict";
    console.log('restart php...')
    const _this = this;
    _this.stopPHP();
    setTimeout(function(){
      _this.startPHP();
    },8000)
  }
};

module.exports = {Spawns};
