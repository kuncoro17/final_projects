import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login', { replace: true }); // Redirect to login on logout
    };

    return (
        <nav className="w-64 bg-gray-800 text-white p-4">
            <ul>
                <li>
                    <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
                </li>
                <li>
                    <Link to="/some-other-page" className="block py-2 px-4 hover:bg-gray-700">Other Page</Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-4 bg-red-500 hover:bg-red-600 rounded"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
