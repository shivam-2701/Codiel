
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);

// Here we are specifying the export function to be a router object
module.exports= router;