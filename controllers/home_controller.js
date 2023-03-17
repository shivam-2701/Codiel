// Here we are setting the home key to a function in export object
const User = require("./../models/user");
const Post = require("./../models/post");

module.exports.home = (req, res) => {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, postList) {
      if (err) {
        console.log("Error in fetching posts", err);
        return res.redirect("/");
      }

      User.find({})
        .then((users) => {
          return res.render("home", {
            posts: postList,
            all_users: users,
          });
        })
        .catch((err) => {
          console.log("Error in fetching users", err);
          return res.redirect("back");
        });
    });
};
