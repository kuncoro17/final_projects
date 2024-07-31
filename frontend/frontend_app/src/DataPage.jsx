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

            setTimeout(() => {
                navigate('/');
            }, 3000);
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
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(kartuAbsen, null, 2)}</pre>
        </div>
    );
};

export default DataPage;
