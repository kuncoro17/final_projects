// routes/kartuAbsenRoutes.js
const express = require('express');
const router = express.Router();
const kartuAbsenController = require('../controller/kartuAbsenController');

// Use query parameter for nomor_kartu
router.post('/create', kartuAbsenController.createKartuAbsen);
router.get('/', kartuAbsenController.getAllKartuAbsen);
router.get('/by-id/:id', kartuAbsenController.getKartuAbsenById);
router.get('/by-nomor-kartu', kartuAbsenController.getKartuAbsenByNomorKartu);
router.get('/pulang', kartuAbsenController.getpulang);
router.get('/Nomor-kartu/', kartuAbsenController.getDataByNomorKartu); // Updated route to use query params
router.post('/', kartuAbsenController.createKartuAbsen);
router.put('/update', kartuAbsenController.updateKartuAbsen); 
router.delete('/:id', kartuAbsenController.deleteKartuAbsen);


module.exports = router;
