// src/services/absenTransaksiService.js

const AbsenTransaksi = require('../models/absenTransaksiModel');

const createAbsenTransaksi = async (data) => {
    try {
       ;
        const newAbsen = await AbsenTransaksi.create(data);
        console.log(3)
        return newAbsen;
    } catch (error) {
        console.error('Error in createAbsenTransaksi service:', error.message);
        throw error;
    }
};

module.exports = {
    createAbsenTransaksi,
};
