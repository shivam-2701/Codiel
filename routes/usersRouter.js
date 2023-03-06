const express = require("express");
const passport = require('passport');

const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/",passport.checkAuthentication ,userController.profile);


router.post("/create", userController.createUser);
// Using passport as middleWare to authenticate
router.post("/create-session", passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    }
),userController.createSession);
router.get("/sign-up", userController.signup);
router.get("/sign-in",passport.isSignedIn, userController.signIn);
router.get('/sign-out',userController.destroySession);
module.exports = router;
