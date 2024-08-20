// userModels.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const Login = async (nik) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [nik]);
    return result.rows[0];
};
const getUserByUsername = async (nik) => {
    const result = await pool.query('SELECT * FROM users WHERE nik = $1', [nik]);
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


const updateUsers = async (nik, username, password, kode_bagian) => {
    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const result = await pool.query(
            'UPDATE users SET username = $1, password = $2, kode_bagian = $3 WHERE nik = $4',
            [username, hashedPassword, kode_bagian, nik] // Pass the hashed password
        );
        return result; // Return result to access rowCount
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Update failed');
    }
};
const insertKaryawan = async (nik, nama_lengkap, penempatan_payroll, photoPath) => {
    try {
        const result = await pool.query(
            'INSERT INTO karyawan (nik, nama_lengkap, penempatan_payroll, photo) VALUES ($1, $2, $3, $4)',
            [nik, nama_lengkap, penempatan_payroll, photoPath]
        );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error inserting Karyawan:', error);
        throw new Error('Insertion failed');
    }
};

module.exports = {
    getUserByUsername,
    createUser,
    getAllUsers,
    getUserByUsernamekaryawan,
    updateUsers,
    Login,
    insertKaryawan
    
};
