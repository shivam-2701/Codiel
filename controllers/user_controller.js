const User = require("./../models/user");
const Post = require("./../models/post");

module.exports.profile = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("user_profile", { currentUser: user });
    })
    .catch((err) => {
      console.error("user_controller user fetch error", err);
    });
};

// User Profile data updation logic

module.exports.update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
    })
      .then((user) => {
        return res.redirect('back');
      })
      .catch((err) => {
        console.error("user_controller update error", err);
        return res.redirect('back');
      });
  }else{
    // Sending a 401 unauthorized error
    return res.status(401).send('Unauthorized');
  }
};

// Signing in and sign up logic

module.exports.signup = (req, res) => {
  return res.render("user_sign_up");
};
module.exports.signIn = (req, res) => {
  return res.render("user_sign_in");
};

module.exports.createSession = (req, res) => {
  return res.redirect("/");
};
module.exports.createUser = (req, res) => {
  if (req.body.password != req.body.re_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("error creating user", err);
          }
          return res.redirect("/users/sign-in");
        });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error in find the user", err);
      return res.redirect("back");
    });
};

module.exports.destroySession = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log("Error in destroy session", err);
      return res.redirect("back");
    }
  });
  return res.redirect("/users");
};
