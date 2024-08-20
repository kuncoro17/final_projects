// authController.js
const authService = require('../services/authServices'); // Pastikan jalur ini benar

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.loginUser(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const register = async (req, res) => {
    const { nik, username, password, kode_bagian } = req.body;

    try {
        await authService.registerUser(nik, username, password, kode_bagian);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserByUsername = async (req, res) => {
    const nik = req.query.nik;

    if (!nik) {
        return res.status(400).json({ message: 'Username query parameter is required' });
    }

    try {
        const user = await authService.getUserByUsername(nik);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getUserByUsernamekaryawan = async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ message: 'Username query parameter is required' });
    }

    try {
        const user = await authService.getUserByUsernamekaryawan(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    login,
    register,
    getUserByUsername,
    getUserByUsernamekaryawan
};
