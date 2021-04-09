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
  console.log(req.body)
  // $req.body['?herbName']
  connection.query(`INSERT INTO herb (herbName, herbPrice, herbQuantity) value('${req.body['?herbName']}', '${req.body['?herbPrice']}', '${req.body['?herbQuantity']}')`,
  (err, result) => {
    if (err) {
      console.log(err);
    };
    res.send(result);
  });
});

// post single user
app.post("/API/v1/user/1", urlencodedParser, (req, res) => {
  console.log(req.body)
  // $req.body['?herbName']
  connection.query(`INSERT INTO user (userName, userPassword) value('${req.body['?username']}', '${req.body['?password']}')`,
  (err, result) => {
    if (err) {
      console.log(err);
    };
    res.send(result);
  });
});

// post single orderdetail
app.post("/API/v1/orders/1", urlencodedParser, (req, res) => {
  console.log(req.body)
  connection.query(`INSERT INTO orders (userID, herbName, herbQuantity) value(1, '${req.body['?herbName']}', '${req.body['?herbQuantity']}')`,
  (err, result) => {
    if (err) {
      console.log(err);
    };
    res.send(result);
  });
});

// update individual herb status
app.put("/API/v1/herbs/", urlencodedParser, (req, res) => {
  console.log(req.body)
  connection.query(`UPDATE herb SET status = IF(status = 'Unavailable', 'Available', status), status = if(status = 'Available', 'Unavailable', status) WHERE herbID = '${req.body['?herbID']}'`,
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