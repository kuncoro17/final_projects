import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNav = () => {
    return (
        <aside className="bg-gray-200 p-4 w-64 h-full">
            <nav>
                <ul className="space-y-4">
                    <li><Link to="/dashboard" className="block p-2 text-gray-700 hover:bg-gray-300 rounded">Dashboard</Link></li>
                    <li><Link to="/karyawan" className="block p-2 text-gray-700 hover:bg-gray-300 rounded">Karyawan</Link></li>
                    <li><Link to="/history_absen" className="block p-2 text-gray-700 hover:bg-gray-300 rounded">History Absen</Link></li>

                    <li><Link to="/analisis" className="block p-2 text-gray-700 hover:bg-gray-300 rounded">Chart</Link></li>
                   
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarNav;
