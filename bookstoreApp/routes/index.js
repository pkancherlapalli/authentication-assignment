var express = require('express');
//var flash = require('connect-flash');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();
//router.use(flash());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Book Store'/* ,flashMsg : req.flash('loginerr') */});
});

/* POST home page */
router.post('/', function(req, res, next){
  User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
           res.redirect('/');
        } else {
            req.login(user, function (err) {
               if (err) {
                 res.redirect('/');
               } else {
                 res.redirect('/buy');
               }
            });
        }
    });
  
});

module.exports = router;
