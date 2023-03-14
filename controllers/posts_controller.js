const Post = require("../models/post");
const Comment = require("../models/comment");

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

module.exports.destroy = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // .id means converting the object id to a string
      if (post.user.toString() == req.user.id) {
        post.remove();

        Comment.deleteMany({ post: req.params.id })
          .then(() => {
            return res.redirect("back");
          })
          .catch((err) => {
            console.log("Error in deleting comment", err);
            return res.redirect("back");
          });
      }else{
        return res.redirect('back');
      }
    })
    .catch((error) => {
      console.log("Error in finding the Post {post_controller}", error);
    });
};
