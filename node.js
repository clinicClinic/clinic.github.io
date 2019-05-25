var express = require('express');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3000;

con.connect();
var con = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b692e07e1f51a6",
    password: "c296d0a8",
    database: "heroku_faf329674943f73"
  });

app.post('/',function(req, res){
    var sql = 'SELECT * FROM users_2er31 WHERE email = ? ';
    con.query(sql,['mail'], function(error, results){
      if(error) throw error;
      //Load hash from your password DB.
      console.log(results);
      res.send(results);
    });
    
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))