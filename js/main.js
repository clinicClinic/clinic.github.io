
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

import * as lns from './lanSelector.js';
import * as req from './req.js';
import * as appo from './appCalender.js';
import * as obj from './obj.js';

$(document).ready(function () {

  checkIfLoggedIn();
  var hd = buildHeader("dashBoardText,genRightBtnText");
  $("#main-body-header").append(hd);

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
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildDoctorProfile(id));
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
  });
  $(document).on("click", ".patCardClick", function () {
    $("#appendTopBox").html('');
    var id = $(this).attr('profileid');
    var appointments = obj.getPatAppointments(id);
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildPatientProfile(id));
    $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
  });
  $(document).on("click", ".appCardClick", function (event) {
    event.stopPropagation();
    $("#appendTopBox").html('');
    var id = $(this).attr('appointmentId');
    var appointment = obj.getAppointment(id);
    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(buildAppointmentCard(appointment));
  });
  $(document).on("click", ".toggleAppointmentCard", function (event) {
    event.stopPropagation();
    var patients = localStorage.getItem('patients');
    var docotors = localStorage.getItem('docotors');
    docotors = JSON.parse(docotors);
    patients = JSON.parse(patients);
    $("#appendTopBox").html('');
    $("#appendTopBox").append(buildAddAppointmentCard(patients, docotors, true));
    $("#appointmentModal").modal("show");

  });
  $(document).on("click", ".toggleAddDoctorModal", function (event) {

    $("#addDoctorModal").modal("show");
    event.stopPropagation();
  });
  $(document).on("click", ".minimizeBtn", function () {
    $(this).parent().parent().parent().next().slideToggle();
  });
  $(document).on("keyup", ".searchAppointmentInList", function () {
    var inp = $(this).val();
    $("[appointment-content]").each(function () {
      var appVal = $(this).attr("appointment-content");
      if (appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
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
  $(document).on("click", ".addNewUserBtn", function () {
    $("#appendTopBox").html('');
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    var cid = user.clinic_id;
    var err = false;
    var s = '{';
    $(".addNewUserInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name + '":"' + val + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    var user = localStorage.getItem('user');
    var data = '{"user":' + user + ',"nuser":' + s + '}';
    if (!err) {
      //send new user to server
      req.addUser(data, function (msg) {
        cAlert(msg);
        req.getClinicUsers(function (users) {
          localStorage.setItem('users', JSON.stringify(users));
          location.reload();
        });
      })
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".loginBtn", function () {
    var err = false;
    var s = '{';
    $(".loginInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name.toLowerCase() + '":"' + val + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    if (!err) {
      //send user info to server
      req.login(s, function (token) {
        var tmp = token.split(" ");
        localStorage.setItem('user', tmp[1]);
        localStorage.setItem("token", token);
        checkIfLoggedIn();
      });
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".addNewDocBtn", function () {
    var err = false;
    var s = '{';
    $(".addNewDocInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name.toLowerCase() + '":"' + val.toLowerCase() + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    if (!err) {
      var user = localStorage.getItem('user');
      var data = '{"user":' + user + ',"doctor":' + s + '}';
      //send user info to server
      req.addDoctor(data, function (res) {
        cAlert(res);
        req.getDoctors(function (doctors) {
          req.getClinicUsers(function (users) {
            localStorage.setItem('doctors', JSON.stringify(doctors));
            localStorage.setItem('users', JSON.stringify(users));
            location.reload();
          });
        });
      });
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".addNewPatBtn", function () {
    var err = false;
    var s = '{';
    $(".addNewPatInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name.toLowerCase() + '":"' + val.toLowerCase() + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    if (!err) {
      var data = '{"patient":' + s + '}';
      //send user info to server
      req.addPatient(data, function (res) {
        cAlert(res);
        req.getClinicPatients(function (patients) {
          localStorage.setItem('patients', JSON.stringify(patients));
          location.reload();
        });
      });
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".addNewAppBtn", function () {
    var err = false;
    var s = '{';
    $(".addNewAppInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name.toLowerCase() + '":"' + val.toLowerCase() + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    var user = localStorage.getItem('user');
    if (!err) {
      var data = '{"user":' + user + ',"appointment":' + s + '}';
      //send user info to server
      req.addAppointment(data, function (res) {
        cAlert(res);
        req.getAppointments(function (appointments) {
          localStorage.setItem('appointments', JSON.stringify(appointments));
          location.reload();
        });
      });
    } else {
      cAlert('Empty Field');
    }
  });
  $(document).on("click", ".logOutBtn", function () {
    localStorage.setItem("token", "");
    checkIfLoggedIn();
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
    var id = $(this).attr('uid');
    var data = '{"id":' + id + '}';
    req.deleteUser(data, function () {
      req.getClinicUsers(function (users) {
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
      });
    });
  });
  $(document).on("click", ".edtAppointmentShow", function () {
    var id = $(this).attr("aid");
    var appointment = obj.getAppointment(id);
    var doctors = localStorage.getItem('doctors');
    var patients = localStorage.getItem('patients');
    patients = JSON.parse(patients);
    doctors = JSON.parse(doctors);
    buildEditAppointmentCard(appointment, patients, doctors);

  });
  $(document).on("click", ".editAppInpBtn", function () {

    var id = $(this).attr("aid");
    var err = false;
    var s = '{';
    $(".editAppInp").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      if (name == '' || val == '') {
        err = true;
        // keep checking ??;
      }
      s += '"' + name.toLowerCase() + '":"' + val.toLowerCase() + '",';
    });
    s = s.substring(0, s.length - 1);
    s += '}';
    var user = localStorage.getItem('user');
    if (!err) {
      var data = '{"user":' + user + ',"appointment":' + s + '}';
      //send user info to server
      req.editAppointment(data, function (res) {
        cAlert(res);
        req.getAppointments(function (appointments) {
          localStorage.setItem('appointments', JSON.stringify(appointments));
        });
      });
    } else {
      cAlert('Empty Field');
    }
  });


});
function checkIfLoggedIn() {
  $("#appendTopBox").html('');
  var tokenTemp = localStorage.getItem("token");
  if (tokenTemp == '' || !tokenTemp) {
    $("#contentFirstRow").html(buildLoginCard());
    $("#sideBar").html('');
    console.log("not logged in ");
  }
  else {
    displayCont();
  }
}
function displayCont() {
  var user = localStorage.getItem('user');
  var user = JSON.parse(user);
  $("#userName").text(user.fname + " " + user.lname);
  buildSideBarItems();
  transTab("clnd");
}
function transTab(nxt) {
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
      appo.rend();
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
  });

}
function checkFields() {
}
function cAlert(msg) {
  var alert = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  $("#alertRow").html(alert);
}
//------------------------------------------------------ renders page component based on the clicked menu item
function doctorsCont() {
  var doctors = localStorage.getItem('doctors');
  doctors = JSON.parse(doctors);
  var a;
  if (doctors) {
    for (a in doctors) {
      $("#contentFirstRow").append(buildDoctorCard(doctors[a].id, doctors[a].fname, doctors[a].fname + ' ' + doctors[a].lname));
    }
  }
}
function patintCont() {
  var patients = localStorage.getItem('patients');
  var a;
  if (patients) {
    patients = JSON.parse(patients);
    for (a in patients) {
      $("#contentFirstRow").append(buildPatientCard(patients[a].id, patients[a].fname, patients[a].fname + ' ' + patients[a].lname));
    }
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
  $('#loadingIcon').show('');
  var clinic = localStorage.getItem('clinic');
  var doctors = localStorage.getItem('doctors');
  var patients = localStorage.getItem('patients');
  var appointments = localStorage.getItem('appointments');
  clinic = JSON.parse(clinic);
  doctors = JSON.parse(doctors);
  patients = JSON.parse(patients);
  appointments = JSON.parse(appointments);
  $("#contentFirstRow").append(buildAddAppointmentCard(patients, doctors, false));
  $("#contentFirstRow").append(buildAppointmentslistCard(appointments));
  $("#contentFirstRow").append(buildMyClinicCont(clinic));
  $("#contentFirstRow").append(buildDocListCard(doctors));
  $("#contentFirstRow").append(buildPatListCard(patients));
  $("#contentFirstRow").append(buildAddPaitentCard());
  $("#contentFirstRow").append(buildAddDoctorCard1());
  $('#loadingIcon').hide();
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
//---------------------------------------------------- render helpers
function addChart(id) {
  reqCount = [34, 65, 76, 35, 12, 67, 23, 65, 78, 23, 56];
  provCount = [67, 23, 65, 78, 23, 56, 34, 65, 76, 35, 12];
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

  // v= '<div class="col-xl-3 col-md-6 mb-4">\
  //            <div class="card border-left-'+color+' shadow h-100 py-2">\
  //              <div class="card-body">\
  //                <div class="row no-gutters align-items-center">\
  //                  <div class="col mr-2">\
  //                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">'+title+'</div>\
  //                    <div class="h5 mb-0 font-weight-bold text-gray-800">'+numb+'</div>\
  //                  </div>\
  //                  <div class="col-auto">\
  //                    <i class="fas '+ symbol +' fa-2x text-gray-300"></i>\
  //                  </div>\
  //                </div>\
  //              </div>\
  //            </div>\
  //          </div>';

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
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
  var elm3 = $('<div/>').addClass("d-sm-flex align-items-center justify-content-between mb-4");
  elm3.append(elm2);
  elm3.append(elm1);

  return elm3;

}
function buildDoctorProfile(id) {
  var doctor = obj.getDoctor(id);
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
  var card = $("<div/>").addClass("col-lg-12 mb-12");
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

  var cardBody = $("<div/>").addClass("card-body").attr("style", "display:none");
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
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n20') + '</label><input name="specialty" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n23') + '</label><input name="address" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n21') + '</label><input name="nationality" class="addNewDocInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n24') + '</label><input name="birth_date" class="addNewDocInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n48') + '</label><input name="gender" class="addNewDocInp form-control col-sm-3"></div>');
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

  var cardBody = $("<div/>").addClass("card-body").attr("style", "display:none");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n7') + '</label><input name="fname" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n8') + '</label><input name="lname" class="addNewPatInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n9') + '</label><input name="email" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n13') + '</label><input name="reEmail" class="addNewPatInp form-control col-sm-3"></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n14') + '</label><input name="phone" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n23') + '</label><input name="address" class="addNewPatInp form-control col-sm-3">');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-3 col-form-label">' + lns.getText('n21') + '</label><input name="nationality" class="addNewPatInp form-control col-sm-3"><label class="col-sm-3 col-form-label">' + lns.getText('n24') + '</label><input name="birth_date" class="addNewPatInp form-control col-sm-3">');
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
              localStorage.setItem('clinic', JSON.stringify(clinic));
              localStorage.setItem('doctors', JSON.stringify(doctors));
              localStorage.setItem('patients', JSON.stringify(patients));
              localStorage.setItem('appointments', JSON.stringify(appointments));
              localStorage.setItem('users', JSON.stringify(users));
              callback();
            });
          });
        });
      });
    });
  }
}
//------------------------------------------------------------------------ appointment related functions 
function buildEditAppointmentCard(appointment, patients, doctors) {
  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n25'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");

  var m = dropDwons('m', "editAppInp");
  var y = dropDwons('y', "editAppInp");
  var d = dropDwons('d', "editAppInp");
  var h = dropDwons('h', "editAppInp");
  var mn = dropDwons('mn', "editAppInp");

  cardBody.append(br);
  cardBody.append(buildDoctorAndPatientOption(patients, doctors, "editAppInp"));
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label>' + d + '' + m + '' + y + '</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label>' + h + '<label class="col-sm-1 col-form-label">Hour</label>' + mn + '<label class="col-sm-2 col-form-label">Minutes</label></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><select  name="specialty" class="editAppInp form-control col-sm-3">' + specOptions() + '</select</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n16') + '</label><button  class="editAppInpBtn btn btn-success">' + lns.getText('n31') + '</button></div>');


  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-12 mb-12 ");
  card.append(cardShadow);

  var modal = $("<div/>").addClass("modal fade").attr('id', 'editAppointmentModal');
  var modalDialog = $("<div/>").addClass("modal-dialog modal-lg");
  var modalCon = $("<div/>").addClass("modal-content");
  var modalBody = $("<div/>").addClass("modal-body");
  modalBody.append(card);
  modalCon.append(modalBody);
  modalDialog.append(modalCon);
  modal.append(modalDialog);

  $("#appendTopBox").html("");
  $("#appendTopBox").append(modal);
  setFlds(appointment);
  $("#editAppointmentModal").modal("show");
}
function buildAddAppointmentCard(patients, doctors, isModal) {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n25'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");

  var m = dropDwons('m', "addNewAppInp");
  var y = dropDwons('y', "addNewAppInp");
  var d = dropDwons('d', "addNewAppInp");
  var h = dropDwons('h', "addNewAppInp");
  var mn = dropDwons('mn', "addNewAppInp");

  cardBody.append(br);
  cardBody.append(buildDoctorAndPatientOption(patients, doctors, "addNewAppInp"));
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label>' + d + '' + m + '' + y + '</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label>' + h + '<label class="col-sm-2 col-form-label">Hour</label>' + mn + '<label class="col-sm-2 col-form-label">Minutes</label></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><select  name="specialty" class="addNewAppInp form-control col-sm-3">' + specOptions() + '</select</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n27') + '</label><textarea  name="comment" class="addNewAppInp form-control col-sm-10"></textarea></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n16') + '</label><button class="addNewAppBtn btn btn-success">' + lns.getText('n58') + '</button></div>');

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);



  if (isModal) {
    var card = $("<div/>").addClass("col-lg-12 mb-12 ");
    card.append(cardShadow);
    var modal = $("<div/>").addClass("modal fade").attr('id', 'appointmentModal');
    var modalDialog = $("<div/>").addClass("modal-dialog modal-lg");
    var modalCon = $("<div/>").addClass("modal-content");
    var modalBody = $("<div/>").addClass("modal-body");
    modalBody.append(card);
    modalCon.append(modalBody);
    modalDialog.append(modalCon);
    modal.append(modalDialog);
    return modal;

  }
  else {
    var card = $("<div/>").addClass("col-lg-6 mb-6 mb-4");
    card.append(cardShadow);
    return card;
  }
}
function buildAppointmentCard(appointment) {
  if (!appointment)
    return;

  var date = appointment.date.split("T");
  var time = date[1];
  time = time.split(".");
  time = time[0];
  date = date[0];

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n50'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var divider = $("<hr/>").addClass("sidebar-divider");
  var br = $("<br/>");
  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n39') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + appointment.doctor.fname + ',' + appointment.doctor.lname + '</label>\
                                    <label class="col-sm-2 col-form-label">' + lns.getText('n40') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + appointment.patient.fname + ',' + appointment.patient.lname + '</label>\
                                    <label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + time + '</label>\
                    </div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + date + '</label>\
                                  <label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + appointment.specialty + ' </label>\
                                  <label class="col-sm-2 col-form-label">' + lns.getText('n49') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + appointment.user.fname + ',' + appointment.user.lname + '</label>\
                  </div>');
  cardBody.append(divider.clone());
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n27') + '</label><label class="col-sm-2 col-form-label mdl-color-text--teal-500">' + appointment.comment + '</label></div>');

  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label"></label><textarea  name="comment" class="addNewAppInp form-control col-sm-8"></textarea><button class=" btn btn-success">' + lns.getText('n58') + '</button></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label"></label><button aid="' + appointment.id + '" class="edtAppointmentShow btn btn-warning">' + lns.getText('n30') + '</button></div>');

  var cardShadow = $("<div/>").addClass(" shadow mb-4");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("col-lg-12 mb-12");
  card.append(cardShadow);
  return card;
}
function dropDwons(menue, inp) {

  var m = '<select name="month" class="' + inp + ' form-control col-sm-4">';
  for (var i = 0; i < 12; i++) {
    m += '<option value="' + (i + 1) + '">' + months[i + 1] + '</option>';
  }
  m += '</select>';

  var y = '<select name="year" class="' + inp + ' form-control col-sm-4">';
  for (var i = 2019; i < 2025; i++) {
    y += '<option value="' + i + '">' + i + '</option>';
  }
  y += '</select>';

  var d = '<select name="day" class="' + inp + ' form-control col-sm-2">';
  for (var i = 0; i < 31; i++) {
    d += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
  }
  d += '</select>';

  var h = '<select name="hour" class="' + inp + ' form-control col-sm-2">';
  for (var i = 0; i < 24; i++) {
    h += '<option value="' + i + '">' + i + '</option>';
  }
  h += '</select>';

  var mn = '<select name="minutes" class="' + inp + ' form-control col-sm-2">';
  for (var i = 0; i < 60; i += 10) {
    mn += '<option value="' + i + '">' + i + '</option>';
  }
  mn += '</select>';

  if (menue == "m")
    return m;
  else if (menue == "y")
    return y;
  else if (menue == "d")
    return d;
  else if (menue == "h")
    return h;
  else if (menue == "mn")
    return mn;
}
function buildDoctorAndPatientOption(patients, doctors, inp) {
  var res = '<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n39') + '</label><select name="doctor" class="' + inp + ' form-control col-sm-4" >';
  for (var a in doctors) {
    res += '<option value="' + doctors[a].id + '">' + doctors[a].fname + ',' + doctors[a].lname + '</option>';
  }
  res += '</select><label class="col-sm-2 col-form-label">' + lns.getText('n40') + '</label><select name="patient" class="' + inp + ' form-control col-sm-4">';
  for (var a in patients) {
    res += '<option value="' + patients[a].id + '">' + patients[a].fname + ',' + patients[a].lname + '</option>';
  }
  res += '</select>';
  return res;
}
function setFlds(appointment) {
  var tempDate = appointment.date.split("T");
  var time = tempDate[1].split(':');
  tempDate = tempDate[0].split('-');
  var year = parseInt(tempDate[0]);
  var month = parseInt(tempDate[1]);
  var day = parseInt(tempDate[2]);

  var hour = parseInt(time[0]);
  var minutes = parseInt(time[1]);

  $(".editAppInp[name='doctor']").val(appointment.doctor_id);
  $(".editAppInp[name='patient']").val(appointment.patient_id);

  $(".editAppInp[name='day']").val(day);
  $(".editAppInp[name='month']").val(month);
  $(".editAppInp[name='year']").val(year);

  $(".editAppInp[name='hour']").val(hour);
  $(".editAppInp[name='minutes']").val(minutes);

  $(".editAppInp[name='specialty']").val(appointment.specialty);

}
function specOptions() {
  return '<option value="dermatology (skin)">Dermatology (Skin)</option> <option value="dentistry (teeth)">Dentistry (Teeth)</option> <option value="psychiatry">Psychiatry</option> <option value="pediatrics">Pediatrics</option> <option value="neurology">Neurology</option> <option value="orthopedics">Orthopedics</option> <option value="gynecology and infertility">Gynecology and Infertility</option> <option value="ear">Ear</option> <option value="nose and throat">Nose and Throat</option> <option value="cardiology and vascular ">Cardiology and Vascular </option> <option value="allergy">Allergy</option> <option value="androgyny">Androgyny</option> <option value="audiology">Audiology</option> <option value="cardiology">Cardiology</option> <option value="chest and respiratory">Chest and Respiratory</option> <option value="diabetes and rndocrinology">Diabetes and Endocrinology</option> <option value="diagnostic ">Diagnostic </option> <option value="radiology">Radiology</option> <option value="dietitian and nutrition">Dietitian and Nutrition</option> <option value="elders">Elders</option>';
}
//-------------------------------------------------------------------------my clinic related functions display appointment list + clinic profile ----------------------------------
function buildMyClinicCont(clinic) {
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

  var cardBody = $("<div/>").addClass("card-body").attr("style", "display:none");
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
  var calendar = $("<div/>").addClass("calendar");
  var calBody = buildAppointmentListHeader();
  calendar.append(calBody);

  for (a in appointments) {
    var date = appointments[a].date.split("T");
    var time = date[1];
    time = time.split(".");
    time = time[0];
    date = date[0];
    var patient = obj.getDoctor(appointments[a].doctor_id);
    var doctor = obj.getPatient(appointments[a].patient_id);
    var emptDiv = $("<div/>").addClass("appointment_list_body").attr("appointment-Content", JSON.stringify(appointments[a]));
    emptDiv.append("<div class='appointment_list_side calendar_hov appCardClick' appointmentId='" + appointments[a].id + "' ><div/>");
    emptDiv.append("<div class='appointment_list_box'>" + time + "<div/>");
    emptDiv.append("<div class='appointment_list_box'>" + date + "<div/>");
    emptDiv.append("<div class='appointment_list_box calendar_hov patCardClick' profileid='" + appointments[a].patient_id + "'>" + patient.fname + "," + patient.lname + "<div/>");
    emptDiv.append("<div class='appointment_list_box calendar_hov docCardClick' profileid='" + appointments[a].doctor_id + "'>" + doctor.fname + "," + doctor.lname + "<div/>");
    emptDiv.append("<div class='appointment_list_box_last'>" + appointments[a].specialty + "<div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}
function buildAppointmentListHeader() {
  var calBody = $("<div/>").addClass("appointment_list_body");
  calBody.append("<div class='appointment_list_box_first_row'><div/>");
  calBody.append("<div class='appointment_list_box_first_row'>" + lns.getText('n37') + "<div/>");
  calBody.append("<div class='appointment_list_box_first_row'>" + lns.getText('n26') + "<div/>");
  calBody.append("<div class='appointment_list_box_first_row'>" + lns.getText('n39') + "<div/>");
  calBody.append("<div class='appointment_list_box_first_row'>" + lns.getText('n40') + "<div/>");
  calBody.append("<div class='appointment_list_box_first_last'>" + lns.getText('n38') + "<div/>");
  return calBody;
}
//doc stuff
function buildDocListCard(doctors) {
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

  var cardBody = $("<div/>").addClass("card-body").attr("style", "display:none");
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
  var calendar = $("<div/>").addClass("calendar");
  var calBody = buildDocListHeader();
  calendar.append(calBody);
  for (a in doctors) {
    var emptDiv = $("<div/>").addClass("doctor_list_body").attr("docotor-content", JSON.stringify(doctors[a]));;
    emptDiv.append("<div class='docCardClick doctor_list_side calendar_hov' profileid='" + doctors[a].id + "'><div/>");
    emptDiv.append("<div class='doctor_list_box'>" + doctors[a].fname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + doctors[a].lname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + doctors[a].specialty + "<div/>");
    emptDiv.append("<div class='doctor_list_box_last'>" + doctors[a].address + "<div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}
function buildDocListHeader() {
  var calBody = $("<div/>").addClass("doctor_list_body");
  calBody.append("<div class='doctor_list_box_first_row'><div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n7') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n8') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n20') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n23') + "<div/>");

  return calBody;
}
//patient stuff
function buildPatListCard(patients) {
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

  var cardBody = $("<div/>").addClass("card-body").attr("style", "display:none");
  var br = $("<br/>");
  cardBody.append(br);
  cardBody.append(buildGenericSearch("searchDoctorInList"));
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
  var calendar = $("<div/>").addClass("calendar");
  var calBody = buildPatListHeader();
  calendar.append(calBody);
  for (a in patients) {
    var emptDiv = $("<div/>").addClass("doctor_list_body").attr("patient-content", patients[a]);
    emptDiv.append("<div class='patCardClick doctor_list_side calendar_hov' profileid='" + patients[a].id + "'><div/>");
    emptDiv.append("<div class='doctor_list_box'>" + patients[a].fname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + patients[a].lname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + patients[a].email + "<div/>");
    emptDiv.append("<div class='doctor_list_box_last'>" + patients[a].nationality + "<div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}
function buildPatListHeader() {
  var calBody = $("<div/>").addClass("doctor_list_body");
  calBody.append("<div class='doctor_list_box_first_row'><div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n7') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n8') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n9') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n41') + "<div/>");

  return calBody;
}
//user list
function buildUsersListCard(clinicUsers) {

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
  var calBody = $("<div/>").addClass("doctor_list_body");
  calBody.append("<div class='doctor_list_box_first_row'><div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n7') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n8') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>" + lns.getText('n9') + "<div/>");
  calBody.append("<div class='doctor_list_box_first_row'>--<div/>");

  return calBody;
}
function buildUsersListBody(clinicUsers) {
  var a;
  var calendar = $("<div/>").addClass("calendar");
  var calBody = buildUsersListHeader();
  calendar.append(calBody);
  for (a in clinicUsers) {
    var emptDiv = $("<div/>").addClass("doctor_list_body").attr("doctors-list-Content", clinicUsers[a].id);
    emptDiv.append("<div class='docCardClick doctor_list_side calendar_hov'><div/>");
    emptDiv.append("<div class='doctor_list_box'>" + clinicUsers[a].fname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + clinicUsers[a].lname + "<div/>");
    emptDiv.append("<div class='doctor_list_box'>" + clinicUsers[a].email + "<div/>");
    emptDiv.append("<div class='doctor_list_box_last'><button uid='" + clinicUsers[a].id + "' class='dltUser btn btn-warning'>X</button><div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}



function buildEditAppointmentCard2(appointment, patients, doctors) {

  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n25'));
  var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
  col10.append(headerH4);
  col2.append(minimize);

  var cardheader = $("<div/>").addClass(" card-header py-3");
  row.append(col10);
  row.append(col2);
  cardheader.append(row);

  var cardBody = $("<div/>").addClass("card-body");
  var br = $("<br/>");

  var m = dropDwons('m', "editAppInp");
  var y = dropDwons('y', "editAppInp");
  var d = dropDwons('d', "editAppInp");
  var h = dropDwons('h', "editAppInp");
  var mn = dropDwons('mn', "editAppInp");

  cardBody.append(br);
  cardBody.append(buildDoctorAndPatientOption(patients, doctors, "editAppInp"));
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label>' + d + '' + m + '' + y + '</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label>' + h + '<label class="col-sm-1 col-form-label">Hour</label>' + mn + '<label class="col-sm-2 col-form-label">Minutes</label></div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><select  name="specialty" class="editAppInp form-control col-sm-3">' + specOptions() + '</select</div>');
  cardBody.append(br.clone());
  cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n16') + '</label><button  class="editAppInpBtn btn btn-success">' + lns.getText('n31') + '</button></div>');


  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-6 mb-6 mb-4");
  card.append(cardShadow);
  $("#appendTopBox").html("");
  $("#appendTopBox").append(card);
  setFlds(appointment);
}




