var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');

var router = express.Router();
router.use(flash());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Book Store' ,flashMsg : req.flash('loginerr') });
});

router.post('/', function(req, res, next) {
  passport.authenticate('login', { successRedirect: '/buy',
                                   failureRedirect: '/' ,
                                   failureFlash: true})
});
module.exports = router;
