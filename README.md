USER AUTHENTICATION USING PASSPORT

Passport is an authentication middleware for Node. It is extremely flexible, modular and designed to authenticate requests. Passport allows us to employ different strategies for authentication based on the needs of the application. This write up is concerned with local strategy that is used to authenticate users to the web application.

BIBILOGRAPHY:
Salt: A salt is randomly generated for each password. In a typical setting, the salt and the password are concatenated and processed with a cryptographic hash function, and the resulting output (but not the original password) is stored with the salt in a database. Hashing allows for later authentication without keeping and therefore risking the plaintext password in the event that the authentication data store is compromised.

Hashing : Technique similar to hash table data structure except the hash function is hard to guess. Hash value of password along with salt is stored in databse.

Important thing to note is plain text password is never stored in database.

DEPENDENCY:
To use the authenitcation functionality of passport with mongodb application we need to install three modules. To install run the following

npm install --save passport
npm install --save passport-local
npm install --save passport-local-mongoose

The last package is a very handy module which abstracts most of the encryption and decrypt functionality such as hasing and salting the password. This decorates the mongo db user model with authenticate, register, serialize and deserialize methods.

Following steps have to be done to use the passport module.

INITIALIZED:
To use the passport module, need to do the following in app.js after the session middleware is setup
app.use(passport.initialize());
app.use(passport.session());

SETUP:
Following is how we need to set up the user model to be used by passport.
var passportLocalMongoose = require('passport-local-mongoose');
var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type:String},  
});
userSchema.plugin(passportLocalMongoose);

The plugin method provided by passport-local-mongoose takes care of encrypting the password and comparing the passwords instead of the programmer doing it explicitly.

CONFIGURE:
//create the local strategy for user authentication (This strategy can be different depending on the application need for example we can use one of social media strategy such facebook, twitter login)
passport.use(new LocalStrategy(User.authenticate())); 
//serializes each request with user id
passport.serializeUser(User.serializeUser());
//deserializes the request
passport.deserializeUser(User.deserializeUser());


USAGE:

Registering a new user:
Create a view for register form in pug and add the following to the route of register for post method. register() is a static method provided by the module to create the new user in the mongo database and automatically generate the salt and hash for the password used 

User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
          return res.render('register', { user : user });
      }
       
      passport.authenticate('local')(req, res, function () {          
          res.redirect('/buy');
      });
 });


login for existing user:
Create a view for login form in pug and the following to the route for post method for user authentication. (In my case this is index page of the app)
authenticate() is another method provided by passport that returns a closure. This takes in username and password typed in by user and generates the hash of it and compares the existing password in the db for that username. If it is not successful, the response is directed to same page else 
Passport also exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.

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
