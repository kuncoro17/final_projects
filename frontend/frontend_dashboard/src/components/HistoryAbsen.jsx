import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getabsenbytanggal } from '../services/ApiServices';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import Footer from './Footer';
import SidebarNav from './SidebarNav';
import * as XLSX from 'xlsx';

const HistoryAbsen = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getabsenbytanggal(
                startDate.toISOString().slice(0, 10),
                endDate.toISOString().slice(0, 10)
            );
            setAttendanceData(data);
            setError('');
        } catch (error) {
            console.error('Error fetching attendance history:', error);
            setError('Failed to fetch attendance history');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(attendanceData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'AttendanceData');
        XLSX.writeFile(wb, `attendance_data_${startDate.toISOString().slice(0, 10)}_to_${endDate.toISOString().slice(0, 10)}.xlsx`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <SidebarNav />
                <div className="flex-1 p-6">
                    <div className="flex gap-4 mb-6">
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} className="p-2 border rounded" />
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} className="p-2 border rounded" />
                        <button onClick={fetchData} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Fetch Data
                        </button>
                        <button onClick={exportToExcel} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Export to Excel
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bagian</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Masuk</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {attendanceData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nik}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_lengkap}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kode_bagian}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal_masuk}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jam_masuk}-{item.jam_pulang}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/history_detail/${item.nik}`} className="text-indigo-600 hover:text-indigo-900">
                                                History
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryAbsen;
