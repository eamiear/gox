/**
 * Created by skz on 2016/12/28 0028.
 */
let express = require('express');
let router = express.Router();

let User = require('../models/User');

router.post('/doLogin', function(req, res, next) {
  // 校验
  req.assert('name', "用户名不能为空").notEmpty();
  req.assert('password', "密码不能为空").notEmpty();
  const errors = req.validationErrors();

  const name = req.body.name;
  const pwd = req.body.password;

  User.findOne({name: req.body.name},(err, user) => {
    "use strict";
    if(!!err){
      const json={success:false,message:'服务出错'};
      res.json(json);
      return;
    }
    if(!user) {
      const json={success:false,message: '认证失败，用户名找不到' };
      res.json(json);
    }else{
      req.session.name = user.name;
      req.session.user = user;
      const json={success:true,message: '认证成功' };
      res.json(json);
    }
  });
});

router.get('/findAll', function(req, res, next) {
  User.find(function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* POST /app  */
router.post('/create', function(req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* GET /app/id  */
router.get('/findById/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* PUT /app/:id  */
router.put('/updateById/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

/* DELETE /app/:id  */
router.delete('/delete/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

module.exports = router;
