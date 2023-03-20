const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter');
const postRouter = require('./postsRouter');
const commentsRouter = require('./commentsRouter');
const homeController = require('../controllers/home_controller');
const passport = require('passport');

router.use('/users',usersRouter);
router.use('/posts',postRouter);
router.use('/comments',commentsRouter);

router.get('/', homeController.home);


// Here we are specifying the export function to be a router object
module.exports= router;