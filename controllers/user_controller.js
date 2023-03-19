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
        return res.redirect("back");
      })
      .catch((err) => {
        console.error("user_controller update error", err);
        return res.redirect("back");
      });
  } else {
    // Sending a 401 unauthorized error
    return res.status(401).send("Unauthorized");
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
module.exports.createUser = async (req, res) => {
  if (req.body.password != req.body.re_password) {
    return res.redirect("back");
  }
  try {
    
    const user =await User.findOne({ email: req.body.email });

    if(!user){
      await User.create(req.body); 
      return res.redirect('user/sign-in');
    }else{
      return res.redirect("back");
    }

  } catch (error) {
    console.error("Error creating user", error);
    return res.redirect("/users/sign-in");
  }
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
