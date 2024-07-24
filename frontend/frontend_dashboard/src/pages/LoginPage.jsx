import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Tambahkan file CSS untuk animasi jika diperlukan

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });

            if (response.data && response.data.token) {
                const { token } = response.data;

                // Store token and username in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);

                // Redirect to home page
                navigate('/Dashboard');
            } else {
                console.error('Token not received');
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600">Login to BPK Penabur Jakarta</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Username"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
