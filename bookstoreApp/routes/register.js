var express = require('express');
//var flash = require('connect-flash');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();


/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Online Book Store' });
});

/* POST register page */
router.post('/', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
          return res.render('register', { user : user });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/buy');
      });
  });
});
module.exports = router;