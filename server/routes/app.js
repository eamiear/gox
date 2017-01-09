/**
 * Created by skz on 2016/12/28 0028.
 */
let express = require('express');
let router = express.Router();

let App = require('../models/App');

router.get('/findAll',() => {
  "use strict";
  return App.find((err, apps) => {
    return res.send( !err ? {result : true, app : apps}
      : {result : false, message : "Failed get data from DB."} );
  });
});

// find by id
router.get('/findById/:id',() => {
  "use strict";
  return App.findById(req.params.id,  (err, app) => {
    return res.send( !err ? {result : true, app : app}
      : {result : false, message : 'error when get app '+ req.params.id} );
  });
});

// INSERT
router.post('/create', (req, res) => {
  if(typeof req !== 'undefined'){
    if(!req.body.title) return res.send({result : false, message : "Title product is null or empty."});

    let app = new App({
      name: req.body.name,
      path: req.body.path,
      type: req.body.type,
      icon: req.body.icon,
      url: req.body.url,
      desc: req.body.desc
    });
    app.save( (err) => {
      return res.send( !err ? {result : true, app : app} :{result : false, message : err} );
    });
  }else{
    return res.send({result : false, message : "Request is null or empty."});
  }
});

// update
router.put('/updateById/:id',() => {
  "use strict";
  return App.findById(req.params.id, (err, app) => {
    if(req.body.name){
      app.name = req.body.name;
    }
    app.desc = req.body.desc;
    app.path = req.body.path;

    return app.save((err) => {
      return res.send( !err ? {result : true, app : app}
        :{result : false, message : 'error when update app '+ req.params.id} );
    });
  });
});

router.delete('/deleteById/:id', (req, res) => {
  return App.findById(req.params.id, (err, app) => {
    return app.remove((err) => {
      return res.send( !err ? {result : true, message : 'path '+ req.params.id +' has been removed'}
        :{result : false, message : 'error when remove path '+ req.params.id} );
    });
  });
});

module.exports = router;
