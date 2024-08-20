const path = require('path');
const fs = require('fs');
const { getkaryawan, getkaryawanbypenempatanpayroll, getkaryawanbyNik ,updateUser,insertKaryawan } = require('../models/data_karyawanModels');
const { updateUsers} = require('../models/userModels');

// const userServices = require('../services/userServices');

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
const updateUserController = async (req, res) => {
    try {
        const { nik, nama_lengkap, penempatan_payroll } = req.body;
        if (!nik || !nama_lengkap || !penempatan_payroll) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await updateUser(nik, nama_lengkap, penempatan_payroll);

        if (result && result.rowCount > 0) {
            return res.status(200).json({ message: 'Karyawan updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateusers = async (req, res) => {
    try {
        const { nik, username, password, kode_bagian } = req.body;
        if (!nik || !username || !password || !kode_bagian) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await updateUsers(nik, username, password, kode_bagian);

        if (result && result.rowCount > 0) {
            return res.status(200).json({ message: 'Users updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const insertKaryawanController = async (req, res) => {
    try {
        const { nik, nama_lengkap, penempatan_payroll } = req.body;
        const photo = req.file; // Access the uploaded file

        if (!nik || !nama_lengkap || !penempatan_payroll || !photo) {
            return res.status(400).json({ message: 'All fields are required including photo' });
        }

        // Create a folder using the NIK
        const folderPath = path.join(__dirname, '..', 'uploads', nik);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Create a new file name using NIK, nama_lengkap, and "photo"
        const fileExtension = path.extname(photo.originalname);
        const newFileName = `${nik}_${nama_lengkap}_photoprofile${fileExtension}`;
        const newFilePath = path.join(folderPath, newFileName);

        // Move the file to the new location
        fs.renameSync(photo.path, newFilePath);

        // Call the model function to insert data
        const result = await insertKaryawan(nik, nama_lengkap, penempatan_payroll, newFilePath);

        if (result) {
            return res.status(201).json({ message: 'Karyawan inserted successfully', data: result });
        } else {
            return res.status(500).json({ message: 'Failed to insert Karyawan' });
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getkaryawans,
    getKaryawanByPenempatanPayroll,
    getKaryawanByNik,
    updateUserController,
    updateusers,
    insertKaryawanController,

};
