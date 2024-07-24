import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardContent = () => {
    const [user, setUser] = useState(null);
    const [karyawan, setKaryawan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (!token || !username) {
                navigate('/login', { replace: true }); // Redirect if not authenticated
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/usersbyusernamekaryawan', {
                    params: { username }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login', { replace: true }); // Redirect if error occurs
            }
        };

        const fetchKaryawan = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getkaryawan');
                setKaryawan(response.data);
            } catch (error) {
                console.error('Error fetching karyawan data:', error);
            }
        };

        fetchUser();
        fetchKaryawan();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login', { replace: true }); // Redirect to login on logout
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Welcome, {user ? user.username : 'Guest'}</h3>
                <p>NIK: {user ? user.nik : 'Not available'}</p>
                <p>Nama: {user ? user.nama_lengkap : 'Not available'}</p>
                <p>Bagian: {user ? user.kode_bagian : 'Not available'}</p>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Karyawan Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {karyawan.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">{item.nama_lengkap}</h3>
                            <p><strong>Jumlah karyawan:</strong> {item.nik}</p>
                            <p><strong>Bagian:</strong> {item.penempatan_payroll}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
