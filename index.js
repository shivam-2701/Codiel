const express = require('express');
const app = express();
const port = 8080;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const User = require('./models/user');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


// Setting up body parser and cookie parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting up layouts
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

// Router configuration
const router = require('./routes/homeRouter');
app.use('/',router);

app.set('view engine', 'ejs');

app.set('views','./views');
app.use(express.static('./assets'));




app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on http://localhost:${port}`);
});

