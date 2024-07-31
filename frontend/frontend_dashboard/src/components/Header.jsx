// src/components/Header.js
import React from 'react';
import logo from '../assets/logo.png'; // Sesuaikan path jika diperlukan

const Header = () => {
    return (
        <header className="bg-blue-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src={logo} alt="BPK Penabur Jakarta" className="h-12" />
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Profile</a></li>
                        <li><a href="#" className="hover:underline">Settings</a></li>
                        <li><a href="#" className="hover:underline">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
