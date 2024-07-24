const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

pool.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = pool;
