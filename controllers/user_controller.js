const User = require("./../models/user");
const Post = require("./../models/post");
const path = require("path");

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

module.exports.update = async (req, res) => {

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, (error) => {
        if (error) console.log(error);


        user.name= req.body.name;
        user.email= req.body.email;

        if(req.file){
          user.avatar= path.join(User.avatarPath , req.file.filename);
        }
        user.save();
        return res.redirect("back");
      });
    } catch (error) {
      console.error("Error in uploading avatar", error);
      return res.redirect("back");
    }
  }else {
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
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};
module.exports.createUser = async (req, res) => {
  if (req.body.password != req.body.re_password) {
    return res.redirect("back");
  }
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.redirect("user/sign-in");
    } else {
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
    req.flash("success", "You have logged out");
    return res.redirect("/");
  });
};
