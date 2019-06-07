import * as appo from './appCalender.js';
var socket = io();
socketInit();
$(document).ajaxStart(function() {
    // show loader on start
    $('#loadingIcon').show();
}).ajaxSuccess(function() {
    // hide loader on success
    $('#loadingIcon').hide();
});
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
export function socketInit() {
    //socket = io();
    socket.on('appointment added', function (msg) {
        getAppointments(function (appointments) {
            localStorage.setItem("appointments", JSON.stringify(appointments));
            alert('appointment added');
        });
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