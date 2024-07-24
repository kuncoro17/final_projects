// src/models/absenTransaksiModel.js


const pool = require('../config/db'); // Configure your pool

const create = async (data) => {
    console.log(4);
    const { nik, nama_lengkap, kode_bagian } = data;
    jam_masuk = new Date().toISOString().slice(0, 19).replace('T', ' ');
    tanggal_masuk=  new Date().toISOString().slice(0, 10);
    tanggal_insert_masuk = new Date().toISOString();
   
    
    try {
        console.log(1);
        const result = await pool.query(
            `INSERT INTO transaksi_presensi ( nik, nama_lengkap, kode_bagian, jam_masuk, tanggal_masuk, tanggal_insert_masuk)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nik, nama_lengkap, kode_bagian, jam_masuk, tanggal_masuk, tanggal_insert_masuk]
        );
        // const result = await pool.query("select * from absen_transaksi");

        
        return result.rows[0];
    } catch (error) {
        console.error('Error in createAbsenTransaksi service:', error.message);
        throw error;
    }
};
module.exports = {
    create,
};
