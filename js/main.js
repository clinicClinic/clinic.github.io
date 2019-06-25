
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

import * as lns from './lanSelector.js';
import * as req from './req.js';
import * as appo from './appCalender.js';
import * as obj from './obj.js';
import * as appoointmnetLayout from './appointmentLayout.js';

$(document).ready(function () {

  checkIfLoggedIn();
  var hd = buildHeader("dashBoardText,genRightBtnText");
  $("#main-body-header").append(hd);
  $(document).mousedown(function () {
    $(".timeNode").bind('mouseover', function () {
      if ($(this).attr("slctd") == "false") {
        $(this).attr("slctd", "true");
        $(this).css({ background: "#e3f2fd" });
      }
      else {
        $(this).css({ background: "#ffffff" });
        $(this).attr("slctd", "false");

      }

    });
  })
    .mouseup(function () {
      $(".timeNode").unbind('mouseover');
    });

  $('.timeNode').mousedown(function () {
    $(this).css({ background: "#e3f2fd" });
  });
  $(document).on("click", ".timeNode", function () {
    if ($(this).attr("slctd") == "false") {
      $(this).attr("slctd", "true");
      $(this).css({ background: "#e3f2fd" });
    }
    else {
      $(this).css({ background: "#ffffff" });
      $(this).attr("slctd", "false");
    }
  });


  $(document).on("click", "#dashNav", function () {
    transTab("dash");
    addChart("chart1");
    $(this).addClass("active");
  });
  $(document).on("click", "#clinicNav", function () {
    transTab("clinic");
    $(this).addClass("active");
  });
  $(document).on("click", "#usersNav", function () {
    transTab("users");
    $(this).addClass("active");
  });
  $(document).on("click", "#appointmentNav", function () {
    var user = localStorage.getItem('user');
    var user = JSON.parse(user);
    if (user.role == 4)
      docTransTab("clnd");
    else
      transTab("clnd");

    $(this).addClass("active");
  });
  $(document).on("click", "#docNav", function () {
    transTab("doc");
    $(this).addClass("active");
  });
  $(document).on("click", "#patintNav", function () {
    transTab("pat");
    $(this).addClass("active");
  });
  $(document).on("click", ".edtProfBtn", function () {
    $(this).hide();
    $(".profEditField").each(function () {
      var txt = $(this).parent().prev().first().text();
      $(this).val(txt);
    });
    $(".profEditField").show();
    $(".updtProfBtn").show();
  });
  $(document).on("click", ".updtProfBtn", function () {
    $(this).hide();
    $(".profEditField").hide();
    $(".profEditField").each(function () {
      var txt = $(this).val();
      $(this).parent().prev().first().text(txt);
    });
    $(".edtProfBtn").show();
  });
  $(document).on("click", ".docCardClick", function () {
    $("#appendTopBox").html('');
    var id = $(this).attr('profileid');
    var appointments = obj.getDocAppointments(id);
    var doctor = obj.getDoctor(id);
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildDoctorProfile(doctor));
    $("#contentFirstRow").append(buildAvaliableTime(id));
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
    setTimeSec(doctor.sec);

  });
  $(document).on("click", ".patCardClick", function () {
    $("#appendTopBox").html('');
    var id = $(this).attr('profileid');
    var appointments = obj.getPatAppointments(id);
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildPatientProfile(id));
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
  });
  $(document).on("click", ".userCardClick", function (event) {
    event.stopPropagation();
    $("#appendTopBox").html('');
    var id = $(this).attr('profileid');
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildUserProfile(id));
  });
  $(document).on("click", ".toggleAddDoctorModal", function (event) {

    $("#addDoctorModal").modal("show");
    event.stopPropagation();
  });
  $(document).on("click", ".minimizeBtn", function () {
    $(this).parent().parent().parent().next().slideToggle();
    req.mobileTest(function(res){

    });
  });
  $(document).on("keyup", ".searchDoctorInList", function () {
    var inp = $(this).val();
    $("[doctors-list-content]").each(function () {
      var appVal = $(this).attr("doctors-list-content");
      if (appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
    });
  });
  $(document).on("keyup", ".searchPatientInList", function () {
    var inp = $(this).val();
    $("[patient-list-content]").each(function () {
      var appVal = $(this).attr("patient-list-content");
      if (appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
    });
  });
  $(document).on("keyup", ".searchUsersInList", function () {
    var inp = $(this).val();
    $("[user-list-Content]").each(function () {
      var appVal = $(this).attr("user-list-Content");
      if (appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
    });
  });
  $(document).on("click", ".addNewUserBtn", function () {
    $("#appendTopBox").html('');
    var data = constructData(".addNewUserInp");
    if (data == "error")
      return;
    var user = localStorage.getItem('user');
    data = '{"user":' + user + ',"nuser":' + data + '}';
    //send new user to server
    req.addUser(data, function (msg) {
      cAlert(msg);
      req.getClinicUsers(function (users) {
        localStorage.setItem('users', JSON.stringify(users));
        transTab('users');
      });
    });
  });
  $(document).on("click", ".loginBtn", function () {
    var err = false;
    var s = '{';
    $(".loginInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      $(this).val("");
      if (name == '' || val == '') {
        err = true;
        // TODO: login values are not checked;
      }
      s += '"' + name.toLowerCase() + '":"' + val + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    if (!err) {
      //send user info to server
      req.login(s, function (token) {
        if (!token || token == "invalid user or password") {
          cAlert(token);
          return;
        }
        var tmp = token.split("  ");

        localStorage.setItem('user', tmp[1]);
        localStorage.setItem("token", token);
        checkIfLoggedIn();
      });
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".addNewDocBtn", function () {
    var data = constructData(".addNewDocInp");
    if (data == "error")
      return;
    console.log(data);
    var user = localStorage.getItem('user');
    data = '{"user":' + user + ',"doctor":' + data + '}';
    //send user info to server
    req.addDoctor(data, function (res) {
      cAlert(res);
      req.getDoctors(function (doctors) {
        req.getClinicUsers(function (users) {
          localStorage.setItem('doctors', JSON.stringify(doctors));
          localStorage.setItem('users', JSON.stringify(users));
          transTab('doc');
        });
      });
    });
  });
  $(document).on("click", ".addNewPatBtn", function () {
    var data = constructData(".addNewPatInp");
    if (data == "error")
      return;

    var user = localStorage.getItem('user');
    data = '{"user":' + user + ',"patient":' + data + '}';
    //send user info to server
    req.addPatient(data, function (res) {
      cAlert(res);
      req.getClinicPatients(function (patients) {
        localStorage.setItem('patients', JSON.stringify(patients));
        transTab('pat');
      });
    });
  });
  $(document).on("click", ".addOtherPatBtn", function () {
    var data = constructData(".addOtherPatInp");
    if (data == "error")
      return;

    var user = localStorage.getItem('user');
    data = '{"user":' + user + ',"patient":' + data + '}';
    //send user info to server
    req.integratePatient(data, function (res) {
      cAlert(res);
      req.getClinicPatients(function (patients) {
        localStorage.setItem('patients', JSON.stringify(patients));
        transTab('clinic');
      });
    });
  });
  $(document).on("click", ".addNewAppBtn", function () {
    var data = constructData(".addNewAppInp");
    if (data == "error")
      return;

    var user = localStorage.getItem('user');
    var data = '{"user":' + user + ',"appointment":' + data + '}';
    //send user info to server
    req.addAppointment(data, function (res) {
      cAlert(res);
      req.getAppointments(function (appointments) {
        localStorage.setItem('appointments', JSON.stringify(appointments));
        transTab('clnd');
      });
    });
  });
  $(document).on("click", ".logOutBtn", function () {
    localStorage.clear();
    checkIfLoggedIn();
    location.reload();
  });
  $(document).on("click", ".arbLang", function () {
    localStorage.setItem('lang', 'ar');
    location.reload();
  });
  $(document).on("click", ".engLang", function () {
    localStorage.setItem('lang', 'en');
    location.reload();
  });
  $(document).on("click", ".dltUser", function () {
    var conf = confirm("are you sure you want to delete this user from your clinic ?");
    if (!conf)
      return;

    var id = $(this).attr('uid');
    var data = '{"id":' + id + '}';
    req.deleteUser(data, function () {
      req.getClinicUsers(function (users) {

        localStorage.setItem('users', JSON.stringify(users));
        transTab('users');
      });
    });
  });
  $(document).on("click", ".close", function () {
    $(this).parent().remove();
  });
  $(document).on("click", ".setTimeSecBtn", function () {
    var id = $(this).attr('did');
    var sec = getTimeSec();
    var doctor = obj.getDoctor(id);
    doctor.sec = sec;
    var user = localStorage.getItem('user');
    var data = '{"user":' + user + ',"doctor":' + JSON.stringify(doctor) + '}';
    console.log(data);
    req.updateDoctor(data, function (res) {
      cAlert(res);
      req.getDoctors(function (doctors) {
        localStorage.setItem('doctors', JSON.stringify(doctors));
      });
    });
  });
  $(document).on("click", ".removeLog", function () {
    var id = $(this).attr('lid');
    $(this).parent().parent().parent().parent().remove();
    req.removeLog(id, function (res) {
      req.getLogs(function (logs) {
        localStorage.setItem('logs', JSON.stringify(logs));
      });
    });
  });
  $(document).on("click", ".deleteAppointment", function () {
    if (!confirm("you sure you want to delete this appointment ?")) return;
    var id = $(this).attr("aid");
    req.deleteAppointment(id, function (msg) {
      cAlert(msg);
      req.getAppointments(function (appointments) {
        localStorage.setItem('appointments', JSON.stringify(appointments));
        transTab('clnd');        
      });
    });
  });
});
function checkIfLoggedIn() {
  $("#appendTopBox").html('');
  var tokenTemp = localStorage.getItem("token");
  if (tokenTemp == '' || !tokenTemp) {
    $("#contentFirstRow").append("<div class='col-md-3'></div>");
    $("#contentFirstRow").append(buildLoginCard());
    $("#contentFirstRow").append("<div class='col-md-3'></div>");
    $("#sideBar").html('');
    console.log("not logged in ");
  }
  else {
    req.socketInit();
    displayCont();
  }
}
function displayCont() {
  var user = localStorage.getItem('user');
  var user = JSON.parse(user);
  $("#userName").text(user.fname + " " + user.lname);
  $("#profileTab").attr("profileId", user.id);
  if (user.role == 4) {
    buildSideBarItems();
    var tab = localStorage.getItem("tab");
    if (!tab || tab == "")
      docTransTab("clnd");
    else
      docTransTab(tab);
  }
  else {
    buildSideBarItems();
    var tab = localStorage.getItem("tab");
    if (!tab || tab == "")
      transTab("clnd");
    else
      transTab(tab);
  }
}
function docTransTab(nxt) {
  localStorage.setItem("tab", nxt);
  $(".isNav").removeClass("active");
  $("#contentFirstRow").html("");
  $("#appendTopBox").html("");

  loadDocData(function () {
    if (nxt == "clinic") {
      clinicCont();
    }
    else if (nxt == "clnd") {
      appointmentCont(true);
    }
  buildLog();

  });

}
function transTab(nxt) {
  localStorage.setItem("tab", nxt);
  $(".isNav").removeClass("active");
  $("#contentFirstRow").html("");
  $("#appendTopBox").html("");
  loadClinicData(function () {
    if (nxt == "dash") {
      dashCont();
      addChart("chart1");
    }
    else if (nxt == "clinic") {
      clinicCont();
    }
    else if (nxt == "clnd") {
      appointmentCont(false);
    }
    else if (nxt == "pat") {
      patintCont();
    }
    else if (nxt == "doc") {
      doctorsCont();
    }
    else if (nxt == "users") {
      usersCont();
    }
  buildLog();

  });

}
function constructData(fld) {
  var error = false;
  if (!checkConf(fld))
    return "error";


  var s = '{';
  $(fld).each(function () {
    var name = $(this).attr('name');
    var val = $(this).val();

    if (!checkFields(name, val))
      error = true;


    if (name == "email" || name == "reEmail" || name == "password" || name == "rePassowrd")
      s += '"' + name.toLowerCase() + '":"' + val + '",';
    else
      s += '"' + name.toLowerCase() + '":"' + val.toLowerCase().trim().replace(/ +(?= )/g, '') + '",';
  });
  s = s.substring(0, s.length - 1);
  s += '}';


  if (!error)
    return s;
  else
    return "error";
}
function checkConf(fld) {
  var res = true;
  var email = $(fld + "[name=email]").val();
  var password = $(fld + "[name=password]").val();
  if (email) {
    if (email != $(fld + "[name=reEmail]").val()) {
      cAlert("emails doesnt match");
      res = false;
    }
  }
  if (password) {
    if (password != $(fld + "[name=rePassowrd]").val()) {
      cAlert("passwords doesnt match");
      res = false;
    }
  }
  return res;
}
function checkFields(type, inp) {
  //check if empty
  if (inp == "") {
    cAlert(type + " : is empty")
    return false;
  }


  if (type == "email") {
    //validate email
    var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!patt.test(inp))
      cAlert("email format is incorect");

    return patt.test(inp);
  }
  else if (type == "password") {
    //validate strong password
    var patt = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (!patt.test(inp))
      cAlert("week password");

    return patt.test(inp);
  }
  else if (type == "phone") {
    var patt = /^[0-9]{10}$/;

    if (!patt.test(inp))
      cAlert("phone number should be 10 digit long without chars");

    return patt.test(inp);
  }
  else {
    return true;
  }

}
function cAlert(msg) {
  var alert = '<div class="floatingAlert  alert-warning  fade show" role="alert">' + msg + '<button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  $("#alertRow").append(alert);
}
//------------------------------------------------------ renders page component based on the clicked menu item
function doctorsCont() {
  var doctors = localStorage.getItem('doctors');
  doctors = JSON.parse(doctors);

  if (!doctors)
    return;

  $("#contentFirstRow").append(buildDocListCard(doctors));
  $("#contentFirstRow").append(buildAddDoctorCard1());

  var a;
  for (a in doctors) {
    $("#contentFirstRow").append(buildDoctorCard(doctors[a].id, doctors[a].fname, doctors[a].fname + ' ' + doctors[a].lname));
  }
}
function patintCont() {
  var patients = localStorage.getItem('patients');
  patients = JSON.parse(patients);

  if (!patients)
    return;

  $("#contentFirstRow").append(buildPatListCard(patients));
  $("#contentFirstRow").append(buildAddPaitentCard());

  var a;
  for (a in patients) {
    $("#contentFirstRow").append(buildPatientCard(patients[a].id, patients[a].fname, patients[a].fname + ' ' + patients[a].lname));
  }
}
function dashCont() {
  $("#contentFirstRow").append(buildStatCard("$2536", "EARNINGS (MONTHLY)", "danger", "fa-calendar"));
  $("#contentFirstRow").append(buildStatCard("$2536", "EARNINGS (ANNUAL)", "success", "dollar-sign"));
  $("#contentFirstRow").append(buildStatCard("$2536", "TASKS", "primary", "fa-comments"));
  $("#contentFirstRow").append(buildStatCard("$2536", "PENDING REQUESTS", "warning", "fa-calendar"));


  //adding chart cards
  $("#contentFirstRow").append(buildChartCard("chart1", 7, "chart1"));
  $("#contentFirstRow").append(buildChartCard("chart2", 5, "chart2"));
  $("#contentFirstRow").append(buildChartCard("chart3", 12, "chart3"));

}
function clinicCont() {
  var clinic = localStorage.getItem('clinic');
  clinic = JSON.parse(clinic);
  $("#contentFirstRow").append(buildMyClinicCont(clinic));
}
function usersCont() {
  var users = localStorage.getItem('users');
  if (users) {
    users = JSON.parse(users);
    $("#contentFirstRow").append(buildUsersListCard(users));
    $("#contentFirstRow").append(buildAddUserCard());
  }
  else {
    req.getClinicUsers(function (users) {
      localStorage.setItem('users', JSON.stringify(users));
      $("#contentFirstRow").append(buildUsersListCard(users));
      $("#contentFirstRow").append(buildAddUserCard());
    });
  }

}
function appointmentCont(isDoc) {
  if (isDoc) {
    appo.rend();
    var appointments = localStorage.getItem('appointments');
    appointments = JSON.parse(appointments);
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
  }
  else {
    appo.rend();
    var doctors = localStorage.getItem('doctors');
    var patients = localStorage.getItem('patients');
    var appointments = localStorage.getItem('appointments');
    doctors = JSON.parse(doctors);
    patients = JSON.parse(patients);
    appointments = JSON.parse(appointments);
    $("#contentFirstRow").append(appoointmnetLayout.buildAddAppointmentCard(patients, doctors, false));
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
    appoointmnetLayout.addAppointmentFields("");
  }

}
//---------------------------------------------------- render helpers
function addChart(id) {
  var reqCount = [34, 65, 76, 35, 12, 67, 23, 65, 78, 23, 56];
  var provCount = [67, 23, 65, 78, 23, 56, 34, 65, 76, 35, 12];
  // Pie Chart Example
  var ctx = document.getElementById(id);
  var myPieChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Monthly Registerd Requesters ',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [
          reqCount[0],
          reqCount[1],
          reqCount[2],
          reqCount[3],
          reqCount[4],
          reqCount[5],
          reqCount[6],
          reqCount[7],
          reqCount[8],
          reqCount[9],
          reqCount[10],
          reqCount[11]
        ],
        fill: false,
      }, {
        label: 'Monthly Registerd Providers ',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
        data: [
          provCount[0],
          provCount[1],
          provCount[2],
          provCount[3],
          provCount[4],
          provCount[5],
          provCount[6],
          provCount[7],
          provCount[8],
          provCount[9],
          provCount[10],
          provCount[11]
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }
  );

}
function buildTxtFeild(inpId, title, cont, visiable) {
  var row = $("<div/>").addClass("row");
  var col0 = $("<div/>").addClass("col-md-4");
  var col1 = $("<div/>").addClass("col-md-4");
  var col2 = $("<div/>").addClass("col-md-4");

  var headingTitle = $("<h5/>").addClass("m-0 font-weight-bold").append("<span/>").text(title);
  var headingCont = $("<h5/>").addClass("m-0 font-weight-bold mdl-color-text--teal-500").append("<span/>").text(cont);

  var customClass = inpId + ' profEditField form-control bg-light border-0 small';
  if (visiable) {
    var inp = $("<input/>").addClass(customClass).attr("type", "text").attr("placeholder", "new");
  }
  else {
    var inp = $("<input/>").addClass(customClass).attr("type", "text").attr("placeholder", "new").css({ "display": "none" });
  }


  col0.append(headingTitle);
  col1.append(headingCont);
  col2.append(inp);

  row.append(col0);
  row.append(col1);
  row.append(col2);

  return row;
}
function buildTextArea(inpId, title, cont, visiable) {
  var row = $("<div/>").addClass("row");
  var col0 = $("<div/>").addClass("col-md-4");
  var col1 = $("<div/>").addClass("col-md-4");
  var col2 = $("<div/>").addClass("col-md-4");

  var headingTitle = $("<h5/>").addClass("m-0 font-weight-bold").append("<span/>").text(title);
  var headingCont = $("<h5/>").addClass("m-0 font-weight-bold mdl-color-text--teal-500").append("<span/>").text(cont);

  var customClass = inpId + ' profEditField form-control bg-light border-0 small';
  if (visiable) {
    var inp = $("<textarea/>").addClass(customClass).attr("placeholder", "new");
  }
  else {
    var inp = $("<textarea/>").addClass(customClass).attr("placeholder", "new").css({ "display": "none" });
  }


  col0.append(headingTitle);
  col1.append(headingCont);
  col2.append(inp);

  row.append(col0);
  row.append(col1);
  row.append(col2);

  return row;
}
function buildStatCard(numb, title, color, symbol) {

  var txtName = $("<div/>").addClass("text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(title);
  var txtSpec = $("<div/>").addClass("h5 mb-0 font-weight-bold text-gray-800").append("<span/>").text(numb);
  var col = $("<div/>").addClass("col mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var customClass = 'fas ' + symbol + 'fa-2x text-gray-300';
  var colAut1 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass(customClass);
  colAut1.append(i);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(col);
  row.append(colAut1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var customClass = "card border-left-" + color + " shadow h-100 py-2";
  var cardShadow = $("<div/>").addClass(customClass);

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-xl-3 col-md-6 mb-4");
  card.append(cardShadow);


  return card;

}
function buildDoctorCard(id, name, doctorSpecialties) {
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/img_491471.png").attr("height", "60");
  var txtAv = $("<div/>").addClass("h5 mb-0 font-weight-bold text-primary").append("<span>").text("Available");
  var colAut1 = $("<div/>").addClass("col-md-4");
  var center = $("<center/>");

  center.append(img);
  center.append(txtAv);
  colAut1.append(center);

  var txtName = $("<div/>").addClass("h4 text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(name);
  var txtSpec = $("<div/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(doctorSpecialties);
  var col = $("<div/>").addClass("col-md-6 mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var colAut2 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass("fas fa-user-md  fa-2x text-gray-300");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").attr('app-data', '{"doctor_id":"' + id + '"}').text("+");
  colAut2.append(addAppointmentBtn);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(colAut1);
  row.append(col);
  row.append(colAut2);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-primary shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable docCardClick col-xl-3 col-md-6 mb-4").attr("profileid", id);
  card.append(cardShadow);

  return card;
}
function buildPatientCard(id, fname, fullName) {
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/img_491471.png").attr("height", "60");
  var txtAv = $("<div/>").addClass("h5 mb-0 font-weight-bold text-primary").append("<span>").text("New");
  var colAut1 = $("<div/>").addClass("col-md-4");
  var center = $("<center/>");

  center.append(img);
  center.append(txtAv);
  colAut1.append(center);
  var txtName = $("<div/>").addClass("h4 text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(fname);
  var txtSpec = $("<div/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(fullName);
  var col = $("<div/>").addClass("col-md-6 mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var colAut2 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass("fas fa-user-md  fa-2x text-gray-300");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").attr('app-data', '{"patient_id":"' + id + '"}').text("+");
  colAut2.append(addAppointmentBtn);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(colAut1);
  row.append(col);
  row.append(colAut2);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-primary shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable patCardClick col-xl-3 col-md-6 mb-4").attr("profileid", id);
  card.append(cardShadow);

  return card;
}
function buildChartCard(title, size, id) {
  var canvas = $("<canvas/>").attr("id", id).addClass("chartjs-render-monitor").css({ "display": "block", "width": "1037px", "height": "320px" });
  var cnavasCont = $("<div/>");
  cnavasCont.append(canvas)
  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(cnavasCont);

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Earnings Overview");
  var cardheader = $("<div/>").addClass("card-header py-3 d-flex flex-row align-items-center justify-content-between");

  cardheader.append(headerH4);

  var cardShadow = $("<div/>").addClass("card shadow mb-4");

  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var customClass = 'col-xl-' + size + ' col-lg-' + size;

  var card = $("<div/>").addClass(customClass);

  card.append(cardShadow);

  return card;
}
function buildHeader(id0, id1) {
  var elm0 = $('<i/>').addClass("fas fa-download fa-sm text-white-50");
  var elm1 = $('<a/>').attr("href", "#").addClass("d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm");
  var elm4 = $("<span/>").text("Generate Report");
  elm1.append(elm0);
  elm1.append(elm4);
  var elm2 = $('<h1/>').addClass("h3 mb-0 text-gray-800").append("<span/>").text("Dashboard");
  var elm3 = $('</div>').addClass("d-sm-flex align-items-center justify-content-between mb-4");
  elm3.append(elm2);
  elm3.append(elm1);

  return elm3;

}
function buildDoctorProfile(doctor) {
  if (!doctor)
    return;

  var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
  var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

  var aBtnEdit = $("<a/>").addClass("edtProfBtn btn-sm animated-button thar-one").append("<span/>").text("Edit");
  var aBtnUpdate = $("<a/>").addClass("updtProfBtn btn-sm animated-button thar-three").css({ "display": "none" }).append("<span/>").text("Update");

  var col0 = $("<div/>").addClass("col-md-5");
  var col2 = $("<div/>").addClass("col-md-2");
  var col1 = $("<div/>").addClass("col-md-5");

  col0.append(headingEmpty1);
  col1.append(headingEmpty2);

  col2.append(aBtnUpdate);
  col2.append(aBtnEdit);

  var row0 = $("<div/>").addClass("row");
  row0.append(col0);
  row0.append(col1);
  row0.append(col2);

  var divider = $("<hr/>").addClass("sidebar-divider");

  var h2 = $("<h2/>").append("<span/>").text(lns.getText('n32'));
  var br0 = $("<br/>");
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/img_491471.png").attr("height", "150").attr("width", "150");

  var center = $("<center/>");
  var col_11_0 = $("<div/>").addClass("col-lg-2");
  center.append(h2);
  center.append(br0);

  center.append(img);
  col_11_0.append(center);

  var h2Info = $("<h2/>").append("<span/>").text(lns.getText('n44'));
  var br1 = $("<br/>");
  var col_11_1 = $("<div/>").addClass("col-lg-10");
  col_11_1.append(h2Info);
  col_11_1.append(br1);
  col_11_1.append(divider);
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n35'), doctor.fname + " " + doctor.lname, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n23'), doctor.address, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n14'), doctor.phone, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTextArea("profNameInp", lns.getText('n48'), doctor.gender, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(row0);

  var row2 = $("<div/>").addClass("row");
  row2.append(col_11_0);
  row2.append(col_11_1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row2);

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n47'));
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").attr('app-data', '{"doctor_id":"' + doctor.id + '"}').text("+");
  var headerCol0 = $("<div/>").addClass("col-auto");
  var headerCol1 = $("<div/>").addClass("col-auto");
  var headerRow = $("<div/>").addClass("row");
  var cardheader = $("<div/>").addClass("card-header py-3");
  headerCol0.append(headerH4);
  headerCol1.append(addAppointmentBtn);
  headerRow.append(headerCol0);
  headerRow.append(headerCol1);
  cardheader.append(headerRow);


  var cardShadow = $("<div/>").addClass(" shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-lg-12 mb-12");
  card.append(cardShadow);

  return card;
}
function buildPatientProfile(id) {
  var patient = obj.getPatient(id);
  if (!patient)
    return;
  var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
  var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

  var col0 = $("<div/>").addClass("col-md-5");
  var col2 = $("<div/>").addClass("col-md-2");
  var col1 = $("<div/>").addClass("col-md-5");

  col0.append(headingEmpty1);
  col1.append(headingEmpty2);

  var row0 = $("<div/>").addClass("row");
  row0.append(col0);
  row0.append(col1);
  row0.append(col2);

  var divider = $("<hr/>").addClass("sidebar-divider");

  var h2 = $("<h2/>").append("<span/>").text(lns.getText('n32'));
  var br0 = $("<br/>");
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/img_491471.png").attr("height", "150").attr("width", "150");

  var center = $("<center/>");
  var col_11_0 = $("<div/>").addClass("col-lg-2");
  center.append(h2);
  center.append(br0);

  center.append(img);
  col_11_0.append(center);

  var h2Info = $("<h2/>").append("<span/>").text(lns.getText('n45'));
  var br1 = $("<br/>");
  var col_11_1 = $("<div/>").addClass("col-lg-10");
  col_11_1.append(h2Info);
  col_11_1.append(br1);
  col_11_1.append(divider);
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n7'), patient.fname, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n8'), patient.lname, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n9'), patient.email, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n14'), patient.phone, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(row0);

  var row2 = $("<div/>").addClass("row");
  row2.append(col_11_0);
  row2.append(col_11_1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row2);

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n46'));
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").attr('app-data', '{"doctor_id":"' + patient.id + '"}').text("+");
  var headerCol0 = $("<div/>").addClass("col-auto");
  var headerCol1 = $("<div/>").addClass("col-auto");
  var headerRow = $("<div/>").addClass("row");
  var cardheader = $("<div/>").addClass("card-header py-3");
  headerCol0.append(headerH4);
  headerCol1.append(addAppointmentBtn);
  headerRow.append(headerCol0);
  headerRow.append(headerCol1);
  cardheader.append(headerRow);


  var cardShadow = $("<div/>").addClass(" shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-lg-12 mb-12");
  card.append(cardShadow);

  return card;
}
function buildUserProfile(id) {
  var user = obj.getUser(id);
  if (!user)
    return;
  var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
  var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

  var col0 = $("<div/>").addClass("col-md-5");
  var col2 = $("<div/>").addClass("col-md-2");
  var col1 = $("<div/>").addClass("col-md-5");

  col0.append(headingEmpty1);
  col1.append(headingEmpty2);

  var row0 = $("<div/>").addClass("row");
  row0.append(col0);
  row0.append(col1);
  row0.append(col2);

  var divider = $("<hr/>").addClass("sidebar-divider");

  var h2 = $("<h2/>").append("<span/>").text(lns.getText('n32'));
  var br0 = $("<br/>");
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/img_491471.png").attr("height", "150").attr("width", "150");

  var center = $("<center/>");
  var col_11_0 = $("<div/>").addClass("col-lg-2");
  center.append(h2);
  center.append(br0);

  center.append(img);
  col_11_0.append(center);

  var h2Info = $("<h2/>").append("<span/>").text(lns.getText('n62'));
  var br1 = $("<br/>");
  var col_11_1 = $("<div/>").addClass("col-lg-10");
  col_11_1.append(h2Info);
  col_11_1.append(br1);
  col_11_1.append(divider);
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n7'), user.fname, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n8'), user.lname, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n9'), user.email, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n14'), user.role, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(row0);

  var row2 = $("<div/>").addClass("row");
  row2.append(col_11_0);
  row2.append(col_11_1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row2);

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n61'));
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
  var headerCol0 = $("<div/>").addClass("col-auto");
  var headerCol1 = $("<div/>").addClass("col-auto");
  var headerRow = $("<div/>").addClass("row");
  var cardheader = $("<div/>").addClass("card-header py-3");
  headerCol0.append(headerH4);
  headerCol1.append(addAppointmentBtn);
  headerRow.append(headerCol0);
  headerRow.append(headerCol1);
  cardheader.append(headerRow);


  var cardShadow = $("<div/>").addClass(" shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-lg-12 mb-12");
  card.append(cardShadow);

  return card;
}
function buildGenericSearch(classs) {
  return '<div class="input-group"><input type="text" class=" ' + classs + ' form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"><div class="input-group-append"><button class="btn btn-primary" type="button><i class="fas fa-search fa-sm"></i></button></div></div>';
}
function buildAddUserCard() {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n10'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n7') + '</label><input name="fname" class="addNewUserInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n8') + '</label><input name="lname" class="addNewUserInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n11') + '</label><input type="password" name="password" class="addNewUserInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n12') + '</label><input type="password" name="rePassowrd" class="addNewUserInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="addNewUserInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n13') + '</label><input name="reEmail" class="addNewUserInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n14') + '</label><input name="phone" class="addNewUserInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n15') + '</label><select name="role" class="addNewUserInp form-control col-sm-3"><option>2</option><option>3</option></select></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n16') + '</label><button class="addNewUserBtn btn btn-success">' + lns.getText('n16') + '</button></div>');
  var hr = $('<hr/>').addClass("sidebar-divider");
  cardBody.append(hr.clone());
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-12 col-form-label">' + lns.getText('n51') + '</label></div>');
  cardBody.append('<div class="row"><label class="col-sm-12 col-form-label">' + lns.getText('n52') + '</label></div>');

  var cardShadow = $("<div/>").addClass("card shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6 ");
  card.append(cardShadow);
  return card;


}
function buildLoginCard() {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n17'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append('<div class="row"><label class="col-sm-6 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="loginInp form-control col-sm-6"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-6 col-form-label">' + lns.getText('n11') + '</label><input type="password" name="password" class="loginInp form-control col-sm-6"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-6 col-form-label"></label><button class="loginBtn btn btn-info">' + lns.getText('n17') + '</button>');

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6");
  card.append(cardShadow);
  return card;


}
function buildSideBarItems() {
  var user = localStorage.getItem('user');
  if (!user) return;
  user = JSON.parse(user);
  var role = user.role;
  $("#sideBar").html('');
  var hr = $('<hr/>').addClass("sidebar-divider");
  $('#sideBar').append(hr);
  if (role == 1) {
    $('#sideBar').append('<li id="dashNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-tachometer-alt"></i><span>' + lns.getText('n1') + '</span></a></li>');
    $('#sideBar').append('<li id="clinicNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-tachometer-alt"></i><span>' + lns.getText('n2') + '</span></a></li>');
    $('#sideBar').append('<li id="usersNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-users"></i><span>' + lns.getText('n3') + '</span></a></li>');
  }
  else if (role == 2) {
    $('#sideBar').append('<li id="clinicNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-tachometer-alt"></i><span>' + lns.getText('n2') + '</span></a></li>');
    $('#sideBar').append('<li id="usersNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-users"></i><span>' + lns.getText('n3') + '</span></a></li>');
  }
  else if (role == 3) {
    $('#sideBar').append('<li id="clinicNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-tachometer-alt"></i><span>' + lns.getText('n2') + '</span></a></li>');
  }
  else if (role == 4) {
    $('#sideBar').append('<li id="clinicNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-tachometer-alt"></i><span>' + lns.getText('n2') + '</span></a></li>');
    $('#sideBar').append(hr);
    $('#sideBar').append('<li id="appointmentNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-calendar-alt"></i><span>' + lns.getText('n42') + '</span></a></li>');
    return;
  }
  $('#sideBar').append(hr);
  $('#sideBar').append('<li id="appointmentNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-calendar-alt"></i><span>' + lns.getText('n42') + '</span></a></li>');
  $('#sideBar').append('<li id="docNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-user-md"></i><span>' + lns.getText('n5') + '</span></a></li>');
  $('#sideBar').append('<li id="patintNav" class="clickable isNav nav-item "><a class="nav-link" ><i class="fas fa-fw fa-user-injured"></i><span>' + lns.getText('n6') + '</span></a></li>');
}
function buildAddDoctorCard1() {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n19'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  // todo ????????

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n7') + '</label><input name="fname" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n8') + '</label><input name="lname" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n11') + '</label><input type="password" name="password" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n12') + '</label><input type="password" name="rePassowrd" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n13') + '</label><input name="reEmail" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n14') + '</label><input name="phone" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n22') + '</label><textarea  name="about" class="addNewDocInp form-control col-sm-3"></textarea></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n20') + '</label><select name="specialty" class="addNewDocInp form-control col-sm-3">' + appoointmnetLayout.specOptions() + '</select><label class="col-sm-3 col-form-label">' + lns.getText('n23') + '</label><input name="address" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n21') + '</label><select name="nationality" class="addNewDocInp form-control col-sm-3">' + nationalityOptions() + '</select><label class="col-sm-3 col-form-label">' + lns.getText('n48') + '</label><select name="gender" class="addNewDocInp form-control col-sm-3"><option value="male">male</option><option value="female">female</option></select></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n24') + '</label><input name="birth_date" class="addNewDocInp form-control col-sm-3" ></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n16') + '</label><button class="addNewDocBtn btn btn-success">' + lns.getText('n16') + '</button></div>');

  var cardShadow = $("<div/>").addClass("card shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6");
  card.append(cardShadow);
  return card;
}
function buildAddPaitentCard() {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n29'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  var divider = $("<hr/>").addClass("sidebar-divider");
  cardBody.append(br);
  cardBody.append('<div class="row"><h3 class="col-sm-12 mdl-color-text--teal-500">If the patient already have a profile in other clinics or created an account thru the application enter his phone number or email </h3></div>');
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n14') + '</label><input name="phone" class="addOtherPatInp form-control col-sm-3"></div>');
  cardBody.append(br.clone()); //<label class="col-sm-3 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="addOtherPatInp form-control col-sm-3">
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n16') + '</label><button class="addOtherPatBtn btn btn-success">' + lns.getText('n16') + '</button>');
  //----------- field for adding new patient
  cardBody.append(divider);
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n7') + '</label><input name="fname" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n8') + '</label><input name="lname" class="addNewPatInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n13') + '</label><input name="reEmail" class="addNewPatInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n14') + '</label><input name="phone" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n23') + '</label><input name="address" class="addNewPatInp form-control col-sm-3">');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n21') + '</label><select name="nationality" class="addNewPatInp form-control col-sm-3">' + nationalityOptions() + '<select><label class="col-sm-3 col-form-label">' + lns.getText('n24') + '</label><input name="birth_date" class="addNewPatInp form-control col-sm-3">');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n48') + '</label><select name="nationality" class="addNewPatInp form-control col-sm-3"><option value="male">male</option><option value="feale" >female</option><select></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n16') + '</label><button class="addNewPatBtn btn btn-success">' + lns.getText('n16') + '</button>');

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6 mb-4");
  card.append(cardShadow);
  return card;
}
function loadClinicData(callback) {
  var clinic = localStorage.getItem('clinic');
  var doctors = localStorage.getItem('doctors');
  var patients = localStorage.getItem('patients');
  var appointments = localStorage.getItem('appointments');
  var users = localStorage.getItem('users');
  if (clinic && doctors && patients && appointments && users) {
    callback();
  }
  else {
    req.getClinic(function (clinic) {
      req.getDoctors(function (doctors) {
        req.getClinicPatients(function (patients) {
          req.getAppointments(function (appointments) {
            req.getClinicUsers(function (users) {
              req.getLogs(function (logs) {
                localStorage.setItem('clinic', JSON.stringify(clinic));
                localStorage.setItem('doctors', JSON.stringify(doctors));
                localStorage.setItem('patients', JSON.stringify(patients));
                localStorage.setItem('appointments', JSON.stringify(appointments));
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('logs', JSON.stringify(logs));
                callback();
              });
            });
          });
        });
      });
    });
  }
}
function loadDocData(callback) {
  var clinic = localStorage.getItem('clinic');
  var doctors = localStorage.getItem('doctors');
  var patients = localStorage.getItem('patients');
  var appointments = localStorage.getItem('appointments');
  var users = localStorage.getItem('users');
  var logs = localStorage.getItem('logs');
  if (clinic && doctors && patients && appointments && users && logs) {
    callback();
  }
  else {
    req.getClinic(function (clinic) {
      req.getDoctors(function (doctors) {
        req.getClinicPatients(function (patients) {
          req.getDocAppointments(function (appointments) {
            req.getClinicUsers(function (users) {
              req.getLogs(function (logs) {
                localStorage.setItem('clinic', JSON.stringify(clinic));
                localStorage.setItem('doctors', JSON.stringify(doctors));
                localStorage.setItem('patients', JSON.stringify(patients));
                localStorage.setItem('appointments', JSON.stringify(appointments));
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('logs', JSON.stringify(logs));
                callback();
              });
            });
          });
        });
      });
    });
  }
}
function addNotifications(log) {
  return '<a class="dropdown-item d-flex align-items-center" >\
            <div class="mr-3">\
              <div class="icon-circle bg-primary">\
                <i class="fas fa-file-alt text-white"></i>\
              </div>\
            </div>\
            <div>\
            <div class="row"><div class="col-md-10"><div class="small text-gray-500">Today:just now</div></div><div class="col-md-2"><lable lid="'+ log.id + '"class="removeLog clickable pull-right">X</lable></div></div>\
              <span class="font-weight-bold">'+ log.cont + '</span>\
            </div>\
          </a>';
}
function buildAvaliableTime(did) {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n69'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(timeSec(did));

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6");
  card.append(cardShadow);
  return card;

}
function timeSec(did) {
  var daysL = ['sa', 'su', 'mo', 'tu', 'we', 'th', 'fr'];
  var res = "";
  res += '<div class="row border-left border-top border-bottom">';
  res += '<div  class="  col border-right border-grey">sat</div>';
  res += '<div  class="  col border-right border-grey">sun</div>';
  res += '<div  class="  col border-right border-grey">mon</div>';
  res += '<div  class="  col border-right border-grey">thu</div>';
  res += '<div  class="  col border-right border-grey">wed</div>';
  res += '<div  class="  col border-right border-grey">thr</div>';
  res += '<div  class="  col border-right border-grey">fri</div>';
  res += '</div>';
  for (var i = 0; i < 23; i++) {
    res += '<div class="row border-left border-top border-bottom">';
    for (var j = 0; j < 7; j++) {
      res += '<div slctd="false" timeSec="' + daysL[j] + ',' + i + ':00 " class="noselect timeNode col border-right border-grey">' + i + ':00</div>';
    }
    res += '</div>';
    res += '<div class="row border-left border-top border-bottom">';

    for (var j = 0; j < 7; j++) {
      res += '<div slctd="false" timeSec="' + daysL[j] + ',' + i + ':30 " class="noselect timeNode col border-right border-grey">' + i + ':30</div>';
    }
    res += '</div>';
  }
  res += '<div class="row border-left border-top border-bottom">';
  res += '<br>';
  res += '<button  did="' + did + '" class="setTimeSecBtn btn btn-success">' + lns.getText("n68"); +' </button>';
  res += '</div>';
  return res;
}
function setTimeSec(sec) {
  if (sec == "")
    return;

  $('.timeNode').each(function () {
    var time = $(this).attr("timeSec");
    if (sec.indexOf(time) !== -1) {
      $(this).attr("slctd", "true");
      $(this).css({ background: "#e3f2fd" });
    }
  });
}
function getTimeSec() {
  var setTime = "";
  $('.timeNode[slctd="true"]').each(function () {
    setTime += $(this).attr('timeSec');
  });
  return setTime;
}
function nationalityOptions() {
  return '  <option value="">-- select one --</option>  <option value="afghan">Afghan</option>  <option value="albanian">Albanian</option>  <option value="algerian">Algerian</option>  <option value="american">American</option>  <option value="andorran">Andorran</option>  <option value="angolan">Angolan</option>  <option value="antiguans">Antiguans</option>  <option value="argentinean">Argentinean</option>  <option value="armenian">Armenian</option>  <option value="australian">Australian</option>  <option value="austrian">Austrian</option>  <option value="azerbaijani">Azerbaijani</option>  <option value="bahamian">Bahamian</option>  <option value="bahraini">Bahraini</option>  <option value="bangladeshi">Bangladeshi</option>  <option value="barbadian">Barbadian</option>  <option value="barbudans">Barbudans</option>  <option value="batswana">Batswana</option>  <option value="belarusian">Belarusian</option>  <option value="belgian">Belgian</option>  <option value="belizean">Belizean</option>  <option value="beninese">Beninese</option>  <option value="bhutanese">Bhutanese</option>  <option value="bolivian">Bolivian</option>  <option value="bosnian">Bosnian</option>  <option value="brazilian">Brazilian</option>  <option value="british">British</option>  <option value="bruneian">Bruneian</option>  <option value="bulgarian">Bulgarian</option>  <option value="burkinabe">Burkinabe</option>  <option value="burmese">Burmese</option>  <option value="burundian">Burundian</option>  <option value="cambodian">Cambodian</option>  <option value="cameroonian">Cameroonian</option>  <option value="canadian">Canadian</option>  <option value="cape verdean">Cape Verdean</option>  <option value="central african">Central African</option>  <option value="chadian">Chadian</option>  <option value="chilean">Chilean</option>  <option value="chinese">Chinese</option>  <option value="colombian">Colombian</option>  <option value="comoran">Comoran</option>  <option value="congolese">Congolese</option>  <option value="costa rican">Costa Rican</option>  <option value="croatian">Croatian</option>  <option value="cuban">Cuban</option>  <option value="cypriot">Cypriot</option>  <option value="czech">Czech</option>  <option value="danish">Danish</option>  <option value="djibouti">Djibouti</option>  <option value="dominican">Dominican</option>  <option value="dutch">Dutch</option>  <option value="east timorese">East Timorese</option>  <option value="ecuadorean">Ecuadorean</option>  <option value="egyptian">Egyptian</option>  <option value="emirian">Emirian</option>  <option value="equatorial guinean">Equatorial Guinean</option>  <option value="eritrean">Eritrean</option>  <option value="estonian">Estonian</option>  <option value="ethiopian">Ethiopian</option>  <option value="fijian">Fijian</option>  <option value="filipino">Filipino</option>  <option value="finnish">Finnish</option>  <option value="french">French</option>  <option value="gabonese">Gabonese</option>  <option value="gambian">Gambian</option>  <option value="georgian">Georgian</option>  <option value="german">German</option>  <option value="ghanaian">Ghanaian</option>  <option value="greek">Greek</option>  <option value="grenadian">Grenadian</option>  <option value="guatemalan">Guatemalan</option>  <option value="guinea-bissauan">Guinea-Bissauan</option>  <option value="guinean">Guinean</option>  <option value="guyanese">Guyanese</option>  <option value="haitian">Haitian</option>  <option value="herzegovinian">Herzegovinian</option>  <option value="honduran">Honduran</option>  <option value="hungarian">Hungarian</option>  <option value="icelander">Icelander</option>  <option value="indian">Indian</option>  <option value="indonesian">Indonesian</option>  <option value="iranian">Iranian</option>  <option value="iraqi">Iraqi</option>  <option value="irish">Irish</option>  <option value="israeli">Israeli</option>  <option value="italian">Italian</option>  <option value="ivorian">Ivorian</option>  <option value="jamaican">Jamaican</option>  <option value="japanese">Japanese</option>  <option value="jordanian">Jordanian</option>  <option value="kazakhstani">Kazakhstani</option>  <option value="kenyan">Kenyan</option>  <option value="kittian and nevisian">Kittian and Nevisian</option>  <option value="kuwaiti">Kuwaiti</option>  <option value="kyrgyz">Kyrgyz</option>  <option value="laotian">Laotian</option>  <option value="latvian">Latvian</option>  <option value="lebanese">Lebanese</option>  <option value="liberian">Liberian</option>  <option value="libyan">Libyan</option>  <option value="liechtensteiner">Liechtensteiner</option>  <option value="lithuanian">Lithuanian</option>  <option value="luxembourger">Luxembourger</option>  <option value="macedonian">Macedonian</option>  <option value="malagasy">Malagasy</option>  <option value="malawian">Malawian</option>  <option value="malaysian">Malaysian</option>  <option value="maldivan">Maldivan</option>  <option value="malian">Malian</option>  <option value="maltese">Maltese</option>  <option value="marshallese">Marshallese</option>  <option value="mauritanian">Mauritanian</option>  <option value="mauritian">Mauritian</option>  <option value="mexican">Mexican</option>  <option value="micronesian">Micronesian</option>  <option value="moldovan">Moldovan</option>  <option value="monacan">Monacan</option>  <option value="mongolian">Mongolian</option>  <option value="moroccan">Moroccan</option>  <option value="mosotho">Mosotho</option>  <option value="motswana">Motswana</option>  <option value="mozambican">Mozambican</option>  <option value="namibian">Namibian</option>  <option value="nauruan">Nauruan</option>  <option value="nepalese">Nepalese</option>  <option value="new zealander">New Zealander</option>  <option value="ni-vanuatu">Ni-Vanuatu</option>  <option value="nicaraguan">Nicaraguan</option>  <option value="nigerien">Nigerien</option>  <option value="north korean">North Korean</option>  <option value="northern irish">Northern Irish</option>  <option value="norwegian">Norwegian</option>  <option value="omani">Omani</option>  <option value="pakistani">Pakistani</option>  <option value="palauan">Palauan</option>  <option value="panamanian">Panamanian</option>  <option value="papua new guinean">Papua New Guinean</option>  <option value="paraguayan">Paraguayan</option>  <option value="peruvian">Peruvian</option>  <option value="polish">Polish</option>  <option value="portuguese">Portuguese</option>  <option value="qatari">Qatari</option>  <option value="romanian">Romanian</option>  <option value="russian">Russian</option>  <option value="rwandan">Rwandan</option>  <option value="saint lucian">Saint Lucian</option>  <option value="salvadoran">Salvadoran</option>  <option value="samoan">Samoan</option>  <option value="san marinese">San Marinese</option>  <option value="sao tomean">Sao Tomean</option>  <option value="saudi">Saudi</option>  <option value="scottish">Scottish</option>  <option value="senegalese">Senegalese</option>  <option value="serbian">Serbian</option>  <option value="seychellois">Seychellois</option>  <option value="sierra leonean">Sierra Leonean</option>  <option value="singaporean">Singaporean</option>  <option value="slovakian">Slovakian</option>  <option value="slovenian">Slovenian</option>  <option value="solomon islander">Solomon Islander</option>  <option value="somali">Somali</option>  <option value="south african">South African</option>  <option value="south korean">South Korean</option>  <option value="spanish">Spanish</option>  <option value="sri lankan">Sri Lankan</option>  <option value="sudanese">Sudanese</option>  <option value="surinamer">Surinamer</option>  <option value="swazi">Swazi</option>  <option value="swedish">Swedish</option>  <option value="swiss">Swiss</option>  <option value="syrian">Syrian</option>  <option value="taiwanese">Taiwanese</option>  <option value="tajik">Tajik</option>  <option value="tanzanian">Tanzanian</option>  <option value="thai">Thai</option>  <option value="togolese">Togolese</option>  <option value="tongan">Tongan</option>  <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>  <option value="tunisian">Tunisian</option>  <option value="turkish">Turkish</option>  <option value="tuvaluan">Tuvaluan</option>  <option value="ugandan">Ugandan</option>  <option value="ukrainian">Ukrainian</option>  <option value="uruguayan">Uruguayan</option>  <option value="uzbekistani">Uzbekistani</option>  <option value="venezuelan">Venezuelan</option>  <option value="vietnamese">Vietnamese</option>  <option value="welsh">Welsh</option>  <option value="yemenite">Yemenite</option>  <option value="zambian">Zambian</option>  <option value="zimbabwean">Zimbabwean</option>';
}
//------------------------------------------------------------------------- display appointment list + clinic profile ----------------------------------
function buildMyClinicCont(clinic) {
  if (!clinic)
    return;

  var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
  var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

  var aBtnEdit = $("<a/>").addClass("edtProfBtn btn-sm animated-button thar-one").append("<span/>").text(lns.getText('n30'));
  var aBtnUpdate = $("<a/>").addClass("updtProfBtn btn-sm animated-button thar-three").css({ "display": "none" }).append("<span/>").text(lns.getText('n31'));

  var col0 = $("<div/>").addClass("col-md-5");
  var col2 = $("<div/>").addClass("col-md-2");
  var col1 = $("<div/>").addClass("col-md-5");

  col0.append(headingEmpty1);
  col1.append(headingEmpty2);

  col2.append(aBtnUpdate);
  col2.append(aBtnEdit);

  var row0 = $("<div/>").addClass("row");
  row0.append(col0);
  row0.append(col1);
  row0.append(col2);

  var divider = $("<hr/>").addClass("sidebar-divider");

  var h2 = $("<h2/>").append("<span/>").text(lns.getText('n32'));
  var br0 = $("<br/>");
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src", "img/clinic1.jpg").attr("height", "150").attr("width", "150");

  var center = $("<center/>");
  var col_11_0 = $("<div/>").addClass("col-lg-4");
  center.append(h2);
  center.append(br0);

  center.append(img);
  col_11_0.append(center);

  var h2Info = $("<h2/>").append("<span/>").text(lns.getText('n33'));
  var br1 = $("<br/>");
  var col_11_1 = $("<div/>").addClass("col-lg-8");
  col_11_1.append(h2Info);
  col_11_1.append(br1);
  col_11_1.append(divider);
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n35'), clinic.name, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n23'), clinic.address, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n36'), clinic.location, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp", lns.getText('n14'), clinic.phone, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTextArea("profNameInp", lns.getText('n22'), clinic.about, 0));
  col_11_1.append(divider.clone());
  col_11_1.append(row0);


  var row2 = $("<div/>").addClass("row");
  row2.append(col_11_0);
  row2.append(col_11_1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row2);

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n34'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardShadow = $("<div/>").addClass(" shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-lg-6 mb-6");
  card.append(cardShadow);
  return card;
}
//appointment stuff
function buildAppointmentslistCard(appointments) {
  if (!appointments)
    return;

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n42'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(buildGenericSearch("searchAppointmentInList"));
  cardBody.append(br.clone());
  cardBody.append(br.clone());

  cardBody.append(appointmentListBody(appointments));

  var cardShadow = $("<div/>").addClass("card shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6 ");
  card.append(cardShadow);
  return card;
}
function appointmentListBody(appointments) {
  var a;
  var calendar = $("<div/>").addClass("container");
  var calBody = buildAppointmentListHeader();
  calendar.append(calBody);

  for (a in appointments) {
    var date = appointments[a].date.split("T");
    var time = date[1];
    time = time.split(".");
    time = time[0];
    date = date[0];

    var docName = 'Set by other clinic';
    var doctor = obj.getDoctor(appointments[a].doctor_id);
    if (doctor)
      docName = doctor.fname + "," + doctor.lname;

    var patName = 'unknown';
    var patient = obj.getPatient(appointments[a].patient_id);
    if (patient)
      patName = patient.fname + "," + patient.lname;


    var row = $("<div/>").addClass("row border-left border-right border-top border-grey").attr("appointment-Content", JSON.stringify(appointments[a]));
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + time + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + date + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate calendar_hov patCardClick' profileid='" + appointments[a].patient_id + "'><h4>" + patName + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate calendar_hov docCardClick' profileid='" + appointments[a].doctor_id + "'><h4>" + docName + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + appointments[a].specialty + "</h4></div>");
    row.append("<div class='col calendar_hov appCardClick' appointmentId='" + appointments[a].id + "' ><h4>" + lns.getText("n67") + "</h4></div>");
    calendar.append(row);
  }
  calendar.append("<div class=' row border-top border-grey'></div>");

  return calendar;
}
function buildAppointmentListHeader() {
  var calBody = $("<div/>").addClass("row border-left border-right border-top border-grey");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n37') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n26') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n40') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n39') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n38') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'></div>");
  return calBody;
}
//doc stuff
function buildDocListCard(doctors) {
  if (!doctors)
    return;

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n5'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(buildGenericSearch("searchDoctorInList"));
  cardBody.append(br.clone());
  cardBody.append(br.clone());

  cardBody.append(buildDoctorsListBody(doctors));

  var cardShadow = $("<div/>").addClass("card shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6");
  card.append(cardShadow);
  return card;
}
function buildDoctorsListBody(doctors) {
  var a;
  var calendar = $("<div/>").addClass("container");
  var calBody = buildDocListHeader();
  calendar.append(calBody);
  for (a in doctors) {
    var row = $("<div/>").addClass("row border-left border-right border-top border-grey").attr("docotor-content", JSON.stringify(doctors[a]));;
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + doctors[a].fname + "</div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + doctors[a].lname + "</div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + doctors[a].specialty + "</div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + doctors[a].address + "</div>");
    row.append("<div class='docCardClick col calendar_hov' profileid='" + doctors[a].id + "'><h4>" + lns.getText("n67") + "</h4></div>");
    calendar.append(row);
  }
  calendar.append("<div class=' row border-top border-grey'></div>");

  return calendar;
}
function buildDocListHeader() {
  var calBody = $("<div/>").addClass("row border-left border-right border-top border-grey");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n7') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n8') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n20') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n23') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'></div>");

  return calBody;
}
//patient stuff
function buildPatListCard(patients) {
  if (!patients)
    return;
  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n6'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(buildGenericSearch("searchPatientInList"));
  cardBody.append(br.clone());
  cardBody.append(br.clone());

  cardBody.append(buildPatListBody(patients));

  var cardShadow = $("<div/>").addClass("card shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6");
  card.append(cardShadow);
  return card;
}
function buildPatListBody(patients) {
  var a;
  var calendar = $("<div/>").addClass("container");
  var calBody = buildPatListHeader();
  calendar.append(calBody);
  for (a in patients) {
    var row = $("<div/>").addClass("row border-left border-right border-top border-grey").attr("patient-list-content", patients[a]);
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + patients[a].fname + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + patients[a].lname + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + patients[a].email + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + patients[a].nationality + "</h4></div>");
    row.append("<div class='patCardClick col calendar_hov' profileid='" + patients[a].id + "'> <h4>" + lns.getText("n67") + "</h4></div>");
    calendar.append(row);
  }
  calendar.append("<div class=' row border-top border-grey'></div>");

  return calendar;
}
function buildPatListHeader() {
  var calBody = $("<div/>").addClass("row border-left border-right border-top border-grey");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n7') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n8') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n9') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n41') + "</h4></div>");
  calBody.append("<div class='col border-right '></div>");


  return calBody;
}
//user list
function buildUsersListCard(clinicUsers) {
  if (!clinicUsers)
    return;

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n3'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(buildGenericSearch("searchUsersInList"));
  cardBody.append(br.clone());
  cardBody.append(br.clone());

  cardBody.append(buildUsersListBody(clinicUsers));

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-4");
  card.append(cardShadow);
  return card;
}
function buildUsersListHeader() {
  var calBody = $("<div/>").addClass("row border-left border-right border-top border-grey");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n7') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n8') + "</h4></div>");
  calBody.append("<div class='col border-right border-grey'><h4>" + lns.getText('n9') + "</h4></div>");
  calBody.append("<div class='col '></div>");


  return calBody;
}
function buildUsersListBody(clinicUsers) {
  var a;
  var calendar = $("<div/>").addClass("container");
  var calBody = buildUsersListHeader();
  calendar.append(calBody);
  for (a in clinicUsers) {
    var row = $("<div/>").addClass("row border-left border-right border-top border-grey").attr("user-list-Content", clinicUsers[a].fname + " " + clinicUsers[a].lname);
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + clinicUsers[a].fname + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + clinicUsers[a].lname + "</h4></div>");
    row.append("<div class='col border-right border-grey text-truncate'><h4>" + clinicUsers[a].email + "</h4></div>");
    //row.append("<div class='col border-right border-grey'><button uid='" + clinicUsers[a].id + "' class='dltUser btn btn-warning'>X</button></div>");
    row.append("<div profileid='" + clinicUsers[a].id + "' class='userCardClick col  calendar_hov'> <h4>" + lns.getText("n67") + "</h4> </div>");
    calendar.append(row);
  }
  calendar.append("<div class=' row border-top border-grey'></div>");

  return calendar;
}
function buildLog() {
  var logs = obj.getLogs();
  if (logs) {
    $("#notifications").html('<h6 class="dropdown-header">Alerts Center</h6>');
    for (var a in logs) {
      $("#notifications").append(addNotifications(logs[a]));
    }
  }
}
function clearAppointmentTime(doctor) {
  if (!doctor)
    return;

  var appointments = obj.getDocAppointments(doctor.id);
  if (!appointments)
    return;

  //clear all appointment time
  for (var a in appointments) {
    var time = appointments[a].date;
    time = time.split("T");
    time = time[1];
    time = time.split(":");
    var h = time[0];
    var h = parseInt(time[0]);
    var m = parseInt(time[1]);


    $('select[name="hour"] option[value="' + h + '"]').hide();

  }
  //clear all not avaliable time
}
function isDocc() {
  var isDoc = false;
  var user = localStorage.getItem('user');
  var user = JSON.parse(user);
  if (user.role == 4) { isDoc = true }
  return isDoc;
}




