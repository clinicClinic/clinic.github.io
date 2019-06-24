import * as appo from './appCalender.js';
import * as obj from './obj.js';

var audio = new Audio('sounds/notification.mp3');
audio.volume = 0.6;
// var socket = io();
// socketInit();

$(document).ajaxStart(function() {
    // show loader on start
    $('#loadingIcon').show();
}).ajaxSuccess(function() {
    // hide loader on success
    $('#loadingIcon').hide();
});
// mobileTest();
// function mobileTest(){
//     var bearerToken = 'bearer ' + localStorage.getItem('token');
//     $.ajax({
//         url: "/mobile/addAppointment",
//         type: "POST",
//         beforeSend: function (request) {
//             request.setRequestHeader('authorization', bearerToken);
//         },
//         data: '{"appointment":{"specialty":"dentistry","doctor_id":"3","clinic_id":"1","patient_id":"41","date":"2019-5-24 2:00"}}',
//         contentType: 'application/json',
//         success: function (result) {
//             callback(result);
//         },
//         statusCode: {
//             403: function () {
//                 localStorage.clear();
//                 location.reload();
//             }
//         }
//     });
// }
export function login(data, callback) {
    $.ajax({
        url: "/login",
        type: "POST",
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        }
    });
}
export function test(callback) {
    $.ajax({
        url: "/test",
        type: "POST",
        contentType: 'application/json',
        success: function (result) {
            
        }
    });
}
export function getClinic(callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        error: function (data) {
            localStorage.localStorage.setItem('token', '');
            location.reload();
        }
    });
}
export function getClinicUsers(callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/users",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        error: function (data) {
            localStorage.localStorage.setItem('token', '');
            location.reload();
        }
    });
}
export function getClinicPatients(callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getPatients",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        error: function (data) {
            localStorage.localStorage.setItem('token', '');
            location.reload();
        }
    });
}
export function getDocLogs(callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    var user = localStorage.getItem('user');
    var user = '{"user":' + user + '}';
    $.ajax({
        url: "/clinic/getDocLogs",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data:user,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        error: function (data) {
            localStorage.localStorage.setItem('token', '');
            location.reload();
        }
    });
}
export function addUser(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/reg",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function addDoctor(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addDoctor",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function getDoctors(callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getDoctors",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function getAppointments(callback) {
    var user = localStorage.getItem('user');
    user = '{"user":' + user + '}';
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getAppointments",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: user,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
            }
        }
    });
}
export function getDocAppointments(callback) {
    var user = localStorage.getItem('user');
    user = '{"user":' + user + '}';
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getDocAppointments",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: user,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
            }
        }
    });
}
export function addAppointment(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addAppointment",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function addPatient(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addPatient",
        type: "POST",
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });

}
export function deleteUser(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/deleteUser",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback();
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function removeLog(data, callback) {
    data = '{"lid":"'+data+'"}';
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/removeLog",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback();
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function editAppointment(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/editAppointment",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function changeAppointmentStat(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/changeAppointmentStat",
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function integratePatient(data, callback) {
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/integratePatient",
        type: "POST",
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function updateDoctor(data,callback){
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/updateDoctor",
        type: "POST",
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
export function updateAppointmentDrugs(data,callback){
    var bearerToken = 'bearer ' + localStorage.getItem('token');
    $.ajax({
        url: "/clinic/updateAppointmentDrugs",
        type: "POST",
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType: 'application/json',
        success: function (result) {
            callback(result);
        },
        statusCode: {
            403: function () {
                localStorage.clear();
                location.reload();
            }
        }
    });
}
//------------------------------------------------------ socket io listeners
export function socketInit() {
    var token =  localStorage.getItem('token');
    var socket = io({query: {token: token}});
    socket.on('appointment added', function (msg) {
        getAppointments(function (appointments) {
            localStorage.setItem("appointments", JSON.stringify(appointments));
            getDocLogs(function(logs){
                buildLog();
                audio.play();            
            });
        });
    });
    socket.on('state changed', function (msg) {
        getDocAppointments(function (appointments) {
            localStorage.setItem("appointments", JSON.stringify(appointments));
            getDocLogs(function(logs){
            localStorage.setItem("logs", JSON.stringify(logs));
            buildLog();    
            audio.play();            
            });
        });
    });
}

function buildLog() {
    $("#notifications").html("");
    var logs = obj.getLogs();
    if (logs) {
      for (var a in logs) {
        $("#notifications").append(addNotifications(logs[a]));
      }
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
            <div class="row"><div class="col-md-10"><div class="small text-gray-500">Today:just now</div></div><div class="col-md-2"><lable lid="'+log.id+'"class="removeLog clickable pull-right">X</lable></div></div>\
            <span class="font-weight-bold">'+ log.cont + '</span>\
            </div>\
        </a>';
}