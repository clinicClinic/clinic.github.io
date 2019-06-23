var express = require('express');
var app = express();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;
var connections = {};
var userCount = 0;

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b692e07e1f51a6",
  password: "c296d0a8",
  database: "heroku_faf329674943f73"
});

app.use(express.static(__dirname));
app.use(bodyParser.json());


io.sockets.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    var tempToken = socket.handshake.query.token.split("  ");
    jwt.verify(tempToken[0], 'privateKey', function (err, decoded) {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', function (socket) {
  var tempToken = socket.handshake.query.token.split("  ");
  var user = tempToken[1];
  user = JSON.parse(user);
  connections[user.id]= {user:user,socket:socket};
  userCount++;
  //connecting
  console.log('user connected :%s', userCount);
  //disconnecting
  socket.on('disconnect', function () {
    userCount--;
    console.log('user disconnected :%s', userCount);
  });
});

http.listen(PORT, function () {
  console.log('listening on *:3000');
});

// app.post('/test', function (req, res) {
//   io.emit("appointment added", "");
// });
// app.use('/mobile/login', require("./api/mobile.js"));
///--------------------------------------------------------------------------mobile api-----------------------------------------------------------------
app.post('/mobile/login', function (req, res) {
  //get the user  hash 
  checkPatientCred(req.body.email, req.body.password, function (valid, cuser) {
    if (valid) {
      //create token
      jwt.sign({ user: req.body }, "privateKey", { expiresIn: "1h" }, function (err, token) {
        console.log(req.body);
        res.send('{"token":"' + token + '","user":' + cuser + '}');
      });
    }
    else if(!valid && cuser=='{"error":"user is created by a clinic"}') {
      res.send('{"error":"user is created by a clinic"}');
    }
    else{
      res.send('{"invalid":"invalid user or email"}');
    }
  });
});
app.post('/mobile/getCityClinics',verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      console.log("this ball shit "+req.body);
      // getCityClinics(req.body.city, function (result) {
      //   res.send('{"result":'+result+'}');
      // });
    }
  });
});
function getCityClinics(city,callback){
  var sql = 'SELECT * FROM clinics WHERE city = ?';
  pool.query(sql, [city], function (error, results) {
    if (error) throw error;
    callback(results);
  });
}
///--------------------------------------------------------------------------clinic api---------------------------------------------------------------
app.post('/login', function (req, res) {
  //get the user  hash 
  checkUserCred(req.body.email, req.body.password, function (valid, cuser) {
    if (valid) {
      //create token
      // jwt.sign({ user: req.body }, "privateKey", { expiresIn: "1h" }, function (err, token) {
        jwt.sign({ user: req.body }, "privateKey", function (err, token) {
        res.send(token + '  ' + cuser);
      });
    }
    else {
      res.send('invalid user or password');
    }
  });
});
app.post('/reg', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err0, authData) {
    if (err0) {
      res.sendStatus(403);
    }
    else {
      hashPass(req.body.nuser.password, function (err, hash) {
        if (err) throw err;
        var user = req.body.nuser;
        user['clinic_id'] = req.body.user.clinic_id;
        user['added_by'] = req.body.user.id;
        user.password = hash;
        console.log(user);

        insertUser(user, function (results) {
          res.send(results);
        });
      });
    }
  });
});
app.post('/clinic/addDoctor', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      var user = req.body.user;
      var doctor = req.body.doctor;
      hashPass(doctor.password, function (err1, hash) {
        if (err1) throw err1;
        doctor.password = hash;
        console.log(doctor);
        insertDoctor(user, doctor, function (results) {
          res.send(results);
        });
      });
    }
  });
});
app.post('/clinic/updateDoctor', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      var doctor = req.body.doctor;

      updateDoctor(doctor, function (results) {
        res.send(results);
      });
    }
  });
});
app.post('/clinic', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getClinicInfo(authData.user.email, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/users', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getClinicUsers(authData.user.email, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/getDoctors', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getClinicDoctors(authData.user.email, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/getPatients', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getClinicPatient(authData.user.email, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/getAppointments', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getAppointments(req.body.user, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/getDocAppointments', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getDocAppointments(req.body.user.id, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/addAppointment', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      // console.log(req.body.appointment);
     
      insertAppointment(req.body.user, req.body.appointment, function (result) {
        res.send(result);
        emitAppointmentAdded(req.body.user.clinic_id);
        emitToDoc(req.body.appointment.doctor);
      });
    }
  });
});
app.post('/clinic/editAppointment', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      console.log(req.body.appointment);
      editAppointment(req.body.user, req.body.appointment, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/changeAppointmentStat', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      changeAppointmentStat(req.body.id, req.body.stat, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/addPatient', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      insertPatient2(req.body.user, req.body.patient, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/integratePatient', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      integratePatient(req.body.user, req.body.patient, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/deleteUser', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      deleteUser(req.body.id, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/removeLog', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      removeLog(req.body.lid, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/updateAppointmentDrugs', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {

      updateAppointmentDrugs(req.body, function (result) {
        res.send(result);
      });
    }
  });
});
app.post('/clinic/getDocLogs', verifyToken, function (req, res) {
  jwt.verify(req.token, 'privateKey', function (err, authData) {
    if (err) {
      res.sendStatus(403);
    }
    else {
      getDocLogs(req.body.user, function (result) {
        res.send(result);
      });
    }
  });
});
function hashPass(pass, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash) {
      // Store hash in your password DB.
      callback(err, hash);
    });
  });
}
function insertUser(user, callback) {
  var sql = 'INSERT INTO users_2er31 (fname,lname,password,email,role,clinic_id,phone,added_by) values(?,?,?,?,?,?,?,?) ';
  pool.query(sql, [user.fname, user.lname, user.password, user.email, user.role, user.clinic_id, user.phone, user.added_by], function (error, results) {
    if (error) {
      if (error.code == "ER_DUP_ENTRY" || error.errno == 1062)
        callback('a user already exsit with ' + user.email + ' email');
      else
        throw error;
    }
    else
      callback("Added Successfully");


  });
}
function checkUserCred(email, pass, callback) {
  var sql = 'SELECT * FROM users_2er31 WHERE email = ? ';
  pool.query(sql, [email], function (error, results) {
    if (error) throw error;
    if (!results[0]) {
      callback(false, '');
      return;
    }
    //Load hash from your password DB.
    var hash = results[0].password;
    bcrypt.compare(pass, hash, function (err, res) {
      // res == true
      if (res == true) {
        results[0].password = '';
        callback(true, JSON.stringify(results[0]));
      }
      else {
        callback(false, '');
      }
    });
  });
}
function checkPatientCred(email, pass, callback) {

  var sql = 'SELECT * FROM patients_j45bsc WHERE email = ? ';
  pool.query(sql, [email], function (error, results) {
    if (error) throw error;
    if (!results[0]) {
      callback(false, '');
      return;
    }
    //Load hash from your password DB.
    var hash = results[0].password;
    if(hash==""||hash==null){
      callback(false,'{"error":"user is created by a clinic"}');
    }else{
      bcrypt.compare(pass, hash, function (err, res) {
        // res == true
        if (res == true) {
          results[0].password = '';
          callback(true, JSON.stringify(results[0]));
        }
        else {
          callback(false, '');
        }
      });
    }
  });
}
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerTtoken = bearer[1];
    req.token = bearerTtoken;
    next();
  } else {
    res.sendStatus(403);
  }
}
function getClinicInfo(email, callback) {
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql, [email], function (error, resId) {
    if (error) throw error;
    sql1 = 'SELECT * FROM clinics WHERE id = ? ';
    pool.query(sql1, [resId[0].clinic_id], function (error, results) {
      if (error) throw error;
      callback(results[0]);
    });
  });
}
function getClinicUsers(email, callback) {
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql, [email], function (error, resId) {
    if (error) throw error;
    sql1 = 'SELECT id,fname,lname,email,role FROM users_2er31 WHERE clinic_id = ? ';
    pool.query(sql1, [resId[0].clinic_id], function (error, results) {
      if (error) throw error;
      callback(results);
    });
  });
}
function getClinicDoctors(email, callback) {
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql, [email], function (error, resId) {
    if (error) throw error;
    sql1 = 'SELECT doctors_12fdrv.id,user_id,fname,lname,nationality,specialty,gender,address,sec,birth_date,phone FROM doctors_12fdrv inner join users_2er31 on doctors_12fdrv.user_id = users_2er31.id where clinic_id=? and role=4';
    pool.query(sql1, [resId[0].clinic_id], function (error, results) {
      if (error) throw error;
      callback(results);
    });
  });
}
function getClinicPatient(email, callback) {
  var sql = 'SELECT clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql, [email], function (error, resId) {
    if (error) throw error;
    sql1 = 'SELECT a.id, a.fname, a.lname, a.email, a.added_by_clinic, a.birth_date, a.nationality, a.phone, a.added_by, a.date_added FROM patients_j45bsc AS a LEFT JOIN patient_clinics AS b ON a.id = b.patient_id WHERE b.clinic_id = ?';
    pool.query(sql1, [resId[0].clinic_id], function (error, results) {
      if (error) throw error;
      callback(results);
    });
  });
}
function getAppointments(user, callback) {
  var sql = 'SELECT * FROM appointments_3sd3df WHERE clinic_id = ?';
  pool.query(sql, [user.clinic_id], function (error, results) {
    if (error) throw error;
    callback(results);
  });
}
function getDocAppointments(id, callback) {
  var sql = 'SELECT * FROM doctors_12fdrv WHERE user_id= ?';
  pool.query(sql, [id], function (error, results) {
    if (error) throw error;
    var sql2 = 'SELECT * FROM appointments_3sd3df WHERE doctor_id= ?';
    pool.query(sql2, [results[0].id], function (error2, results2) {
      if (error2) throw error2;
      callback(results2);
    });
  });
}
function insertDoctor(user, doctor, callback) {
  var sql = 'INSERT INTO users_2er31 (fname,lname,password,email,role,clinic_id,phone,added_by) values(?,?,?,?,?,?,?,?) ';
  pool.query(sql, [doctor.fname, doctor.lname, doctor.password, doctor.email, 4, user.clinic_id, doctor.phone, user.id], function (error, results) {
    if (error) {
      if (error.code == "ER_DUP_ENTRY" || error.errno == 1062)
        callback('a user already exsit with ' + user.email + ' email');
      else
        throw error;
    }
    else {
      sql1 = 'INSERT INTO doctors_12fdrv (user_id, specialty, address, nationality, birth_date,gender, added_by) values(?,?,?,?,?,?,?) ';
      pool.query(sql1, [results.insertId, doctor.specialty, doctor.address, doctor.nationality, doctor.birth_date, doctor.gender, user.id], function (error, results) {
        if (error) throw error;
        callback('Added Successfully');
      });
    }
  });
}
function insertAppointment(user, appointment, callback) {
  var date = appointment.year + "-" + appointment.month + "-" + appointment.day + " " + appointment.hour + ":" + appointment.minutes + ":0";
  var sql = 'INSERT INTO appointments_3sd3df (doctor_id, clinic_id, patient_id, specialty, comment, date, isBy, added_by) VALUES (?,?,?,?,?,?,?,?)';
  pool.query(sql, [appointment.doctor, user.clinic_id, appointment.patient, appointment.specialty, appointment.comment, date, 0, user.id], function (error, results) {
    if (error) throw error;
    callback("Added Successfully");
    emitAppointmentAdded(user.clinic_id);
  });
}
function editAppointment(user, appointment, callback) {
  var date = appointment.year + "-" + appointment.month + "-" + appointment.day + " " + appointment.hour + ":" + appointment.minutes + ":0";
  var sql = 'UPDATE appointments_3sd3df Set doctor_id=? , patient_id=? , specialty=? , date=? , added_by=? , drugs=? WHERE id=?';
  pool.query(sql, [appointment.doctor, appointment.patient, appointment.specialty, date, user.id, appointment.drugs, appointment.id], function (error, results) {
    if (error) throw error;
    callback("Edited Successfully");
  });
}
function changeAppointmentStat(id, stat, callback) {
  var sql = 'UPDATE appointments_3sd3df Set stat=? WHERE id=?';
  pool.query(sql, [stat, id], function (error, results) {
    if (error) throw error;
    emitStat(id,stat);
    callback("Edited Successfully");
  });
}
function insertPatient(patient, callback) {
  sql = ' SELECT id,clinic_id FROM users_2er31 WHERE email = ?';
  pool.query(sql, [email], function (error, results) {
    if (error) throw error;
    sql0 = ' INSERT INTO patients_j45bsc(fname, lname, email, clinic_id, birth_date, nationality, phone,added_by) VALUES (?,?,?,?,?,?,?,?)';
    pool.query(sql0, [patient.fname, patient.lname, patient.email, results[0].clinic_id, patient.birth_date, patient.nationality, patient.phone, results[0].id], function (error, ress) {
      if (error) {
        if (error.code == "ER_DUP_ENTRY" || error.errno == 1062)
          callback('a paitent already exsit with ' + email + ' email');
        else
          throw error;
      }
      else
        callback("Added Successfully");
    });
  });

}
function insertPatient2(user, patient, callback) {
  //check if patient already exsit
  //if yes return confirm adding to clinic with pid
  //if no insert pat to patient table get inserted id

  sql = ' INSERT INTO patients_j45bsc(fname, lname, email, added_by_clinic, birth_date, nationality, gender, phone,added_by) VALUES (?,?,?,?,?,?,?,?)';
  pool.query(sql, [patient.fname, patient.lname, patient.email, user.clinic_id, patient.birth_date, patient.gender, patient.nationality, patient.phone, user.id], function (error, res) {
    if (error) {
      if (error.code == "ER_DUP_ENTRY" || error.errno == 1062) {
        // duplicate patient found
        integratePatient(user, patient, function () {
          callback("The patient already exsit, and added to your clinic");
        });
      }
      else
        throw error;
    }
    else {
      sql1 = ' INSERT INTO patient_clinics (patient_id, clinic_id) VALUES (?,?)';
      pool.query(sql1, [res.insertId, user.clinic_id], function (error1, ress) {
        if (error1) {
          throw error1;
        }
        else {
          callback("Added Successfully");
        }
      });
    }
  });
}
function checkPat(clinic_id, patient_id) {
  sql1 = ' SELECT * FROM patient_clinics WHERE clinic_id=? AND patient_id=?';
  pool.query(sql1, [clinic_id, patient_id], function (error1, ress) {
    if (error1) {
      throw error1;
    }
    else {
      //check if theres a result
      return ("already exsit");
      //else
      return ("already exsit somewhere");

    }
  });
}
function integratePatient(user, patient, callback) {

  sql0 = ' SELECT id FROM patients_j45bsc WHERE email=? OR phone=?';
  pool.query(sql0, [patient.email, patient.phone], function (error0, res) {
    if (error0) {
      throw error0;
    }
    else {
      //if no match found 
      if (res.length == 0) {
        callback("no match found");
        return;
      }
      //else add the patient
      sql = ' INSERT INTO patient_clinics (patient_id, clinic_id) VALUES (?,?)';
      pool.query(sql, [res[0].id, user.clinic_id], function (error, ress) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY" || error.errno == 1062) {
            // duplicate patient found
            callback("The patient already exsit in your clinic");
          }
          else
            throw error;
        }
        else {
          callback("Added Successfully");
        }
      });
    }
  });

}
function deleteUser(id, callback) {
  sql = ' delete FROM users_2er31 WHERE id = ?';
  pool.query(sql, id, function (error, results) {
    if (error) throw error;
    callback("Deleted Successfully");
  });
}
function updateDoctor(doctor, callback) {
  sql = ' UPDATE doctors_12fdrv SET specialty=?,address=?,nationality=?,birth_date=?,gender=?,sec=? WHERE id=?';
  pool.query(sql, [doctor.specialty, doctor.address, doctor.nationality, doctor.birth_date, doctor.gender, doctor.sec, doctor.id], function (error, ress) {
    if (error) {
      throw error;
    }
    else {
      callback("Updated Successfully");
    }
  });
}
function updateAppointmentDrugs(data, callback) {
  sql = ' UPDATE appointments_3sd3df SET drugs=? WHERE id=?';
  pool.query(sql, [JSON.stringify(data.drugs), data.id], function (error, ress) {
    if (error) {
      throw error;
    }
    else {
      callback("Updated Successfully");
    }
  });
}
function getDocLogs(user, callback) {
  sql = ' SELECT * FROM logs_45fgre WHERE user_id=?';
  pool.query(sql, [user.id], function (error, results) {
    if (error) {
      throw error;
    }
    else {
      callback(results);
    }
  });
}
function insertLog(userId,log) {
  sql = ' INSERT INTO logs_45fgre(user_id, cont) VALUES(?,?)';
  pool.query(sql, [userId,log], function (error, res) {
    if (error) throw error;
  });
}
function removeLog(lid,callback) {
  sql = ' DELETE FROM  logs_45fgre WHERE id = ?';
  pool.query(sql, [lid], function (error, res) {
    if (error) throw error;
    callback("Deleted Successfully");
  });
}

function emitAppointmentAdded(id){
// emit msg that appointment addedd to all user with $clinic_id == $id
for(var a in connections){
  var clinic_id =  connections[a].user.clinic_id;
  var role = connections[a].user.role;
  if(clinic_id==id && role<=3){
    var currSocket = connections[a].socket;
    currSocket.emit("appointment added", "");
  }
}

}
function emitToDoc(id){
  var sql = 'SELECT * FROM  doctors_12fdrv WHERE id =?';
  pool.query(sql, [id], function (error, results) {
    if (error) throw error;
    var userId = results[0].user_id;
    if(connections[userId]){
      var currSocket = connections[userId].socket;
      insertLog(userId,"appointment added");
      currSocket.emit("appointment added", "");
    }
  });
}
function emitStat(id,stat){
  //alert doctor of appointment state
  var sql = 'SELECT user_id, date FROM  appointments_3sd3df INNER JOIN  doctors_12fdrv ON appointments_3sd3df.doctor_id = doctors_12fdrv.id WHERE appointments_3sd3df.id=?';
  pool.query(sql, [id], function (error, results) {
    if (error) throw error;
    var userId = results[0].user_id;
    insertLog(userId,"appointment on" + results[0].date + "changed to" + stat);
    if(connections[userId]){
      var currSocket = connections[userId].socket;
      currSocket.emit("state changed", "appointment on " + results[0].date + " changed to " + stat);
    }
  });
}