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
    console.log(doctors);
    if(doctors){
        for(a in doctors){
            if(doctors[a].id==id)
                return doctors[a];
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