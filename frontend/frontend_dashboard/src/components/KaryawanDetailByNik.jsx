import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKaryawanByNik } from '../services/ApiServices';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

const KaryawanDetailByNik = () => {
    const { nik } = useParams();
    const [karyawanDetail, setKaryawanDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getKaryawanByNik(nik);
                setKaryawanDetail(data);
            } catch (error) {
                console.error('Error fetching karyawan detail:', error);
            }
        };

        fetchData();
    }, [nik]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Karyawan Detail</h1>
                    {karyawanDetail ? (
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-700">{karyawanDetail.nama_lengkap}</p>
                            <p className="text-gray-500"><strong>NIK:</strong> {karyawanDetail.nik}</p>
                            <p className="text-gray-500"><strong>Kode Bagian:</strong> {karyawanDetail.penempatan_payroll}</p>
                        </div>
                    ) : (
                        <p>Loading karyawan detail...</p>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default KaryawanDetailByNik;
