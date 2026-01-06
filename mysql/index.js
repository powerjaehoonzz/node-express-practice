var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "test",
});

connection.connect();

connection.query("SELECT * FROM USER", function (error, results, fields) {
  if (error) throw error;
  console.log("user", results);
});

connection.end();
