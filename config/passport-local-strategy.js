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
  done(null, user.id);
});

//  Deserializing the user from the key in the cookie

passport.deserializeUser(function (user, done) {
  User.findById(user.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      console.error("error in find the user ", error);
    });
});

module.exports = passport;