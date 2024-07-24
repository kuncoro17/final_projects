const { Pool } = require('pg');
console.log('Database user:',process.env.DB_USER);
console.log('Database password:',process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,

    port: process.env.DB_PORT,
});
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'KARYAWAN',
//     password: 'asd',
//     port: 5432,
// });

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to database successfully!');
        client.release();
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

testConnection();

module.exports = pool;
