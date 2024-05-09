// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

// Simple query
connection.query("SELECT * FROM `users`", function (err, results, fields) {
  var { id, name, email, created_at } = results[0];
  console.log(id);
  console.log(name);
  console.log(email);
  console.log(created_at);
});
