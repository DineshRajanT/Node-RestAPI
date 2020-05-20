var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

// Mysql connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rajan",
  database: "nodeapp",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected...");
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/details/show", function (req, res) {
  console.log(req);
  connection.query("select * from details", function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
    console.log(JSON.stringify(results));
  });
});

//NOTE : Here we can also use url.parse to parse the request parameters.....
//rest api to get a single data
app.get("/details/:id", function (req, res) {
  connection.query(
    "select * from details where id=?",
    [req.params.id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to create a new record into mysql database
app.post("/details/insert", function (req, res) {
  var postData = req.body;
  connection.query("INSERT INTO details SET ?", postData, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//rest api to update record into mysql database
app.put("/details/update", function (req, res) {
  connection.query(
    "UPDATE `details` SET `QuoteNumber`=?,``=?,`CustomerName`=?,`SalesPerson`=?,``=?, where `QuoteID`=?",
    [
      req.body.quotenumber,
      req.body.customername,
      req.body.salesperson,
      req.body.quoteid,
    ],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

//rest api to delete record from mysql database
app.delete("/employees/delete", function (req, res) {
  console.log(req.body);
  connection.query(
    "DELETE FROM `details` WHERE `QuoteID`=?",
    [req.body.quoteid],
    function (error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});
