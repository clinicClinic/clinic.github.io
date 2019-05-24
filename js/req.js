export function login(data,callback){
    $.ajax({
        url: "/login",
        type: "POST",
        data: data,
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function getClinic(callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token') ;
    $.ajax({
        url: "/clinic",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType:'application/json',
        success: function(result){
            callback(result);
        },
        error: function(data){
            localStorage.setItem('token','');
            location.reload();
        }
    });
}
export function getClinicUsers(callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token') ;
    $.ajax({
        url: "/clinic/users",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType:'application/json',
        success: function(result){
            callback(result);
        },
        error: function(data){
            localStorage.setItem('token','');
            location.reload();
        }
    });
}
export function getClinicPatients(callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token') ;
    $.ajax({
        url: "/clinic/getPatients",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType:'application/json',
        success: function(result){
            callback(result);
        },
        error: function(data){
            localStorage.setItem('token','');
            location.reload();
        }
    });
}
export function addUser(data,callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token') ;
    $.ajax({
        url: "/reg",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function addDoctor(data,callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addDoctor",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data: data,
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function getDoctors(callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getDoctors",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function getAppointments(callback){
    var user = localStorage.getItem('user');
    user = '{"user":'+user+'}';
    var bearerToken = 'bearer '+ localStorage.getItem('token');
    $.ajax({
        url: "/clinic/getAppointments",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data:user,
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function addAppointment(data,callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addAppointment",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        data:data,
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
}
export function addPatient(data,callback){
    var bearerToken = 'bearer '+ localStorage.getItem('token');
    $.ajax({
        url: "/clinic/addPatient",
        type: "POST",
        data: data,
        beforeSend: function(request) {
            request.setRequestHeader('authorization', bearerToken);
        },
        contentType:'application/json',
        success: function(result){
          callback(result);
        }
      });
     
}

