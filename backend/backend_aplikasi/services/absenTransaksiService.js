// src/services/absenTransaksiService.js

const AbsenTransaksi = require('../models/absenTransaksiModel');

const createAbsenTransaksiService = async (data) => {
    try {
        const newAbsen = await AbsenTransaksi.create(data);
        return newAbsen;
    } catch (error) {
        console.error('Error in createAbsenTransaksi service:', error.message);
        throw error;
    }
};

const updateTransaksiPresensiService = async (data) => {
    try {
        const updatedData = await AbsenTransaksi.update(data);
        return updatedData;
    } catch (error) {
        console.error('Error in updateTransaksiPresensiService:', error.message);
        throw error;
    }
};

module.exports = {
    createAbsenTransaksiService,
    updateTransaksiPresensiService
};
