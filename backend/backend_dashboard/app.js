require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRouter');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001', // Ganti dengan URL front-end Anda
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tes koneksi
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Routes
app.use('/', authRoutes);
app.use('/', userRouter);

// Mulai server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
