const { getkaryawan, getkaryawanbypenempatanpayroll, getkaryawanbyNik } = require('../models/data_karyawanModels');

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
const getKaryawanByPenempatanPayroll = async (req, res) => {
    try {
        const { penempatan_payroll } = req.query; // Ambil parameter dari query string
        if (!penempatan_payroll) {
            return res.status(400).json({ message: 'Penempatan Payroll is required' });
        }

        // Panggil fungsi model dengan parameter
        const result = await getkaryawanbypenempatanpayroll(penempatan_payroll);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getKaryawanByNik = async (req, res) => {
    try {
        const { nik } = req.query; // Ambil parameter dari query string
        if (!nik) {
            return res.status(400).json({ message: 'Penempatan Payroll is required' });
        }

        // Panggil fungsi model dengan parameter
        const result = await getkaryawanbyNik(nik);
        
        if (result.length === 0) {
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
    getKaryawanByPenempatanPayroll,
    getKaryawanByNik

};
