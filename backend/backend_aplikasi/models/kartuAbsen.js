const pool = require('../config/db');

const getAllKartuAbsen = async () => {
    const result = await pool.query('SELECT * FROM kartu_absen');
    return result.rows;
};

const getKartuAbsenById = async (id) => {
    const result = await pool.query('SELECT * FROM kartu_absen WHERE id_kartu = $1', [id]);
    return result.rows[0];
};
const getDataByNomorKartu = async (nomor_kartu) => {
    const result = await pool.query('SELECT * FROM kartu_absen where  nomor_kartu = $1', [nomor_kartu]);
    return result.rows[0];
};

const getKartuAbsenByNomorKartu = async (nomor_kartu) => {
    const result = await pool.query('SELECT * FROM kartu_absen JOIN karyawan_data ON kartu_absen.nik = karyawan_data.nik WHERE kartu_absen.nomor_kartu = $1', [nomor_kartu]);
    return result.rows[0]; // Returns null if no rows are found
};
const createKartuAbsen = async (nik, nomor_kartu) => {
    await pool.query('INSERT INTO kartu_absen (nik, nomor_kartu) VALUES ($1, $2)', [nik, nomor_kartu]);
};

const updateKartuAbsen = async (id, nik, nomor_kartu) => {
    await pool.query('UPDATE kartu_absen SET nik = $1, nomor_kartu = $2 WHERE id_kartu = $3', [nik, nomor_kartu, id]);
};

const deleteKartuAbsen = async (id) => {
    await pool.query('DELETE FROM kartu_absen WHERE id_kartu = $1', [id]);
};

module.exports = {
    getAllKartuAbsen,
    getKartuAbsenById,
    getKartuAbsenByNomorKartu,
    getDataByNomorKartu,
    createKartuAbsen,
    updateKartuAbsen,
    deleteKartuAbsen
};
