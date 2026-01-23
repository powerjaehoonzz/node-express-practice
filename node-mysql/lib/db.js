var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test1234",
  database: "opentutorials",
});
db.connect();

module.exports = db;
