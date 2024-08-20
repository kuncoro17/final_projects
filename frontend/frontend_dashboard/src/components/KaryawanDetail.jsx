// KaryawanDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getKaryawanByPenempatanPayroll } from '../services/ApiServices';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

const KaryawanDetail = () => {
    const { penempatan_payroll } = useParams();
    const [karyawanData, setKaryawanData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getKaryawanByPenempatanPayroll(penempatan_payroll);
                console.log("Karyawan data:", data); // Debug line
                setKaryawanData(data);
            } catch (error) {
                console.error('Error fetching karyawan data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [penempatan_payroll]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Karyawan Detail</h1>
                    {loading ? (
                        <p>Loading karyawan data...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Bagian</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {karyawanData.length > 0 ? (
                                        karyawanData.map((karyawan) => (
                                            <tr key={karyawan.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{karyawan.nama_lengkap}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{karyawan.nik}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{karyawan.penempatan_payroll}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link to={`/karyawan-detail-by-nik/${karyawan.nik}`} className="mt-2 text-blue-600 hover:underline">
                                                        <strong>Details</strong>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No karyawan data available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default KaryawanDetail;
