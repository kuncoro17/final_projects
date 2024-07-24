import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [nomorKartu, setNomorKartu] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3002/api/kartu-absen/by-nomor-kartu?nomor_kartu=${nomorKartu}`);

            if (!response.ok) {
                throw new Error('Data not found');
            }

            const data = await response.json();

            if (data) {
                // Navigate to the data-page with the fetched data
                navigate('/data-page', { state: { kartuAbsen: data } });
            } else {
                alert('Data not found');
            }
        } catch (err) {
            setError(err.message);
            alert(err.message);
        }
    };

    return (
        <main className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url('../Assets/bg-main.svg')" }}>
        <section className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center mb-10">
                <p className="text-6xl font-extrabold text-blue-700 mb-10">Attendance</p>
                <div className="container mx-auto bg-blue-700 p-10 rounded-lg shadow-2xl max-w-lg">
                    <div className="flex justify-center items-center mb-6">
                        <img src="/assets/Assets/logo-main.svg" className="w-2/3" alt="Logo" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-white text-3xl font-bold mb-4">Tap Card Here</p>
                        <input
                            type="text"
                            value={nomorKartu}
                            onChange={(e) => setNomorKartu(e.target.value)}
                            placeholder="ID Card"
                            className="form-input w-full text-xl py-2 px-4 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                        <button type="submit" className="w-full bg-blue-800 text-white text-2xl py-3 rounded-lg mt-6 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600">
                            Submit
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-6">{error}</p>}
                </div>
            </div>
           
        </section>
    </main>
    );
};

export default Home;
