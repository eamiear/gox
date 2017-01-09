/**
 * Created by skz on 2016/12/27 0027.
 */

let pkg 			= require("../../package");

module.exports = {

  uploadLimit: 2 * 1024 * 1024, // 2MB

  sessions: {
    cookie: {
      // session expiration is set by default to one week
      maxAge: 7 * 24 * (60 * 60 * 1000),

      // httpOnly flag makes sure the cookie is only accessed
      // through the HTTP protocol and not JS/browser
      httpOnly: true,

      // secure cookie should be turned to true to provide additional
      // layer of security so that the cookie is set only when working
      // in HTTPS mode.
      secure: false
    },

    // Cookie key name
    name: "sessionId",

    // Mongo store collection name
    collection: "sessions"
  },

  db: {
    uri: "mongodb://localhost/" + pkg.name,//:27017
    options: {
      //user: "",
      //pass: "",
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  },

  redis: {
    enabled: false,
    uri: "redis://localhost:6379",
    options: null
  },

  cacheTimeout: 5 * 60, // 5 mins

  features: {
    disableSignUp: false,
    verificationRequired: true
  },
  // 只能在同一个磁盘内
  serverPath: {
    php: 'E:/uploader/php/',
    node: '',
    java: 'E:/skz/01-SKZ/server/uap/webapps/'
  },
  serverVisitPath: {
    php:'http://localhost/',
    node: '',
    java:'http://localhost:8080/'
  }
};
