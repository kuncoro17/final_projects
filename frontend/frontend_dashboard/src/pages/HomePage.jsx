// HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (!token || !username) {
                navigate('/login', { replace: true }); // Ensure replace is used to avoid adding to history stack
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/usersbyusername', {
                    params: { username }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login', { replace: true }); // Ensure replace is used to avoid adding to history stack
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login', { replace: true }); // Ensure replace is used to avoid adding to history stack
    };

    return (
        <div>
            <h1>Welcome, {user ? user.username : 'Guest'}</h1>
            <h1>NIK: {user ? user.nik : 'Not available'}</h1>
            <h1>Bagian: {user ? user.kode_bagian : 'Not available'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
