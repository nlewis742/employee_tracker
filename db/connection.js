const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'BLUE00oc^%sewil',
      database: 'buisness_db'
    },
    
  );

  module.exports = db;