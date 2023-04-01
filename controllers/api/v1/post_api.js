const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const passport = require('passport');


module.exports.index = async (req, res)=>{


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user','-password')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select:'-password',
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        if (post && post.user == req.user._id.toString()){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.status(401).json({
                message:"you cannot delete this post",
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}
