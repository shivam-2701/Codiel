const nodemailer = require('../config/nodemailer');


// Another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from:'tryhardkun123@gmail.com',
        to:comment.user.email,
        subject:"New Comment published",
        html:'<h1>YOur comment is now published</h1>',
    },(err,info)=>{
        if(err){
            console.log('Error in sending the mail',err);
            return ;
        }
        console.log("Message sent");
        return ;
    })
}