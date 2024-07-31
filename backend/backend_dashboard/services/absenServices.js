const absenModel = require('../models/absenModels'); // Ensure this is the correct path

const getAbsen = async () => {
    return await absenModel.getAbsen();
};

const getAbsenBynik = async (nik) => {
    if (!nik) {
        throw new Error('NIK parameter is required');
    }
    return await absenModel.getAbsenBynik(nik);
};

const getAbsenBytanggal = async (start_date, end_date) => {
    return await absenModel.getAbsenBytanggal(start_date, end_date);
};
const getAbsenByKodeBagian = async (kode_bagian) => {
    try {
        return await absenModel.getAbsenByKodeBagian(kode_bagian);
    } catch (error) {
        console.error('Error in getAbsenByKodeBagian service:', error.message);
        throw error;
    }
};

module.exports = {
    getAbsen,
    getAbsenBynik,
    getAbsenBytanggal,
    getAbsenByKodeBagian
};
