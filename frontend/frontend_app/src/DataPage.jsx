import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DataPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { kartuAbsen } = location.state || {};

    useEffect(() => {
        if (kartuAbsen) {
            createAttendanceRecord(kartuAbsen);
        }
    }, [kartuAbsen]);

    const createAttendanceRecord = async (data) => {
        try {
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
                    jam_masuk: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    tanggal_masuk: new Date().toISOString().slice(0, 10),
                    tanggal_insert: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error creating attendance record');
            }

            alert('Berhasil melakukan absen');
            navigate('/');
        } catch (error) {
            console.error('Error creating attendance record:', error.message); // Detailed error logging
            alert(`Error creating attendance record: ${error.message}`);
        }
    };

    if (!kartuAbsen) {
        return <p>No data available</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-blue-500 mb-5">Card Data</h1>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(kartuAbsen, null, 2)}</pre>
        </div>
    );
};

export default DataPage;
