const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ramim2002',
    database: 'webprogproject',
});

db.getConnection((error, connection) => {
    if (error) {
        console.error('Database connection failed:', error.message);
    } else {
        console.log('Connected successfully!');
        connection.release(); // Release the connection back to the pool
    }
});

 module.exports = db;
