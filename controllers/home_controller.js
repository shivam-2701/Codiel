// Here we are setting the home key to a function in export object
module.exports.home = (request,response)=>{
    return response.render('home');
}
