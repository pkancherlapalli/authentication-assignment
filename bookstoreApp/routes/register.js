var express = require('express');
var flash = require('connect-flash');
var passport = require('passport');

var router = express.Router();
router.use(flash());

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Online Book Store',flashMsg : req.flash('signuperr') });
});

router.post('/', function(req, res, next) {
  passport.authenticate('register', { successRedirect: '/buy',
                                   failureRedirect: '/register' ,
                                   failureFlash: true})
});
module.exports = router;