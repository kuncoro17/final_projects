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
export const createKartu = async (nomor_kartu, nik) => {
    try {
        const response = await axios.post('http://localhost:3002/api/kartu-absen/create', {
            nomor_kartu,
            nik
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
export const updateKartu = async (nomor_kartu, nik) => {
    try {
        const response = await axios.put('http://localhost:3002/api/kartu-absen/update', {
            nomor_kartu,
            nik
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getCardDataByNomorKartu = async (nomorKartu) => {
    const response = await fetch(`http://localhost:3002/api/kartu-absen/nomor-kartu?nik=${nomorKartu}`);
    if (!response.ok) {
        throw new Error(`Error fetching card data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};

export const getabsenbytanggal = async (tgl1, tgl2) => {
    const url = `http://localhost:3001/absens/tanggal?start_date=${tgl1}&end_date=${tgl2}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAbsenByNIK = async (nik) => {
    const url = `http://localhost:3001/absens/nik?nik=${nik}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data by NIK:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateKaryawan = async (nik, updatedData) => {
    const url = `http://localhost:3001/update`;
    try {
        // Log the request payload to debug
        console.log('Updating Karyawan with data:', { nik, ...updatedData });
        const response = await axios.put(url, { nik, ...updatedData });
        return response.data;
    } catch (error) {
        console.error('Error updating data by NIK:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const user = async (nik) => {
    const url = `http://localhost:3001/usersbyusername?nik=${nik}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data by NIK:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const updateuser = async (nik, updatedData) => {
    const url = `http://localhost:3001/update_user`;
    try {
        // Log the request payload to debug
        console.log('Updating Karyawan with data:', { nik, ...updatedData });
        const response = await axios.put(url, { nik, ...updatedData });
        return response.data;
    } catch (error) {
        console.error('Error updating data by NIK:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const getgrafik = async () => {
    try {
        const response = await axios.get('http://localhost:3001/monthly-attendance');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const register = async (userData) => {
    try {
        const response = await axios.post('http://localhost:3001/register', userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};