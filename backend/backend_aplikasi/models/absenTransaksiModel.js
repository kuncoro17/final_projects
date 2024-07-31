// src/models/absenTransaksiModel.js


const pool = require('../config/db'); // Configure your pool

const create = async (data) => {
    const { nik, nama_lengkap, kode_bagian, jam_masuk, tanggal_masuk, tanggal_insert_masuk } = data;

    try {
        const result = await pool.query(
            `INSERT INTO transaksi_presensi (nik, nama_lengkap, kode_bagian, jam_masuk, tanggal_masuk, tanggal_insert_masuk)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nik, nama_lengkap, kode_bagian, jam_masuk, tanggal_masuk, tanggal_insert_masuk]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error in create service:', error.message);
        throw error;
    }
};


const update = async (data) => {
    const { nik, tanggal_masuk, jam_pulang, tanggal_pulang, tanggal_insert_pulang } = data;

    try {
        const result = await pool.query(
            `UPDATE transaksi_presensi
            SET  tanggal_pulang = $1, tanggal_insert_pulang = $2, jam_pulang = $3
            WHERE nik = $4 AND tanggal_masuk = $5
            RETURNING *`,
            [ tanggal_pulang, tanggal_insert_pulang, jam_pulang, nik, tanggal_masuk]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error in update service:', error.message);
        throw error;
    }
};
module.exports = {
    create,
    update
};
