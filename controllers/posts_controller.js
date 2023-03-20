const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success', 'Post created successfully');
    return res.redirect("back");
  } catch (err) {
    console.log("Error creating post in post_controller", error);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    if(posts.user.toString()== req.user.id){
      posts.remove();

      await Comment.deleteMany({post:req.params.id})
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
