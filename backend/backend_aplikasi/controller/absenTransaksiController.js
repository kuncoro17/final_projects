// src/controllers/absenTransaksiController.js

const { createAbsenTransaksiService, updateTransaksiPresensiService } = require('../services/absenTransaksiService');

const createAbsenTransaksi = async (req, res) => {
    try {
        const newAbsen = await createAbsenTransaksiService(req.body);
        res.status(201).json(newAbsen);
    } catch (error) {
        console.error('Error creating attendance record:', error.message);
        res.status(500).json({ message: 'Error creating attendance record' });
    }
};

const updateTransaksiPresensi = async (req, res) => {
    const data = req.body;

    try {
        const updatedTransaksiPresensi = await updateTransaksiPresensiService(data);
        res.status(200).json(updatedTransaksiPresensi);
    } catch (error) {
        console.error('Error updating transaksi presensi:', error.message);
        res.status(500).json({ message: 'Error updating transaksi presensi', error: error.message });
    }
};

module.exports = {
    createAbsenTransaksi,
    updateTransaksiPresensi
};
