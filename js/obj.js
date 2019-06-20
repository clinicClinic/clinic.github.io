export function getPatient(id){
    var patients = localStorage.getItem('patients');
    patients = JSON.parse(patients);
    var a;
    if(patients){
        for(a in patients){
            if(patients[a].id==id)
                return patients[a];
        }
    } 
}
export function getDoctor(id){
    var doctors = localStorage.getItem('doctors');
    doctors = JSON.parse(doctors);
    var a;
    if(doctors){
        for(a in doctors){
            if(doctors[a].id==id)
                return doctors[a];
        }
    } 
}
export function getUser(id){
    var users = localStorage.getItem('users');
    users = JSON.parse(users);
    var a;
    if(users){
        for(a in users){
            if(users[a].id==id)
                return users[a];
        }
    } 
}
export function getPatAppointments(id){
    var appointments = localStorage.getItem('appointments');
    appointments = JSON.parse(appointments);
    var tempApp = [];
    var a;
    if(appointments){
        for(a in appointments){
            if(appointments[a].patient_id==id){
                tempApp.push(appointments[a]);
            }
        }
        return tempApp;
    }   
}
export function getDocAppointments(id){
    var appointments = localStorage.getItem('appointments');
    appointments = JSON.parse(appointments);
    var tempApp = [];
    var a;
    if(appointments){
        for(a in appointments){
            if(appointments[a].doctor_id==id){
                tempApp.push(appointments[a]);
            }
        }
        return tempApp;
    }   
}

export function getDocBySpec(spec){
    var doctors = localStorage.getItem('doctors');
    doctors = JSON.parse(doctors);
    var tempDocs = [];
    var a;
    if(doctors){
        for(a in doctors){
            if(doctors[a].specialty==spec){
                tempDocs.push(doctors[a]);
            }
        }
        return tempDocs;
    }   
}
export function getAppointment(id){
    var appointments = localStorage.getItem('appointments');
    appointments = JSON.parse(appointments);
    var a;
    if(appointments){
        for(a in appointments){
            if(appointments[a].id==id){
                var tempApp = appointments[a];
                tempApp["patient"] = getPatient(appointments[a].patient_id);
                tempApp["doctor"] = getDoctor(appointments[a].doctor_id);
                tempApp["user"] = getUser(appointments[a].added_by);
                return tempApp;
            }
        }
    }
}