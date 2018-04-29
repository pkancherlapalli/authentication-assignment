var express = require('express');
//var flash = require('connect-flash');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();


/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Online Book Store' });
});

/*
//router.use(flash());
router.post('/', function(req, res, next) {
  passport.authenticate('register', { successRedirect: '/buy',
                                      failureRedirect: '/register' 
                                    }, null);
});
*/

router.post('/', function(req, res) {
  User.register(new User({ username : req.body.username ,
                           password : req.body.password }), req.body.password, function(err, user) {
      if (err) {
          return res.render('register', { user : user });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/buy');
      });
  });
});
module.exports = router;