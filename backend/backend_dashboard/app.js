require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRouter');
const absenRoutes = require('./routes/absenRoutes');


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test connection
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Routes
app.use('/', authRoutes);
app.use('/', userRouter);
app.use('/', absenRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
