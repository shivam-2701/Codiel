const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession =async (req, res) => {
    try{
        let user =await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid username or password",
            });
        }
        return res.status(200).json({
            message:"Sign in successfully, here is the token,keep it safe!",
            data:{
                token:jwt.sign(user.toJSON(),'codiel',{expiresIn:5000000}),
            }
        });

    }catch(error){
        console.log("API create session failed",error);
        return res.status(500).json({
            message:"Internal server error",
        })
    }
    
  };