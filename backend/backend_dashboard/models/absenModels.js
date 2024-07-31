const pool = require('../config/db');
const moment = require('moment-timezone');
const getAbsen = async () => {
    try {
    const result = await pool.query('SELECT * FROM transaksi_presensi');
    if (result.rows.length > 0) {
        const data = result.rows.map(row => {
            return {
                ...row,
                tanggal_masuk: moment(row.tanggal_masuk).tz('Asia/Jakarta').format('YYYY-MM-DD')
            };
        });
        return data;
    } else {
        return []; // Return empty array if no rows are found
    }
} catch (error) {
    console.error('Error in getAbsenBytanggal model:', error.message);
    throw error;
}
};

const getAbsenBynik = async (nik) => {
    try {
    if (!nik) {
        throw new Error('NIK parameter is required');
    }
    const result = await pool.query('SELECT * FROM transaksi_presensi WHERE nik = $1', [nik]);
    if (result.rows.length > 0) {
        const data = result.rows.map(row => {
            return {
                ...row,
                tanggal_masuk: moment(row.tanggal_masuk).tz('Asia/Jakarta').format('YYYY-MM-DD')
            };
        });
        return data;
    } else {
        return []; // Return empty array if no rows are found
    }
} catch (error) {
    console.error('Error in getAbsenBytanggal model:', error.message);
    throw error;
}
}
const getAbsenBytanggal = async (start_date, end_date) => {
    try {
        const result = await pool.query('SELECT * FROM transaksi_presensi WHERE tanggal_masuk BETWEEN $1 AND $2 ORDER BY tanggal_masuk ASC', [start_date, end_date]);

        // Convert tanggal_masuk to Asia/Jakarta timezone and format it as YYYY-MM-DD
        if (result.rows.length > 0) {
            const data = result.rows.map(row => {
                return {
                    ...row,
                    tanggal_masuk: moment(row.tanggal_masuk).tz('Asia/Jakarta').format('YYYY-MM-DD')
                };
            });
            return data;
        } else {
            return []; // Return empty array if no rows are found
        }
    } catch (error) {
        console.error('Error in getAbsenBytanggal model:', error.message);
        throw error;
    }
};

const getAbsenByKodeBagian = async (kode_bagian) => {
    try {
        const result = await pool.query('SELECT * FROM transaksi_presensi WHERE kode_bagian = $1', [kode_bagian]);

        if (result.rows.length > 0) {
            const data = result.rows.map(row => ({
                ...row,
                tanggal_masuk: moment(row.tanggal_masuk).tz('Asia/Jakarta').format('YYYY-MM-DD')
            }));
            return data;
        } else {
            return []; // Return empty array if no rows are found
        }
    } catch (error) {
        console.error('Error in getAbsenByKodeBagian model:', error.message);
        throw error;
    }
};


module.exports = {
    getAbsen,
    getAbsenBynik,
    getAbsenBytanggal,
    getAbsenByKodeBagian
};
