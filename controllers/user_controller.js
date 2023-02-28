const User =require('./../models/user');

module.exports.profile=(req,res)=>{
    
    const cookies = req.cookies;
    if(!cookies.userId){
        return res.redirect('/users/sign-in');
    }
    return res.render('user_profile',{
        username: cookies.userId,
    });

};

module.exports.signup=(req,res)=>{
    return res.render('user_sign_up');
};
module.exports.signIn=(req,res)=>{
    return res.render('user_sign_in');
}
module.exports.signOut=(req,res)=>{
    res.clearCookie('userId');
    return res.redirect('sign-in');
};


module.exports.createSession=(req,res)=>{
    
    const userId= req.body.email;
    const password= req.body.password;

    if(userId){
        User.findOne({email: userId, password:password}, function(err, user){
            if(err){
                console.log("Error in signing user: " + err);
                return res.redirect('users/sign-in');
            }

            if(user){
                console.log(user);
                res.cookie('userId',user.email);
                // console.log(req.cookies);
                return res.redirect('/users');
            }else{
                return res.end("<h1>Enter correct email and password</h1>");
            }
        })

    }else{
        return res.redirect('/users/sign-in');
    }
    


};
module.exports.createUser=(req,res)=>{
    if(req.body.password != req.body.re_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error creating user',err);
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log('Error in find the user',err);
        return res.redirect('back');
    });
}
