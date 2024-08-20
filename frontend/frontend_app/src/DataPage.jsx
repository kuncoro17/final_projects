import React, { useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const DataPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { kartuAbsen } = location.state || {};
    const hasSubmitted = useRef(false);

    const createAttendanceRecord = useCallback(async (data) => {
        if (hasSubmitted.current) return;

        hasSubmitted.current = true;
        try {
            const timeZone = 'Asia/Jakarta';
            const now = moment().tz(timeZone);

            const formattedJamMasuk = now.format('YYYY-MM-DD HH:mm:ss');
            const formattedTanggalMasuk = now.format('YYYY-MM-DD');

            const response = await fetch('http://localhost:3002/api/absen-transaksi/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomor_kartu: data.nomor_kartu,
                    nik: data.nik,
                    nama_lengkap: data.nama_lengkap,
                    kode_bagian: data.kode_bagian,
                    jam_masuk: formattedJamMasuk,
                    tanggal_masuk: formattedTanggalMasuk,
                    tanggal_insert_masuk: now.toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error creating attendance record');
            }

            alert('Berhasil melakukan absen');

            // setTimeout(() => {
            //     navigate('/');
            // }, 3000);
        } catch (error) {
            console.error('Error creating attendance record:', error.message);
            alert(`Error creating attendance record: ${error.message}`);
        }
    }, [navigate]);

    useEffect(() => {
        if (kartuAbsen) {
            createAttendanceRecord(kartuAbsen);
        }
    }, [kartuAbsen, createAttendanceRecord]);

    if (!kartuAbsen) {
        return <p>No data available</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-blue-500 mb-5">Card Data</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
               
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">{kartuAbsen.nama_lengkap}</h2>
                    <p className="text-gray-700 mb-2">NIK: {kartuAbsen.nik}</p>
                    <p className="text-gray-700 mb-2">Card Number: {kartuAbsen.nomor_kartu}</p>
                    <p className="text-gray-700 mb-2">Photo: </p>
                    <img 
                            src={`${kartuAbsen.photo}`} 
                          
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-2"
                        />
                    <p className="text-gray-700 mb-2">Department Code: {kartuAbsen.kode_bagian}</p>
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={() => createAttendanceRecord(kartuAbsen)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataPage;
