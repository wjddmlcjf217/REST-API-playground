const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "http://localhost:" + process.env.PORT || "8888" + "/API/v1/";

// local database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webdev"
});

// heroku database connection
// const connection = mysql.createPool({
//   host: "us-cdbr-east-03.cleardb.com",
//   user: "b74a0f9bae8bae",
//   password: "08cba78d",
//   database: "heroku_ad48b56664ad279"
// });
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


// post single herb, urlencodedParser passes data from form submission to req object
app.post("/API/v1/herbs/1", urlencodedParser, (req, res) => {
  console.log(typeof req.body['?herbName'])
  // $req.body['?herbName']
  connection.query(`INSERT INTO herb (herbName, status) value('${req.body['?herbName']}', 1)`,
  (err, result) => {
    if (err) {
      console.log(err);
    };
    res.send(result);
  });
});

// update individual herb entry for herbID == 1 to make it unavailable
app.put("/API/v1/herbs/1", (req, res) => {
  connection.query('UPDATE herb SET status = 0 where herbID = 1',
  (err, result) => {
    if (err) {
      console.log(err);
    };
    res.send(result);
  });
});

// delete all entries
app.delete("/API/v1/herbs", (req, res) => {
  connection.query("DELETE FROM herb", (err, result) => {
    if (err) console.log(err);
    res.send(result)
  });
});

// delete single entry
app.delete("/API/v1/herbs/1", urlencodedParser, (req, res) => {
  console.log(req.body, req.body['?herbName'])
  connection.query(`DELETE FROM herb where herbName = '${req.body['?herbName']}'`, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  });
});


// getAll
app.get("/API/v1/herbs/", (req, res) => {
  connection.query("SELECT * FROM herb", (err, result) => {
    // console.log(result, result.length)
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Listening to port", PORT);
});