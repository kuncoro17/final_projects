import React, { useEffect, useState } from 'react';
import { getKaryawanData } from '../services/ApiServices';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';
import { Link } from 'react-router-dom';

const Karyawan = () => {
    const [karyawanData, setKaryawanData] = useState([]);
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getKaryawanData();
                setKaryawanData(data);
            } catch (error) {
                console.error('Error fetching karyawan data:', error);
            } finally {
                setLoading(false); // Set loading ke false setelah data di-fetch
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Karyawan List</h1>
                    {loading ? (
                        <p>Loading karyawan data...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {karyawanData.length > 0 ? (
                                karyawanData.map((karyawan) => (
                                    <div key={karyawan.id} className="bg-white p-4 rounded-lg shadow-md">
                                        <p className="mt-2 text-gray-600"><strong>Jumlah Karyawan:</strong> {karyawan.nik}</p>
                                        <Link to={`/karyawan-detail/${karyawan.penempatan_payroll}`} className="mt-2 text-blue-600 hover:underline">
                                            <strong>Kode Bagian:</strong> {karyawan.penempatan_payroll}
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No karyawan data available.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Karyawan;
