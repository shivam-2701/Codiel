const express = require("express");

const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/", userController.profile);

router.post("/create", userController.createUser);
router.post("/create-session", userController.createSession);
router.get("/sign-up", userController.signup);
router.get("/sign-in", userController.signIn);
module.exports = router;
