import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKaryawanByNik, createKartu, updateKartu, getCardDataByNomorKartu, updateKaryawan, user, updateuser } from '../services/ApiServices';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

const KaryawanDetailByNik = () => {
    const { nik } = useParams();
    const [karyawanDetail, setKaryawanDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [kodeKartu, setKodeKartu] = useState('');
    const [kodeKartuUpdate, setKodeKartuUpdate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cardData, setCardData] = useState(null);
    const [cardLoading, setCardLoading] = useState(false);
    const [updatedNamaLengkap, setUpdatedNamaLengkap] = useState('');
    const [updatedKodeBagian, setUpdatedKodeBagian] = useState('');
    const [userDetail, setUserDetail] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [updatedNik, setUpdatedNik] = useState('');

    useEffect(() => {
        fetchData();
    }, [nik]);

    const fetchData = async () => {
        try {
            console.log("Fetching data for NIK:", nik);
            const data = await getKaryawanByNik(nik);
            console.log("Fetched data:", data);

            if (data && data.length > 0) {
                setKaryawanDetail(data[0]);
                setKodeKartu(data[0].nomor_kartu || '');
                setKodeKartuUpdate(data[0].nomor_kartu || '');
                setUpdatedNamaLengkap(data[0].nama_lengkap);
                setUpdatedKodeBagian(data[0].penempatan_payroll);
                fetchCardData(data[0].nomor_kartu || '');

                fetchUserData(nik); // Fetch user data
            } else {
                setKaryawanDetail(null);
            }
        } catch (error) {
            console.error('Error fetching karyawan detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCardData = async (nomorKartu) => {
        if (!nomorKartu) {
            console.warn("Nomor Kartu is required for fetching card data.");
            return;
        }
        setCardLoading(true);
        try {
            const cardDataResponse = await getCardDataByNomorKartu(nomorKartu);
            console.log("Fetched card data response:", cardDataResponse);
            if (cardDataResponse) {
                setCardData(cardDataResponse);
            } else {
                console.warn("No data returned for the provided card number.");
            }
        } catch (error) {
            console.error('Error fetching card data:', error);
            setErrorMessage('Error fetching card data.');
        } finally {
            setCardLoading(false);
        }
    };
    

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            await createKartu(kodeKartu, karyawanDetail ? karyawanDetail.nik : '');
            setSuccessMessage('Kartu absen berhasil dibuat!');
            setKodeKartu('');
            fetchCardData(kodeKartu);
        } catch (error) {
            setErrorMessage('Error creating kartu absen.');
        }
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateKaryawan(nik, {
                nama_lengkap: updatedNamaLengkap,
                penempatan_payroll: updatedKodeBagian,
            });
            setSuccessMessage('Karyawan data berhasil di-update!');
            fetchData(); // Refresh karyawan data after update
        } catch (error) {
            setErrorMessage('Error updating karyawan data.');
        }
    };

    const handleUpdateCardSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateKartu(kodeKartuUpdate, karyawanDetail ? karyawanDetail.nik : '');
            setSuccessMessage('Kartu absen berhasil di-update!');
            setKodeKartuUpdate('');
            fetchCardData(kodeKartuUpdate);
        } catch (error) {
            setErrorMessage('Error updating kartu absen.');
        }
    };

    const handleUpdateUserSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateuser(nik, {
                username: updatedUsername,
                password: updatedPassword, // Ensure password is hashed before sending
                kode_bagian: updatedKodeBagian,
            });
            setSuccessMessage('User data berhasil di-update!');
            fetchUserData(nik); // Refresh user data after update
        } catch (error) {
            setErrorMessage('Error updating user data.');
        }
    };

    const fetchUserData = async (nik) => {
        setUserLoading(true);
        try {
            const userData = await user(nik);
            setUserDetail(userData);
            setUpdatedNik(userData.nik);
            setUpdatedKodeBagian(userData.kode_bagian);
            setUpdatedUsername(userData.username);
            setUpdatedPassword(userData.password); // Ensure to not expose actual password
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setUserLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-6 bg-gray-100 flex">
                    <div className="w-1/2 p-4">
                        <h1 className="text-3xl font-bold text-blue-800 mb-6">Karyawan Detail</h1>
                        {loading ? (
                            <p>Loading karyawan detail...</p>
                        ) : karyawanDetail ? (
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <form onSubmit={handleUpdateSubmit}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="nama_lengkap">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            id="nama_lengkap"
                                            value={updatedNamaLengkap}
                                            onChange={(e) => setUpdatedNamaLengkap(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="nik">NIK</label>
                                        <input
                                            type="text"
                                            id="nik"
                                            value={karyawanDetail.nik}
                                            readOnly
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="penempatan_payroll">Kode Bagian</label>
                                        <input
                                            type="text"
                                            id="penempatan_payroll"
                                            value={updatedKodeBagian}
                                            onChange={(e) => setUpdatedKodeBagian(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Karyawan</button>
                                </form>
                            </div>
                        ) : (
                            <p>No karyawan detail available.</p>
                        )}
                        {userLoading ? (
                            <p>Loading user data...</p>
                        ) : userDetail ? (
                            <div className="bg-white p-4 rounded-lg shadow-md mt-8">
                                <h2 className="text-xl font-bold text-blue-700 mb-4">User Data</h2>
                                {successMessage && <p className="text-green-600">{successMessage}</p>}
                                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                                <form onSubmit={handleUpdateUserSubmit}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="nik">NIK</label>
                                        <input
                                            type="text"
                                            id="nik"
                                            value={updatedNik}
                                            onChange={(e) => setUpdatedNik(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={updatedUsername}
                                            onChange={(e) => setUpdatedUsername(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 font-bold mb-1" htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={updatedPassword}
                                            onChange={(e) => setUpdatedPassword(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update User</button>
                                </form>
                            </div>
                        ) : (
                            <p>No user data available.</p>
                        )}
                    </div>
                    <div className="w-1/2 p-4">
                        <h1 className="text-3xl font-bold text-blue-800 mb-6">Card Management</h1>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="mb-2">
                                <label className="block text-gray-700 font-bold mb-1" htmlFor="kode_kartu">Kode Kartu</label>
                                <input
                                    type="text"
                                    id="kode_kartu"
                                    value={kodeKartu}
                                    onChange={(e) => setKodeKartu(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Card</button>
                        </form>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-blue-700 mb-4">Update Card</h2>
                            {cardLoading ? (
                                <p>Loading card data...</p>
                            ) : cardData ? (
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <form onSubmit={handleUpdateCardSubmit}>
                                        <div className="mb-2">
                                            <label className="block text-gray-700 font-bold mb-1" htmlFor="kode_kartu_update">Kode Kartu</label>
                                            <input
                                                type="text"
                                                id="kode_kartu_update"
                                                value={kodeKartuUpdate}
                                                onChange={(e) => setKodeKartuUpdate(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Card</button>
                                    </form>
                                    <p className="mt-4">Card Data: {JSON.stringify(cardData)}</p>
                                </div>
                            ) : (
                                <p>No card data available.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default KaryawanDetailByNik;
