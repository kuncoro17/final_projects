import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { kartuAbsen } = location.state || {};

    const [isUpdating, setIsUpdating] = useState(false);

    if (!kartuAbsen) {
        return <div>Data not found</div>;
    }

    // Helper function to format date and time
    const timeZone = 'Asia/Jakarta';
          
           

    const now = moment().tz(timeZone);
    const formattedJamMasuk = now.format('YYYY-MM-DD HH:mm:ss');
    const formattedTanggalMasuk = now.format('YYYY-MM-DD');

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:3002/api/absen-transaksi/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nik: kartuAbsen.nik,
                    tanggal_masuk: kartuAbsen.tanggal_masuk,
                    jam_pulang: formattedJamMasuk,
                    tanggal_pulang: formattedTanggalMasuk,
                    tanggal_insert_pulang: now.toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update record');
            }

            alert('Record updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating record:', error);
            alert('Error updating record');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <main className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url('../Assets/bg-main.svg')" }}>
            <section className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-center mb-10">
                    <p className="text-6xl font-extrabold text-blue-700 mb-10">Checkout</p>
                    <div className="container mx-auto bg-blue-700 p-10 rounded-lg shadow-2xl max-w-lg">
                        <div className="flex justify-center items-center mb-6">
                            <img src="/assets/Assets/logo-main.svg" className="w-2/3" alt="Logo" />
                        </div>
                        <div className="space-y-6 text-white">
                            <p className="text-2xl font-bold">Data Kartu Absen</p>
                            <p><strong>NIK:</strong> {kartuAbsen.nik}</p>
                            <p><strong>Nama Lengkap:</strong> {kartuAbsen.nama_lengkap}</p>
                            <p><strong>Kode Bagian:</strong> {kartuAbsen.kode_bagian}</p>
                            <p><strong>Tanggal Masuk:</strong> {kartuAbsen.tanggal_masuk}</p>
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-green-800 text-white text-2xl py-3 rounded-lg mt-6 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update & Go Home'}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;
