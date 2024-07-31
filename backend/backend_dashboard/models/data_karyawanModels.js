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
module.exports = {
    getkaryawan,
    getkaryawanbypenempatanpayroll,
    getkaryawanbyNik
};
