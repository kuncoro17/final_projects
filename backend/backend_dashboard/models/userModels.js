// userModels.js
const pool = require('../config/db');

const getUserByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
};

const createUser = async (nik, username, hashedPassword, kode_bagian) => {
    await pool.query('INSERT INTO users (nik, username, password, kode_bagian) VALUES ($1, $2, $3, $4)', [nik, username, hashedPassword, kode_bagian]);
};

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

const getUserByUsernamekaryawan = async (username) => {
    const result = await pool.query('SELECT * FROM users JOIN karyawan_data ON users.nik = karyawan_data.nik WHERE users.username = $1', [username]);
    return result.rows[0];
};



module.exports = {
    getUserByUsername,
    createUser,
    getAllUsers,
    getUserByUsernamekaryawan
};
