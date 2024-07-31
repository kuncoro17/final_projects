require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const kartuAbsenRoutes = require('./routes/kartuAbsenRoutes');
const absenTransaksiRoutes = require('./routes/absenTransaksiRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.use('/api/kartu-absen', kartuAbsenRoutes);
app.use('/api/absen-transaksi', absenTransaksiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const corsOptions = {
    origin: 'http://localhost:3001', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
