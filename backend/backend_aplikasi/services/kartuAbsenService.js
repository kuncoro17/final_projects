const KartuAbsen = require('../models/kartuAbsen');

const getAllKartuAbsen = async () => {
    return await KartuAbsen.getAllKartuAbsen();
};

const getKartuAbsenById = async (id) => {
    return await KartuAbsen.getKartuAbsenById(id);
};
const   getKartuAbsenByNomorKartu = async (nomor_kartu) => {
    return await KartuAbsen.getKartuAbsenByNomorKartu(nomor_kartu);
};
const getDataByNomorKartu = async (nomor_kartu) => {
    return await KartuAbsen.getDataByNomorKartu(nomor_kartu);
};
const getpulang = async (nomor_kartu) => {
    try {
        return await KartuAbsen.getpulang(nomor_kartu);
    } catch (error) {
        console.error('Error in getpulang service:', error.message);
        throw error;
    }
};

module.exports = {
    getpulang
};



const createKartuAbsen = async (data) => {
    return await KartuAbsen.create(data);
};

const updateKartuAbsen = async (id, data) => {
    return await KartuAbsen.update(data, {
        where: { id_kartu: id }
    });
};

const deleteKartuAbsen = async (id) => {
    return await KartuAbsen.destroy({
        where: { id_kartu: id }
    });
};
// services/kartuAbsenService.js
const pool = require('../config/db');

exports.getUserByNomorKartu = async (nomor_kartu) => {
    const result = await pool.query('SELECT * FROM kartu_absen WHERE nomor_kartu = $1', [nomor_kartu]);
    return result.rows[0];
};


module.exports = {
    getAllKartuAbsen,
    getKartuAbsenById,
    getKartuAbsenByNomorKartu,
    getDataByNomorKartu,
    createKartuAbsen,
    updateKartuAbsen,
    deleteKartuAbsen,
    getpulang
};
