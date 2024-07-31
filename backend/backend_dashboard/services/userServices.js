// authServices.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/data_karyawanModels');


const getkaryawan = async () => {
    return await userModel.getkaryawan();
};
const getkaryawanbypenempatanpayroll = async (penempatan_payroll) => {
    try {
        const result = await userModel.getkaryawanbypenempatanpayroll(penempatan_payroll);
        return result;
    } catch (error) {
        console.error('Error in service:', error);
        throw error;
    }
};
const getkaryawanbyNik = async (penempatan_payroll) => {
    try {
        const result = await userModel.getkaryawanbyNik(penempatan_payroll);
        return result;
    } catch (error) {
        console.error('Error in service:', error);
        throw error;
    }
};
module.exports = {
 
    getkaryawan,
    getkaryawanbypenempatanpayroll,
    getkaryawanbyNik
};
