/**
 * Created by skz on 2016/12/28 0028.
 */
let App = require('../models/App');

const getApps = (req, res) => {
  "use strict";
  App.find((err, apps) => {
    res.send( !err ? {result : true, message : apps}
      : {result : false, message : "Failed get data from DB."} );
  });
};

const getApp = (req, res) => {
  "use strict";
  App.findById(req.params.id,  (err, app) => {
    res.send( !err ? {result : true, message : app}
      : {result : false, message : 'error when get app '+ req.params.id} );
  });
};

const updateApp = (req, res) => {
  "use strict";
  App.findById({_id: req.params.id}, (err, app) => {
    if(err) res.send({result : false, message : 'error when update app '+ req.params.id});

    Object.assign(app, req.body).save((err, app) => {
      if(err) res.send({result : false, message : 'error when update app '+ req.params.id});
      res.json({result : true, message : app});
    });
  });
};

const createApp = (req, res) => {
  "use strict";
  let app = new App(req.body);

  app.save((err,app) => {
    res.send( !err ? {result : true, message : app}
      : {result : false, message : 'error when create app ' + req.body + ' details: ' + err} );
  });
};

const deleteApp = (req, res) => {
  "use strict";
  App.remove({_id : req.params.id}, (err, app) => {
    res.send( !err ? {result : true, message : 'app '+ req.params.id +' has been removed'}
      :{result : false, message : 'error when removed app '+ req.params.id} );
  });
};

module.exports = { getApps , getApp, updateApp,createApp,deleteApp};
