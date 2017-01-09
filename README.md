# gox
 application deploy platform

 admin: gox
 password: 123

# 技术相关
**构建**
* [x]  **[webpack](http://webpack.github.io/)**
* [x]  **[babel](http://babeljs.io/)**
* [x]  **[es6](http://babeljs.io/learn-es2015/)**
* [x]  **[es6 中文文档](http://es6.ruanyifeng.com/#docs/)**

**Vue**
* [x]  **[Vue.js](http://cn.vuejs.org/v2/guide/)**
* [x]  **[vue-router](http://router.vuejs.org/zh-cn/)**
* [x]  **[vue-loader](http://vue-loader.vuejs.org/en/)**
* [x]  **[vue-resource](https://github.com/pagekit/vue-resource/tree/master/docs)**

**Vue libs**
* [x]  **[museui](https://museui.github.io)**
* [x]  **[element](http://element.eleme.io/)**
* [x]  **[photon](http://photonkit.com/components/)**

**Nodejs**
* [x]  **[nodejs 中文文档](http://www.nodeclass.com/api)**
* [x]  **[child_process_child_process_spawn_command_args_options](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)**
* [x]  **[child_process_child_process_exec_command_args_options](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)**

**Mongo**
* [x]  **[mongodb](https://docs.mongodb.com/manual/introduction/)**
* [x]  **[mongoose](http://www.nodeclass.com/api/mongoose.html)**

**express**
* [x]  **[expressjs](http://expressjs.com/)**
* [x]  **[multer](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)**

**test**
* [x]  **[mocha](http://mochajs.org/)**
* [x]  **[expect](https://github.com/mjackson/expect)**
* [x]  **[superagent](http://visionmedia.github.io/superagent/)**
* [x]  **[mocha chai](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)**
* [x]  **[mocha Superagent](https://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/)**

**batch file**
* [x]  **[batchfiles](http://commandwindows.com/batchfiles-branching.htm)**
* [x]  **[Write-a-Batch-File](http://www.wikihow.com/Write-a-Batch-File)**
* [x]  **[how-to-find-out-if-tomcat-has-stopped-running-with-batch](http://stackoverflow.com/questions/26941864/how-to-find-out-if-tomcat-has-stopped-running-with-batch)**
* [x]  **[how-to-start-stop-apache-tomcat-server-via-command-line](http://crunchify.com/how-to-start-stop-apache-tomcat-server-via-command-line-setup-as-windows-service/)**

**node service manage**
* [x]  **[pm2](http://pm2.keymetrics.io/docs/usage/quick-start/)**
* [x]  **[forever](https://github.com/foreverjs/forever)**

# developement
 
 to dev:
 ```text
 npm run dev
 ```
 to deploy:
 ```text
 npm run build
 ```
 to run server:
 ```text
 cd server
 npm start
 ```
 
## 目录结构
```txt
+---build               // 构建配置文件                   
|     config.js
|     utils.js
|     webpack.base.js
|     webpack.dev.js
|     webpack.prod.js
|
+---client              // 客户端              
|   +---assets
|   |   +---css
|   |   +---fonts
|   |   +---js
|   +---components
|   +---filter
|   +---router
|   +---scripts
|   +---store
|   +---views
|   |   app.js
|   |   App.vue
|
|+---config              // 配置
|
|+---server              //服务端
|   +---bin
|   +---config
|   +---core
|   +---models
|   +---public
|   +---routes
|   +---test
|   +---utils
|   +---views
|   |   app.js
|   |   package.json
|
|   index.html
|   package.json
```
# mongoDB 使用
- 安装 mongoDB 到 D 盘
- 在 D 盘根目录下创建 MongoData\db\ (存储数据库信息)及 MongoData\log\mongodb.log(存储日志)
- 在 MongoDB 安装 bin 目录下(如 D:\programFiles\MongoDB\Server\3.2\bin),新建mongo.config文件
- 在mongo.config文件中填入一下信息：
```text
##数据库目录
```
dbpath=D:\MongoData\db
```
##日志输出文件
```
logpath=D:\MongoData\log\mongodb.log
```
```
- 打开命令行并进入 MongoDB 安装 bin 目录下。执行以下指令： 
```text
mongod --config path/to/mongo.config --install
```
如：
```text
D:\programFiles\MongoDB\Server\3.2\bin>mongod --config D:\programFiles\MongoDB\Server\3.2\bin\mongo.config --install
```
之后，可以再window系统的服务中启动 MongoDB 数据库服务

