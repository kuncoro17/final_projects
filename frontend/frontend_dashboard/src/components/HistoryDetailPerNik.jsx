import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAbsenByNIK } from '../services/ApiServices';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

const HistoryDetailPerNIK = () => {
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { nik } = useParams(); // Using useParams to extract the NIK from the route

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAbsenByNIK(nik);
                setEmployeeDetails(data);
                setError('');
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nik]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <div className="flex-1 p-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Attendance Details for NIK: {nik}</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nik</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tang Masuk</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employeeDetails.map((detail, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.nik}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.nama_lengkap}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.tanggal_masuk}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.jam_masuk}-{detail.jam_pulang}</td>
                                         
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryDetailPerNIK;
