const User =require('./../models/user');

module.exports.profile=(req,res)=>{
    res.render('user_profile');
};

module.exports.signup=(req,res)=>{
    return res.render('user_sign_up');
};
module.exports.signIn=(req,res)=>{
    return res.render('user_sign_in');
}


module.exports.createSession=(req,res)=>{
    return res.redirect('/users');
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

module.exports.destroySession = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log('Error in destroy session',err);
            return res.redirect('back');
        }
    })
    return res.redirect('/users');
}
