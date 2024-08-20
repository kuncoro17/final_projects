const pool = require('../config/db');

const getkaryawan = async () => {
    const result = await pool.query('SELECT count(nik) as nik,penempatan_payroll FROM karyawan_data group by penempatan_payroll order by penempatan_payroll asc');
    return result.rows; // Mengembalikan semua baris
};
const getkaryawanbypenempatanpayroll = async (penempatan_payroll) => {
    try {
        const query = 'SELECT * FROM karyawan_data WHERE penempatan_payroll = $1'; // Gunakan $1 untuk parameterisasi query
        const result = await pool.query(query, [penempatan_payroll]); // Gunakan pool.query
        return result.rows; // Mengembalikan semua baris
    } catch (error) {
        console.error('Error in getkaryawanbypenempatanpayroll function:', error);
        throw new Error('Database query failed');
    }
};

const getkaryawanbyNik = async (penempatan_payroll) => {
    try {
        const query = 'SELECT * FROM karyawan_data WHERE nik = $1'; // Gunakan $1 untuk parameterisasi query
        const result = await pool.query(query, [penempatan_payroll]); // Gunakan pool.query
        return result.rows; // Mengembalikan semua baris
    } catch (error) {
        console.error('Error in getkaryawanbypenempatanpayroll function:', error);
        throw new Error('Database query failed');
    }
};
const updateUser = async (nik, nama_lengkap, penempatan_payroll) => {
    try {
        const result = await pool.query(
            'UPDATE karyawan_data SET nama_lengkap = $1, penempatan_payroll = $2 WHERE nik = $3',
            [nama_lengkap, penempatan_payroll, nik]
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
            'INSERT INTO karyawan_data (nik, nama_lengkap, penempatan_payroll, photo) VALUES ($1, $2, $3, $4)  RETURNING id_karyawan_data',
            [nik, nama_lengkap, penempatan_payroll, photoPath]
        );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error inserting Karyawan:', error);
        throw new Error('Insertion failed');
    }
};


module.exports = {
    getkaryawan,
    getkaryawanbypenempatanpayroll,
    getkaryawanbyNik,
    updateUser,
    insertKaryawan
};
