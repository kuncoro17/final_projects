// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white p-4 mt-6">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} Kuncoro Chandra Kinasih. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
