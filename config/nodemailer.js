const nodemailer= require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter= nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'tryhardkun123@gmail.com',
        pass:'abyadgcofkvfiksu',
    },
    tls: {
        rejectUnauthorized: false
    },
});

let renderTemplate = (data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        (err,template)=>{
            if(err){
                console.log("Error in rendering template",err);
            }
            mailHtml=template;
        }
    )
    return mailHtml;
}
module.exports ={
    transporter,
    renderTemplate,
};