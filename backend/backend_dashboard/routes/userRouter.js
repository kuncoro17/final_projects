// routes/userRoutes.js
const express = require('express');
const userController = require('../controller/userController');
const multer = require('multer'); // Import multer

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // You can specify a different destination if needed


router.post('/insert', upload.single('photo'), userController.insertKaryawanController); // Use the correct function name
// Add the multer middleware

// Existing routes...
router.get('/getkaryawan', userController.getkaryawans);
router.get('/getkaryawanbypenempatanpayroll', userController.getKaryawanByPenempatanPayroll);
router.get('/nik', userController.getKaryawanByNik);
router.put('/update', userController.updateUserController); 
router.put('/update_user', userController.updateusers); 

module.exports = router;
