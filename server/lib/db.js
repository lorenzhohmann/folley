const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'folley',
	database: process.env.DB_DATABASE || 'folley',
	password: process.env.DB_PASSWORD || 'b9asPBRdaGyMjAYP'
});

connection.connect();

module.exports = connection;
