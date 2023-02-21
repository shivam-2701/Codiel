
const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter');

const homeController = require('../controllers/home_controller')

router.use('/users',usersRouter);

router.get('/', homeController.home);

// Here we are specifying the export function to be a router object
module.exports= router;