const Comment = require("../models/comment");
const Post = require("../models/post");
const CommentMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

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
    const commentData= await Comment.findById(comment._id).populate('user','-password');

    let job =queue.create('emails',commentData).save((err)=>{
        if(err){
          console.error(err);
          return;
        }
        console.log("Job enqued",job.id);
    });


    if(req.xhr){
      return res.status(200).json({
        data:{comment:commentData},
        message:"Comment created successfully",
      })
    }

    req.flash('success','Comment created successfully')
    return res.redirect('back');
   }

  } catch (error) {
    req.flash('error', 'Error in creating comment')
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

      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_Id:req.params.id,
          },
          message:"Comment deleted"
        })
      }
      req.flash('success','Comment deleted')

   }
   return res.redirect('back');

  } catch (error) {
    req.flash('error','Error while deleteing comment')
    console.error("Error in deleting comment",error);
  }

};