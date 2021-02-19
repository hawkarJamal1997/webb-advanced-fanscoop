const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'fanscoopDb',
    password: 'milan123'
});

module.exports = connection