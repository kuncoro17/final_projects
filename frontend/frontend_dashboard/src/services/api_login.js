// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};
