const mysql = require('mysql2');

// Setup Database connection Configuration
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
     password: 'Account39myPMW%',
    database: 'buisness_db'
  },
  
  );
  
  // Connect to database
  db.connect(function(error) {
    if(error) {
      console.log("Error Connecting to DB: ", error);
    }

  });

  module.exports = db;