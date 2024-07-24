const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Define the route with the correct controller function
router.get('/getkaryawan', userController.getkaryawans);

module.exports = router;
