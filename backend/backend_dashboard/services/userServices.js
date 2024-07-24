// authServices.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/data_karyawanModels');


const getkaryawan = async () => {
    return await userModel.getkaryawan();
};


module.exports = {
 
    getkaryawan
};
