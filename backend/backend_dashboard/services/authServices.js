// authServices.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

const loginUser = async (username, password) => {
    const user = await userModel.Login(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token); // Ensure this logs the token

    return token;
};

const registerUser = async (nik, username, password, kode_bagian) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(nik, username, hashedPassword, kode_bagian);
};

const getUserByUsername = async (nik) => {
    return await userModel.getUserByUsername(nik);
};
const getUserByUsernamekaryawan = async (username) => {
    return await userModel.getUserByUsernamekaryawan(username);
};


module.exports = {
    loginUser,
    registerUser,
    getUserByUsername,
    getUserByUsernamekaryawan
};
