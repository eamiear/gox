/**
 * Created by skz on 2016/12/28 0028.
 */
let User = require('../models/User');

const getUsers = (req, res) => {
  "use strict";
  User.find((err, users) => {
    res.send( !err ? {result : true, message : users}
      : {result : false, message : "Failed get data from DB."} );
  });
};

const getUser = (req, res) => {
  "use strict";
  User.findById(req.params.id,  (err, user) => {
    res.send( !err ? {result : true, message : user}
      : {result : false, message : 'error when get user '+ req.params.id} );
  });
};

const updateUser = (req, res) => {
  "use strict";
  User.findById({_id: req.params.id}, (err, user) => {
    if(err) res.send({result : false, message : err});

    Object.assign(user, req.body).save((err, user) => {
      if(err) res.send({result : false, message : 'error when update user '+ req.params.id});
      res.json({result : true, message : user});
    });
  });
};

const createUser = (req, res) => {
  "use strict";
  let user = new User(req.body);
  user.save((err,user) => {
    res.send( !err ? {result : true, message : user}
      : {result : false, message : 'error when create user ' + req.body + ' details: ' + err} );
  });
};

const deleteUser = (req, res) => {
  "use strict";
  User.remove({_id : req.params.id}, (err, user) => {
    res.send( !err ? {result : true, message : 'path '+ req.params.id +' has been removed'}
      :{result : false, message : err} );
  });
};

const auth = (req,res,next) => {
  "use strict";
  //req.assert('name', "用户名不能为空").notEmpty();
  //req.assert('password', "密码不能为空").notEmpty();
  //const errors = req.validationErrors();

  User.findOne({name: req.body.name},(err, user) => {
    "use strict";
    if(!!err){
      res.json({result:false,message:'服务出错'});
    }
    if(!user) {
      res.json({result:false,message: '账号有误' });
    }else if(user.password === req.body.password){
      //req.session.name = user.name;
      //req.session.user = user;
      res.json({result:true,message: user });
    }else{
      res.json({result:false,message: '密码错误' });
    }
  });
};

const guest = (req,res,next) => {
  "use strict";
  res.json({result:true,message: {name: 'guest'} });
};

module.exports = { getUsers,getUser, updateUser,createUser,deleteUser,auth,guest};
