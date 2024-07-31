// routes/absenTransaksiRoutes.js

const express = require('express');
const router = express.Router();
const absenTransaksiController = require('../controller/absenTransaksiController');

router.post('/create', absenTransaksiController.createAbsenTransaksi);
router.put('/update', absenTransaksiController.updateTransaksiPresensi);

module.exports = router;
