const { getkaryawan } = require('../models/data_karyawanModels');

const getkaryawans = async (req, res) => {
    try {
        const result = await getkaryawan(); // Ambil data dari model
        if (!result) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getkaryawans,
};
