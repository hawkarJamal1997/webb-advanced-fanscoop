const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'fanscoopDatabase',
    password: 'theRootPassword'
});

module.exports = connection