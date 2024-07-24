const express = require('express');
const authController = require('../controller/authController'); 

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/usersbyusername', authController.getUserByUsername);
router.get('/usersbyusernamekaryawan', authController.getUserByUsernamekaryawan);

module.exports = router;
