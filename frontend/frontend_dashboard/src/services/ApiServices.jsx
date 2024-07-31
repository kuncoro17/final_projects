// src/services/ApiService.js
import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserData = async (username) => {
    try {
        const response = await axios.get(`http://localhost:3001/usersbyusernamekaryawan?username=${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getKaryawanData = async () => {
    try {
        const response = await axios.get('http://localhost:3001/getkaryawan');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getKaryawanByPenempatanPayroll = async (penempatan_payroll) => {
    try {
        const response = await axios.get(`http://localhost:3001/getkaryawanbypenempatanpayroll?penempatan_payroll=${penempatan_payroll}`);
        console.log('Karyawan detail data:', response.data); // Tambahkan log
        return response.data;
    } catch (error) {
        console.error('Error fetching karyawan by penempatan payroll:', error);
        throw error;
    }
};
export const getKaryawanByNik = async (nik) => {
    try {
        const response = await axios.get(`http://localhost:3001/nik?nik=${nik}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching karyawan detail by NIK:', error);
        throw error;
    }
};