// src/routes/absenRoutes.js
const express = require('express');
const router = express.Router();
const absenController = require('../controller/absenController');

router.get('/absens', absenController.fetchAllAbsen);
router.get('/absens/nik', absenController.getAbsenBynik);
router.get('/absens/tanggal', absenController.fetchAbsenByTanggal);
router.get('/absens/by-kode-bagian', absenController.fetchAbsenByKodeBagian);
router.get('/monthly-attendance', absenController.getMonthlyAttendanceData);

module.exports = router;
