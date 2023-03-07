const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      console.log("Post created");
      res.redirect("back");
    })
    .catch((error) => {
      console.log("Error creating post in post_controller", error);
    });
};
