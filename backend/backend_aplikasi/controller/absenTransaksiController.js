// src/controllers/absenTransaksiController.js

const absenTransaksiService = require('../services/absenTransaksiService');

const createAbsenTransaksi = async (req, res) => {
    try {
       
        const newAbsen = await absenTransaksiService.createAbsenTransaksi(req.body);
        console.log(2);
        res.status(201).json(newAbsen);
        
    } catch (error) {
        console.error('Error creating attendance record:', error.message);
        res.status(500).json({ message: 'Error creating attendance record' });
    }
};

module.exports = {
    createAbsenTransaksi,
};
