var express = require('express');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var PORT = process.env.PORT || 3000;

// var con = mysql.createConnection({
//   host: "eu-cdbr-west-02.cleardb.net",
//   user: "b692e07e1f51a6",
//   password: "c296d0a8",
//   database: "heroku_faf329674943f73"
// });

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b692e07e1f51a6",
    password: "c296d0a8",
    database: "heroku_faf329674943f73"
});
// con.connect();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.post('/login',function(req, res){
  //get the user  hash 
  checkUserCred(req.body.email,req.body.password,function(valid,cuser){
    if(valid){
      //create token
      jwt.sign({ user: req.body }, "privateKey", {expiresIn:"1h"}, function(err, token) {
        res.send(token +' '+ cuser);
      });
    }
    else{
      res.send('invalid user or password');
    }
  });
});
app.post('/mobile/login',function(req, res){
  //get the user  hash 
  checkUserCred(req.body.email,req.body.password,function(valid,cuser){
    if(valid){
      //create token
      jwt.sign({ user: req.body }, "privateKey", {expiresIn:"1h"}, function(err, token) {
        res.send('{"token":"'+token +'","user":'+ cuser+'}');
      });
    }
    else{
      res.send('invalid user or password');
    }
  });
});
app.post('/reg',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err0,authData){
    if(err0){
        res.sendStatus(403);
    }
    else{
      hashPass(req.body.nuser.password,function(err,hash){
        if(err) throw err;
        var user = req.body.nuser;
        user['clinic_id'] = req.body.user.clinic_id;
        user['added_by'] = req.body.user.id;
        user.password = hash;
        insertUser(user,function(results){
          res.send(results);
        });
      });
    }
  });
});
app.post('/clinic/addDoctor',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      var user = req.body.user;
      var doctor = req.body.doctor;
      hashPass(user.password,function(err1,hash){
        if (err1) throw err1;
        doctor.password = hash;
        insertDoctor(user,doctor,function(results){
          res.send(results);
        });
      });
    }
  });
});
app.post('/clinic',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      getClinicInfo(authData.user.email,function(result){
        res.send(result);
      });
    }
  });
});
app.post('/clinic/users',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      getClinicUsers(authData.user.email,function(result){
        res.send(result);
      }); 
    }
  });
});
app.post('/clinic/getDoctors',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      getClinicDoctors(authData.user.email,function(result){
        res.send(result);
      }); 
    }
  });
});
app.post('/clinic/getPatients',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      getClinicPatient(authData.user.email,function(result){
        res.send(result);
      }); 
    }
  });
});
app.post('/clinic/getAppointments',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      getAppointments(req.body.user,function(result){
        res.send(result);
      }); 
    }
  });
});
app.post('/clinic/addAppointment',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      insertAppointment(req.body.user,req.body.appointment,function(result){
      res.send(result);
      }); 
    }
  });
});
app.post('/clinic/editAppointment',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      editAppointment(req.body.user,req.body.appointment,function(result){
      res.send(result);
      }); 
    }
  });
});
app.post('/clinic/addPatient',verifyToken,function(req, res){
  jwt.verify(req.token,'privateKey',function(err,authData){
    if(err){
      res.sendStatus(403);
    }
    else{
      insertPatient(authData.user.email,req.body.patient,function(result){
      res.send(result);
      }); 
    }
  });
});
app.post('/clinic/deleteUser',verifyToken,function(req, res){
    jwt.verify(req.token,'privateKey',function(err,authData){
      if(err){
        res.sendStatus(403);
      }
      else{
        deleteUser(req.body.id,function(result){
            res.send(result);
        }); 
      }
    });
});
app.listen(PORT,function(){
  console.log('server listning on port'+ PORT);
});
function hashPass(pass,callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pass, salt, function(err, hash) {
        // Store hash in your password DB.
        callback(err,hash);
      });
  });
}
function insertUser(user,callback){
  var sql = 'INSERT INTO users_2er31 (fname,lname,password,email,role,clinic_id,phone,added_by) values(?,?,?,?,?,?,?,?) ';
  pool.query(sql,[user.fname,user.lname,user.password,user.email,user.role,user.clinic_id,user.phone,user.added_by], function(error, results){    
    if (error) {
      if(error.code == "ER_DUP_ENTRY" || error.errno == 1062)
        callback('a user already exsit with '+user.email+' email');    
      else
        throw error;
    }
    else
      callback("Added Successfully");
    
    
  });
}
function checkUserCred(email,pass,callback){
  var sql = 'SELECT * FROM users_2er31 WHERE email = ? ';
  pool.query(sql,[email], function(error, results){
    if(error) throw error;
    //Load hash from your password DB.
    var hash = results[0].password;
    bcrypt.compare(pass, hash, function(err, res) {
      // res == true
      if(res == true){
        results[0].password = '';
        callback(true,JSON.stringify(results[0]));
      }
      else
        callback(false,'');
    });
  });
}
function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerTtoken = bearer[1];
    req.token = bearerTtoken;
    next();
  }else{
    res.sendStatus(403);
  }
}
function getClinicInfo(email,callback){
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql,[email], function(error, resId){
    if(error) throw error;
    sql1 = 'SELECT * FROM clinics WHERE id = ? ';
    pool.query(sql1,[resId[0].clinic_id], function(error, results){
      if(error) throw error;
      callback(results[0]);
    });
  });
}
function getClinicUsers(email,callback){
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql,[email], function(error, resId){
    if(error) throw error;
    sql1 = 'SELECT id,fname,lname,email,role FROM users_2er31 WHERE clinic_id = ? ';
    pool.query(sql1,[resId[0].clinic_id], function(error, results){
      if(error) throw error;
      callback(results);
    });
  });
}
function getClinicDoctors(email,callback){
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql,[email], function(error, resId){
    if(error) throw error;
    sql1 = 'SELECT doctors_12fdrv.id,user_id,fname,lname,specialty,gender,address FROM doctors_12fdrv inner join users_2er31 on doctors_12fdrv.user_id = users_2er31.id where clinic_id=? and role=4';
    pool.query(sql1,[resId[0].clinic_id], function(error, results){
      if(error) throw error;
      callback(results);
    });
  });
}
function getClinicPatient(email,callback){
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql,[email], function(error, resId){
    if(error) throw error;
    sql1 = 'SELECT * FROM patients_j45bsc where clinic_id = ?';
    pool.query(sql1,[resId[0].clinic_id], function(error, results){
      if(error) throw error;
      callback(results);
    });
  });
}
function getAppointments(user,callback){
  var sql = 'SELECT * FROM appointments_3sd3df WHERE clinic_id = ?';
  pool.query(sql,[user.clinic_id], function(error, results){
    if (error) throw error;
    callback(results);
  });
}
function insertDoctor(user,doctor,callback){
  var sql = 'INSERT INTO users_2er31 (fname,lname,password,email,role,clinic_id,phone,added_by) values(?,?,?,?,?,?,?,?) ';
  pool.query(sql,[doctor.fname,doctor.lname,doctor.password,doctor.email,4,user.clinic_id,doctor.phone,user.id], function(error, results){    
    if (error) {
      if(error.code == "ER_DUP_ENTRY" || error.errno == 1062)
        callback('a user already exsit with '+user.email+' email');    
      else
        throw error;
    }
    else{
      sql1 = 'INSERT INTO doctors_12fdrv (user_id, specialty, address, nationality, birth_date,gender, added_by) values(?,?,?,?,?,?,?) ';
      pool.query(sql1,[results.insertId,doctor.specialty,doctor.address,doctor.nationality,doctor.birth_date,doctor.gender,user.id], function(error, results){   
        if(error) throw error;
        callback('Added Successfully');
       });    
    }
  });
}
function insertAppointment(user,appointment,callback){
  var date = appointment.year + "-" + appointment.month + "-" + appointment.day + " " + appointment.hour + ":" + appointment.minutes + ":0";
  var sql = 'INSERT INTO appointments_3sd3df (doctor_id, clinic_id, patient_id, specialty, comment, date, isBy, added_by) VALUES (?,?,?,?,?,?,?,?)';  
  pool.query(sql,[appointment.doctor,user.clinic_id,appointment.patient,appointment.specialty,appointment.comment,date,0,user.id], function(error, results){ 
    if (error) throw error;
    callback("Added Successfully");
  });
}
function editAppointment(user,appointment,callback){
  var date = appointment.year + "-" + appointment.month + "-" + appointment.day + " " + appointment.hour + ":" + appointment.minutes + ":0";
  var sql = 'UPDATE appointments_3sd3df Set doctor_id=? , patient_id=? , specialty=? , date=? , added_by=? WHERE id=?';  
    pool.query(sql,[appointment.doctor,appointment.patient,appointment.specialty,date,user.id,appointment.id], function(error, results){ 
    if (error) throw error;
    callback("Edited Successfully");
  });
}
function insertPatient(email,patient,callback){
  sql = ' SELECT id,clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql,[email], function(error, results){ 
    if (error) throw error;
    sql0 = ' INSERT INTO patients_j45bsc(fname, lname, email, clinic_id, birth_date, nationality, phone,added_by) VALUES (?,?,?,?,?,?,?,?)';
    pool.query(sql0,[patient.fname,patient.lname,patient.email,results[0].clinic_id,patient.birth_date,patient.nationality,patient.phone,results[0].id], function(error, ress){ 
      if (error) {
        if(error.code == "ER_DUP_ENTRY" || error.errno == 1062)
          callback('a paitent already exsit with '+email+' email');    
        else
          throw error;
      }
      else 
        callback("Added Successfully"); 
    });
  });
  
}
function deleteUser(id,callback){
    sql = ' delete FROM users_2er31 WHERE id = ?';
    pool.query(sql,id, function(error, results){ 
        if (error) throw error;
        callback("Deleted Successfully");     
    });
}