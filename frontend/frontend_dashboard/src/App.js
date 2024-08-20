import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Karyawan from './components/Karyawan';
import KaryawanDetail from './components/KaryawanDetail';
import LoginForm from './components/LoginForm';
import KaryawanDetailByNik from './components/KaryawanDetailByNik';
import HistoryAbsen from './components/HistoryAbsen';
import HistoryDetailPerNIK from './components/HistoryDetailPerNik';
import Analisis from './components/Analisis';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/karyawan" element={<Karyawan />} />
                <Route path="/karyawan-detail/:penempatan_payroll" element={<KaryawanDetail />} />
                <Route path="/karyawan-detail-by-nik/:nik" element={<KaryawanDetailByNik />} />
                <Route path="/history_absen" element={<HistoryAbsen />} />
                <Route path="/history_detail/:nik" element={<HistoryDetailPerNIK />} />
                <Route path="/analisis" element={<Analisis />} />
            </Routes>
        </Router>
    );
}

export default App;
