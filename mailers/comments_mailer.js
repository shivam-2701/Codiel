const nodemailer = require('../config/nodemailer');


// Another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside new comment mailer');

    let htmlString = nodemailer.renderTemplate({comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'tryhardkun123@gmail.com',
        to:comment.user.email,
        subject:"New Comment published",
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in sending the mail',err);
            return ;
        }
        console.log("Message sent");
        return ;
    })
}