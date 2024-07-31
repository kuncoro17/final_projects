// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';
import { getUserData, getKaryawanData } from '../services/ApiServices';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [karyawanData, setKaryawanData] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const storedUsername = localStorage.getItem('username') || 'defaultUser';
            setUsername(storedUsername);

            try {
                const userResponse = await getUserData(storedUsername);
                setUserData(userResponse);

                const karyawanResponse = await getKaryawanData();
                setKaryawanData(karyawanResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome, {username}</h1>
                    {userData ? (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-2xl font-semibold text-blue-700">User Details</h2>
                            <div className="mt-4">
                                <p className="text-gray-600"><strong>Username:</strong> {userData.username}</p>
                                <p className="text-gray-600"><strong>Nama Lengkap:</strong> {userData.nama_lengkap}</p>
                                <p className="text-gray-600"><strong>NIK:</strong> {userData.nik}</p>
                                <p className="text-gray-600"><strong>Kode Bagian:</strong> {userData.kode_bagian}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}

                    <div>
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Karyawan List</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {karyawanData.length > 0 ? (
                                karyawanData.map((karyawan) => (
                                    <div key={karyawan.id} className="bg-white p-4 rounded-lg shadow-md">
                                      
                                        <p className="mt-2 text-gray-600"><strong>Jumalh Karyawan:</strong> {karyawan.nik}</p>
                                        <p className="mt-2 text-gray-600"><strong>Kode Bagian:</strong> {karyawan.penempatan_payroll}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Loading karyawan data...</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
