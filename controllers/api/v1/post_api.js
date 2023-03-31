const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


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

        // if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            });
      

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}
