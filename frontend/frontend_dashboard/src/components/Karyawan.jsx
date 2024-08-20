import React, { useEffect, useState } from 'react';
import { getKaryawanData, register } from '../services/ApiServices'; // Update import
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';
import { Link } from 'react-router-dom';

const Karyawan = () => {
    const [karyawanData, setKaryawanData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false); // New state for user modal
    const [nik, setNik] = useState('');
    const [namaLengkap, setNamaLengkap] = useState('');
    const [kodeBagian, setKodeBagian] = useState('');
    const [foto, setFoto] = useState(null);
    
    // User registration state
    const [registerNik, setRegisterNik] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerKodeBagian, setRegisterKodeBagian] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getKaryawanData();
                setKaryawanData(data);
            } catch (error) {
                console.error('Error fetching karyawan data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddKaryawan = (e) => {
        e.preventDefault();
        const newKaryawan = { nik, namaLengkap, kodeBagian, foto };
        setKaryawanData([...karyawanData, newKaryawan]);
        resetForm();
        setIsModalOpen(false); // Close the modal after adding a new karyawan
    };

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                nik: registerNik,
                username,
                password,
                kode_bagian: registerKodeBagian,
            });
            console.log('User registered:', response);
            // Show success alert
            alert('User successfully registered!');
            // Optionally, you can reset form fields
            setRegisterNik('');
            setUsername('');
            setPassword('');
            setRegisterKodeBagian('');
            // Close the modal
            setIsUserModalOpen(false);
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error (e.g., show error message)
            alert('Error registering user. Please try again.');
        }
    };
    const resetForm = () => {
        setNik('');
        setNamaLengkap('');
        setKodeBagian('');
        setFoto(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">Karyawan List</h1>

                    {/* Add buttons for adding new data */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
                        >
                            Tambah Data Karyawan
                        </button>
                        <button
                            onClick={() => setIsUserModalOpen(true)} // Open user registration modal
                            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-300"
                        >
                            Tambah Data User
                        </button>
                    </div>

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

                    {/* Modal for adding new karyawan */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-96">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-4">Tambah Karyawan</h2>
                                    <form onSubmit={handleAddKaryawan}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Nik</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 p-2 border rounded"
                                                value={nik}
                                                onChange={(e) => setNik(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 p-2 border rounded"
                                                value={namaLengkap}
                                                onChange={(e) => setNamaLengkap(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Kode Bagian</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 p-2 border rounded"
                                                value={kodeBagian}
                                                onChange={(e) => setKodeBagian(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Upload Foto</label>
                                            <input
                                                type="file"
                                                className="w-full mt-1 p-2"
                                                onChange={(e) => setFoto(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for user registration */}
                    {isUserModalOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg w-96">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Tambah User</h2>
                <form onSubmit={handleRegisterUser}>
                    {/* Form fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700">NIK</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded"
                            value={registerNik}
                            onChange={(e) => setRegisterNik(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Kode Bagian</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded"
                            value={registerKodeBagian}
                            onChange={(e) => setRegisterKodeBagian(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                            onClick={() => setIsUserModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Karyawan;
