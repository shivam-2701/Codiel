const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
// Authentication using passport.
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid Username or Password");
          return done(null, false);
        }
       return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookie

passport.serializeUser(function (user, done) {
  // console.log("serializing user",user);
  done(null, user._id);
});

//  Deserializing the user from the key in the cookie

passport.deserializeUser(function (userId, done) {
  // console.log('user ID: ' + userId);
  User.findById(userId)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      console.error("error in find the user ", error);
      done(error);
    });
});


passport.checkAuthentication = function(req, res, next) {
  // if the user is signed in, then pass on the request to next function (controller's action)
  if(req.isAuthenticated()){
    return next();
  }
  // if the user is not signed in
  return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function(req, res,next){
  if(req.isAuthenticated()){
    // req.user contains the current user from the session cookie and we are sending this to locals for the views
    res.locals.user = req.user;
  }
  next();
};
passport.isSignedIn = function(req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/users');
  }else{
    next();
  }
}


module.exports = passport;