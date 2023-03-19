// Here we are setting the home key to a function in export object
const User = require("./../models/user");
const Post = require("./../models/post");

module.exports.home =async (req, res) => {

  try{
  // posts contain the success result of the promise or function
  const posts = await Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
    const users=await User.find({});

    return res.render('home',{
      posts:posts,
      all_users:users,
    });
  }catch(err){
    console.error("Error in home_controller home",err);
  }
};
