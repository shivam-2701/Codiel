const express = require("express");
const app = express();
const port = 8080;
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const User = require("./models/user");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const flash = require('connect-flash');
const customMware= require('./config/middleware');

const store = new MongoStore({
  mongoUrl: "mongodb://localhost/codeial_development",
});

app.use(
  sassMiddleware({
    src: path.join(process.cwd(), "/assets/scss"),
    dest: path.join(process.cwd(), "/assets/css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// Setting up body parser and cookie parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting up layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScript", true);

// Router configuration
const router = require("./routes/homeRouter");

app.set("view engine", "ejs");

app.set("views", "./views");

// mongo store is used to store session cookie in db
app.use(
  session({
    name: "codiel",
    // TODO: Setup a proper secret key
    secret: "randomSecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use(express.static("./assets"));

app.use("/", router);


app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
