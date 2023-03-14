const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      if (post) {
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        })
          .then((comment) => {
            // adding the comment to the post object in db
            post.comments.push(comment);
            post.save();
            console.log("comment created",comment);
            res.redirect('back');
          })
          .catch((error) => {
            console.log("Error adding comment to post", error);
            res.redirect('back');
          });
      }
    })
    .catch((error) => {
      console.log("No such post exist in adding comment", error);
      res.redirect('back');
    });
}; 

// Comment Deltetion action

module.exports.destroy = (req,res)=>{

  Comment.findById(req.params.id)
  .then((comment)=>{
      if(comment && comment.user== req.user.id){

        Comment.findByIdAndDelete(req.params.id).then(()=>{
          res.redirect('back');
        }).catch((err)=>{
          console.log('Error while deleting the comment', err);
          res.redirect('back');
        });
      }else{
        res.redirect('back');
      }
  })
  .catch((error)=>{
      console.log("Error in find the comment {comment_controller.destroy}", error);
  })
};