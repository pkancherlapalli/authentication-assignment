var passport = require('passport')
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.use('login', new LocalStrategy( {
       passReqToCallback :true
  },
  function(req, username, password, done) {

    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginerr','Incorrect login' ));
      }
      if (!user.comparePassword(password)) {
        return done(null, false, req.flash('loginerr','Incorrect password.' ));
      }
      return done(null, user);
    });

  }
));


passport.use('register', new LocalStrategy( {
        passReqToCallback :true
    },
    function(req, username, password, done) {

        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, req.flash('signuperr','Username already exists' ));
            }
            else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = User.encryptPassword(password);

                newUser.save((err) =>{
                    if (err) {
                        return done(err);
                    }
                    return done(null, newUser);
                })
            }
      
        }
        
    )}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
