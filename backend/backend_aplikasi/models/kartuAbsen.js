const pool = require('../config/db');
const moment = require('moment-timezone');

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
    const result = await pool.query('SELECT kartu_absen.id_kartu,kartu_absen.nik,kartu_absen.nomor_kartu,karyawan_data.nama_lengkap,users.kode_bagian FROM kartu_absen JOIN users ON kartu_absen.nik = users.nik JOIN karyawan_data ON kartu_absen.nik = karyawan_data.nik WHERE kartu_absen.nomor_kartu = $1', [nomor_kartu]);
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
const getpulang = async (nomor_kartu) => {
    try {
        const result = await pool.query(`
            SELECT kartu_absen.id_kartu,
                   transaksi_presensi.nik,
                   transaksi_presensi.tanggal_masuk,
                   kartu_absen.nomor_kartu,
                   karyawan_data.nama_lengkap,
                   transaksi_presensi.kode_bagian
            FROM kartu_absen
            JOIN transaksi_presensi ON transaksi_presensi.nik = kartu_absen.nik
            JOIN karyawan_data ON kartu_absen.nik = karyawan_data.nik
            WHERE kartu_absen.nomor_kartu = $1
        `, [nomor_kartu]);

        // Convert tanggal_masuk to Asia/Jakarta timezone and format it as YYYY-MM-DD
        if (result.rows.length > 0) {
            const data = result.rows[0];
            data.tanggal_masuk = moment(data.tanggal_masuk).tz('Asia/Jakarta').format('YYYY-MM-DD');
            return data;
        } else {
            return null; // Return null if no rows are found
        }
    } catch (error) {
        console.error('Error in getpulang model:', error.message);
        throw error;
    }
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
