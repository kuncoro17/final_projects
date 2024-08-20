import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    PointElement
} from 'chart.js';
import { getgrafik } from '../services/ApiServices';

import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, PointElement);

const Analisis = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getgrafik();
            console.log('Fetched data:', data); // Log the fetched data
            setAttendanceData(data);
            setError('');
        } catch (error) {
            console.error('Error fetching attendance data:', error);
            setError('Failed to fetch attendance data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const prepareChartData = () => {
        if (!attendanceData || attendanceData.length === 0) {
            console.warn('No attendance data available for chart');
            return {
                labels: [],
                datasets: [],
            };
        }

        const labels = attendanceData.map((item) => `Bulan ${item.bulan}`); // Use bulan as labels
        const dataPoints = attendanceData.map((item) => parseInt(item.total_nik, 10)); // Use total_nik as data points

        return {
            labels,
            datasets: [
                {
                    label: 'Total NIK per Bulan',
                    data: dataPoints,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    pointRadius: 5, // Customize point radius if needed
                }
            ]
        };
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <main className="flex-1 p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div>
                            <Line data={prepareChartData()} />
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Analisis;
