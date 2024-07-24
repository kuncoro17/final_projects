// routes/absenTransaksiRoutes.js
const express = require('express');
const router = express.Router();
const absenTransaksiController = require('../controller/absenTransaksiController');

router.post('/create', absenTransaksiController.createAbsenTransaksi);

module.exports = router;
