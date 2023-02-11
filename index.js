const express = require('express');
const app = express();
const router = require('./routes/homeRouter')
const port = 8080;

app.use('/',router);


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on http://localhost:${port}`);
});

