const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    const postData = await Post.findById(post.id).populate('user','-password');
    if(req.xhr){
        return res.status(200).json({
          data:{
            post:postData,
          },
          message:"Post Created successfully!!"
        });
    }


    req.flash('success', 'Post created successfully');
    return res.redirect("back");
  } catch (err) {
    console.log("Error creating post in post_controller", err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if(posts.user.toString()== req.user.id){
      posts.remove();

      await Comment.deleteMany({post:req.params.id})

      if(req.xhr){
        return res.status(200).json({
          data:{
            post_Id:req.params.id,
          },
          message:'Post deleted'
        });
      }




      req.flash('success', 'Post and comment deleted');
      return res.redirect('back');
    }else{
      return res.redirect('back');
    }

  } catch (error) {
    console.error("DestroyPost:",error);
    return res.redirect('back');
  }
};
