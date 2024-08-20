const { getAbsen, getAbsenBynik: getAbsenBynikFromService, getAbsenBytanggal,getAbsenByKodeBagian,getMonthlyAttendance } = require('../services/absenServices');


const fetchAllAbsen = async (req, res) => {
    try {
        const absens = await getAbsen();
        res.status(200).json(absens);
    } catch (error) {
        console.error('Error fetching all absens:', error.message);
        res.status(500).json({ message: 'Error fetching all absens' });
    }
};
const logout = (req, res) => {
    // Any server-side logout logic (if necessary) goes here
    // For stateless JWT, this might just return a success message
    res.json({ message: 'Logout successful' });
};


const getAbsenBynik = async (req, res) => {
    const { nik } = req.query; // Use query parameter here
    if (!nik) {
        return res.status(400).json({ message: 'NIK parameter is required' });
    }
    try {
        const absens = await getAbsenBynikFromService(nik);
        res.status(200).json(absens);
    } catch (error) {
        console.error('Error fetching absens by NIK:', error.message);
        res.status(500).json({ message: 'Error fetching absens by NIK' });
    }
};

const fetchAbsenByTanggal = async (req, res) => {
    const { start_date, end_date } = req.query;
    try {
        const absens = await getAbsenBytanggal(start_date, end_date);
        res.status(200).json(absens);
    } catch (error) {
        console.error('Error fetching absens by date range:', error.message);
        res.status(500).json({ message: 'Error fetching absens by date range' });
    }
};
const fetchAbsenByKodeBagian = async (req, res) => {
    const { kode_bagian } = req.query; // Ensure this matches the query parameter in your request
    try {
        if (!kode_bagian) {
            return res.status(400).json({ message: 'kode_bagian is required' });
        }

        const absens = await getAbsenByKodeBagian(kode_bagian);
        res.status(200).json(absens);
    } catch (error) {
        console.error('Error fetching absens by kode_bagian:', error.message);
        res.status(500).json({ message: 'Error fetching absens by kode_bagian' });
    }
};
// controllers/attendanceController.js


const getMonthlyAttendanceData = async (req, res) => {
    try {
        const data = await getMonthlyAttendance();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching monthly attendance data' });
    }
};



module.exports = {
    fetchAllAbsen,
    getAbsenBynik,
    fetchAbsenByTanggal,
    fetchAbsenByKodeBagian,
    getMonthlyAttendanceData,
    logout
};
