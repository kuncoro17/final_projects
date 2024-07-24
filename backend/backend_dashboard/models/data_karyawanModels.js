const pool = require('../config/db');

const getkaryawan = async () => {
    const result = await pool.query('SELECT count(nik) as nik,penempatan_payroll FROM karyawan_data group by penempatan_payroll order by penempatan_payroll asc');
    return result.rows; // Mengembalikan semua baris
};

module.exports = {
    getkaryawan,
};
