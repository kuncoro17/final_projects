    const userModel = require('../models/userModels'); // Ensure this points to the correct model file

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

    const getkaryawanbyNik = async (nik) => { // Fixed parameter name to `nik`
        try {
            const result = await userModel.getkaryawanbyNik(nik);
            return result;
        } catch (error) {
            console.error('Error in service:', error);
            throw error;
        }
    };

    const updateKaryawanByNik = async (nik, updatedData) => {
        try {
            await userModel.updateUser(nik, updatedData.nama_lengkap, updatedData.penempatan_payroll);
        } catch (error) {
            console.error('Error in service:', error);
            throw error;
        }
    };

    module.exports = {
        getkaryawan,
        getkaryawanbypenempatanpayroll,
        getkaryawanbyNik,
        updateKaryawanByNik
    };
