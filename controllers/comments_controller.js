const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res)=> {

  try {
   const post = await Post.findById(req.body.post);

   if(post){
    const comment = await Comment.create({
      content:req.body.content,
      post:req.body.post,
      user:req.user._id,
    });

    post.comments.push(comment);
    post.save();
    return res.redirect('back');
   }

  } catch (error) {
    console.error("Error in comment creation", error);
  }

}; 

// Comment Deltetion action

module.exports.destroy =async (req,res)=>{


  try {
    const comment = await Comment.findById(req.params.id);

    if(comment && comment.user== req.user.id){
      const postId = comment.post;
      comment.remove();

      await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

   }
   return res.redirect('back');

  } catch (error) {
    console.error("Error in deleting comment",error);
  }

};