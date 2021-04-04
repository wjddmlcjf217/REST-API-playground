const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "http://localhost:" + process.env.PORT || "8888" + "/API/v1/";

// local database connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "webdev"
// });

// heroku database connection
const connection = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b74a0f9bae8bae",
  password: "08cba78d",
  database: "heroku_ad48b56664ad279"
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post("/API/v1/herb/", (req, res) => {
  connection.query('INSERT INTO herb value(69, "Northern Lights", 1)',
  (err, result) => {
    if (err) {
      throw err;
    };
    console.log(result);
  });
});

app.put("/API/v1/patients/1", (req, res) => {
  console.log(endPointRoot + "herbs/1")
  connection.query('UPDATE patient SET name = "Sarah Melody" where patientid = 1',
  (err, result) => {
    if (err) {
      throw err;
    };
    console.log(result);
  });
});

// delete all entries
app.delete("*", (req, res) => {
  connection.query("DELETE FROM herb", (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

// getOne
app.get("/API/v1/patients/1", (req, res) => {
  connection.query("SELECT * FROM patient where patientid = 1", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// getAll
app.get("/API/v1/herbs/", (req, res) => {
  connection.query("SELECT * FROM herb", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Listening to port", PORT);
});