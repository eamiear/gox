var express = require('express');
var router = express.Router();

/*router.use(function (req, res, next) {
  var url = req.originalUrl;
  if (url != "/login" && !req.session.user) {
    return res.redirect("/login");
  }
  next();
});*/



router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
