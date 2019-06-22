 //-------------------------------------------
  // $(document).on("click", ".appCardClick", function (event) {
  //   event.stopPropagation();
  //   $("#appendTopBox").html('');
  //   var id = $(this).attr('appointmentId');
  //   var appointment = obj.getAppointment(id);
  //   $("#contentFirstRow").html("");
  //   $("#contentFirstRow").append(buildAppointmentCard(appointment));
  // });
  // $(document).on("click", ".toggleAppointmentCard", function (event) {
  //   event.stopPropagation();
  //   var patients = localStorage.getItem('patients');
  //   var doctors = localStorage.getItem('doctors');
  //   doctors = JSON.parse(doctors);
  //   patients = JSON.parse(patients);
  //   $("#appendTopBox").html('');
  //   $("#appendTopBox").append(buildAddAppointmentCard(patients, doctors, true));
  //   $("#appointmentModal").modal("show");

  //   var data = $(this).attr('app-data');
  //   // console.log(data);
  //   addAppointmentFields(JSON.parse(data));
  // });
  // $(document).on("keyup", ".searchAppointmentInList", function () {
  //   var inp = $(this).val();
  //   $("[appointment-content]").each(function () {
  //     var appVal = $(this).attr("appointment-content");
  //     if (appVal.indexOf(inp) !== -1)
  //       $(this).show();
  //     else
  //       $(this).hide();
  //   });
  // });
  // $(document).on("click", ".edtAppointmentShow", function () {
  //   var id = $(this).attr("aid");
  //   var appointment = obj.getAppointment(id);
  //   var doctors = localStorage.getItem('doctors');
  //   var patients = localStorage.getItem('patients');
  //   patients = JSON.parse(patients);
  //   doctors = JSON.parse(doctors);
  //   appoointmnet.buildEditAppointmentCard(appointment, patients, doctors);

  // });
  // $(document).on("click", ".editAppInpBtn", function () {
  //   var data = constructData(".editAppInp");
  //   if (data == "error")
  //     return;

  //   var user = localStorage.getItem('user');
  //   data = '{"user":' + user + ',"appointment":' + data + '}';

  //   //send user info to server
  //   req.editAppointment(data, function (res) {
  //     cAlert(res);
  //     req.getAppointments(function (appointments) {
  //       localStorage.setItem('appointments', JSON.stringify(appointments));

  //       $('#editAppointmentModal').modal('hide');
  //       var id = $(this).attr('appointmentId');
  //       var appointment = obj.getAppointment(id);
  //       $("#contentFirstRow").html("");
  //       $("#contentFirstRow").append(buildAppointmentCard(appointment));
  //       $("#editAppointmentModal").modal("hide");
  //     });
  //   });
  // });
  // $(document).on("change", ".addAppDocSelct", function () {
  //   // var docId = $(this).val();
  //   // $('select[name="hour"]').val("");
  //   // $('select[name="minutes"]').val("");

  //   // if(docId!=""){
  //   //   var doctor = obj.getDoctor(docId);
  //   //   clearAppointmentTime(doctor);
  //   // }
  //   // else{
  //   //   $('select[name="hour"] option').show();
  //   //   $('select[name="minutes"] option').show();
  //   // }
  // });
  // $(document).on("click", ".addMoreDrug", function () {
  //   $(this).parent().parent().append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n71") + '</label> <input class="isDrug form-control col-sm-3"><label class="col-sm-2 col-form-label">' + lns.getText("n27") + '</label> <input name="count" class=" form-control col-sm-3"><button class="removeDrug  btn btn-danger">X</button></div><br>');
  // });
  // $(document).on("click", ".removeDrug", function () {
  //   $(this).parent().remove();
  // });
  // $(document).on("click", ".editDrugsBtn", function () {
  //   $(".noneEditableDrugs").hide();
  //   $(this).hide();
  //   $(".editableDrugs").show();
  //   $(".addMoreDrug").show();
  //   $(".addDrugBtn").show();
  // });
  // $(document).on("click", ".addDrugBtn", function () {
  //   var id = $(this).attr("aid");
  //   var data = '{"id":"' + id + '","drugs":' + getEditAppointmentDrugs() + '}';
  //   console.log(data);
  //   req.updateAppointmentDrugs(data, function (msg) {
  //     cAlert(msg);
  //     req.getDocAppointments(function (appointments) {
  //       localStorage.setItem('appointments', JSON.stringify(appointments));
  //       buildAppointmentCard(obj.getAppointment(id));
  //     });
  //   });
  // });
  // $(document).on("click", ".changeStatBtn", function () {
  //   if (!confirm("you sure bto ?")) return;
  //   var id = $(this).attr("aid");
  //   var stat = $(this).attr("stat");
  //   var user = localStorage.getItem('user');
  //   var data = '{"user":' + user + ',"id":"' + id + '","stat":"' + stat + '"}';

  //   //send user info to server
  //   req.changeAppointmentStat(data, function (res) {
  //     cAlert(res);
  //     req.getAppointments(function (appointments) {
  //       localStorage.setItem('appointments', JSON.stringify(appointments));
  //       $("#appendTopBox").html('');
  //       var appointment = obj.getAppointment(id);
  //       $("#contentFirstRow").html("");
  //       $("#contentFirstRow").append(buildAppointmentCard(appointment));
  //     });
  //   });
  // });

//------------------------------------------------------------------------ appointment related functions 
// function buildEditAppointmentCard(appointment, patients, doctors) {
//   if (!patients || !doctors || !appointment)
//     return;

//   var row = $("<div/>").addClass("row");
//   var col10 = $("<div/>").addClass("col-md-6");
//   var col2 = $("<div/>").addClass("col-md-6");

//   var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n25'));
//   var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
//   col10.append(headerH4);
//   col2.append(minimize);

//   var cardheader = $("<div/>").addClass(" card-header py-3");
//   row.append(col10);
//   row.append(col2);
//   cardheader.append(row);

//   var cardBody = $("<div/>").addClass("card-body");
//   var br = $("<br/>");
//   var divider = $("<hr/>").addClass("sidebar-divider");

//   var m = dropDwons('m', "editAppInp");
//   var y = dropDwons('y', "editAppInp");
//   var d = dropDwons('d', "editAppInp");
//   var h = dropDwons('h', "editAppInp");
//   var mn = dropDwons('mn', "editAppInp");

//   cardBody.append(br);
//   cardBody.append(buildDoctorAndPatientOption(patients, doctors, "editAppInp"));
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label>' + d + '' + m + '' + y + '</div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label>' + h + '<label class="col-sm-1 col-form-label">Hour</label>' + mn + '<label class="col-sm-2 col-form-label">Minutes</label></div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><select  name="specialty" class="editAppInp form-control col-sm-3">' + specOptions() + '</select</div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n16') + '</label><button  appointmentId="' + appointment.id + '" class="editAppInpBtn btn btn-success">' + lns.getText('n31') + '</button></div>');
//   cardBody.append(br.clone());
//   cardBody.append(divider.clone());
//   cardBody.append(br.clone());

//   if (isDocc()) {
//   }

//   var cardShadow = $("<div/>").addClass("card shadow ");
//   cardShadow.append(cardheader);
//   cardShadow.append(cardBody);
//   var card = $("<div/>").addClass("col-lg-12 mb-12 ");
//   card.append(cardShadow);

//   var modal = $("<div/>").addClass("modal fade").attr('id', 'editAppointmentModal');
//   var modalDialog = $("<div/>").addClass("modal-dialog modal-lg");
//   var modalCon = $("<div/>").addClass("modal-content");
//   var modalBody = $("<div/>").addClass("modal-body");
//   modalBody.append(card);
//   modalCon.append(modalBody);
//   modalDialog.append(modalCon);
//   modal.append(modalDialog);

//   $("#appendTopBox").html("");
//   $("#appendTopBox").append(modal);
//   setFlds(appointment);
//   $("#editAppointmentModal").modal("show");
// }
// function buildAddAppointmentCard(patients, doctors, isModal) {
//   if (!patients || !doctors)
//     return;

//   var row = $("<div/>").addClass("row");
//   var col10 = $("<div/>").addClass("col-md-6");
//   var col2 = $("<div/>").addClass("col-md-6");

//   var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n25'));
//   var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
//   col10.append(headerH4);
//   col2.append(minimize);

//   var cardheader = $("<div/>").addClass(" card-header py-3");
//   row.append(col10);
//   row.append(col2);
//   cardheader.append(row);

//   var cardBody = $("<div/>").addClass("card-body");
//   var br = $("<br/>");

//   var m = dropDwons('m', "addNewAppInp");
//   var y = dropDwons('y', "addNewAppInp");
//   var d = dropDwons('d', "addNewAppInp");
//   var h = dropDwons('h', "addNewAppInp");
//   var mn = dropDwons('mn', "addNewAppInp");

//   cardBody.append(br);
//   cardBody.append(buildDoctorAndPatientOption(patients, doctors, "addNewAppInp"));
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n26') + '</label>' + d + '' + m + '' + y + '</div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n28') + '</label>' + h + '<label class="col-sm-2 col-form-label">Hour</label>' + mn + '<label class="col-sm-2 col-form-label">Minutes</label></div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n20') + '</label><select  name="specialty" class="addNewAppInp form-control col-sm-3">' + specOptions() + '</select</div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n27') + '</label><textarea  name="comment" class="addNewAppInp form-control col-sm-10"></textarea></div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n16') + '</label><button class="addNewAppBtn btn btn-success">' + lns.getText('n58') + '</button></div>');

//   var cardShadow = $("<div/>").addClass("card shadow ");
//   cardShadow.append(cardheader);
//   cardShadow.append(cardBody);



//   if (isModal) {
//     var card = $("<div/>").addClass("col-lg-12 mb-12 ");
//     card.append(cardShadow);
//     var modal = $("<div/>").addClass("modal fade").attr('id', 'appointmentModal');
//     var modalDialog = $("<div/>").addClass("modal-dialog modal-lg");
//     var modalCon = $("<div/>").addClass("modal-content");
//     var modalBody = $("<div/>").addClass("modal-body");
//     modalBody.append(card);
//     modalCon.append(modalBody);
//     modalDialog.append(modalCon);
//     modal.append(modalDialog);
//     return modal;

//   }
//   else {
//     var card = $("<div/>").addClass("col-lg-6 mb-6 mb-4");
//     card.append(cardShadow);
//     return card;
//   }
// }
// function buildAppointmentCard(appointment) {
//   if (!appointment)
//     return;

//   var date = appointment.date.split("T");
//   var time = date[1];
//   time = time.split(".");
//   time = time[0];
//   date = date[0];

//   var row = $("<div/>").addClass("row");
//   var col10 = $("<div/>").addClass("col-md-6");
//   var col2 = $("<div/>").addClass("col-md-6");

//   var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n50'));
//   var minimize = $("<i/>").addClass("minimizeBtn  dropShadHov float-right fa fa-compress-arrows-alt");
//   col10.append(headerH4);
//   col2.append(minimize);

//   var cardheader = $("<div/>").addClass(" card-header py-3");
//   row.append(col10);
//   row.append(col2);
//   cardheader.append(row);

//   var divider = $("<hr/>").addClass("sidebar-divider");
//   var br = $("<br/>");
//   var cardBody = $("<div/>").addClass("card-body");
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 lableUnderLine col-form-label">' + lns.getText('n39') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + appointment.doctor.fname + ',' + appointment.doctor.lname + '</label>\
//                                     <label class="col-sm-2 lableUnderLine col-form-label">' + lns.getText('n40') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + appointment.patient.fname + ',' + appointment.patient.lname + '</label>\
//                                     <label class="col-sm-2 lableUnderLine col-form-label">' + lns.getText('n28') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + time + '</label>\
//                     </div>');
//   cardBody.append(br.clone());
//   cardBody.append('<div class="row"><label class="col-sm-2 lableUnderLine col-form-label">' + lns.getText('n26') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + date + '</label>\
//                                   <label class="col-sm-2 lableUnderLine col-form-label">' + lns.getText('n20') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + appointment.specialty + ' </label>\
//                                   <label class="col-sm-2 lableUnderLine -form-label">' + lns.getText('n49') + '</label><label class="col-sm-2 lableUnderLine col-form-label mdl-color-text--teal-500">' + appointment.user.fname + ',' + appointment.user.lname + '</label>\
//                   </div>');
//   cardBody.append(br.clone());
//   cardBody.append(appointmentStatusBtns(appointment.id, appointment.stat));
//   if (isDocc()) {
//     cardBody.append(br.clone());
//     cardBody.append(divider.clone());

//     cardBody.append(br.clone());
//     cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n72") + '</label><button  style="display:none" class="addMoreDrug btn btn-info">' + lns.getText('n70') + '</button><button aid="' + appointment.id + '" style="display:none" class=" addDrugBtn btn btn-info">' + lns.getText('n58') + '</button><button class="editDrugsBtn btn btn-info">' + lns.getText('n30') + '</button></div>');

//   } else {
//     cardBody.append(br.clone());
//     cardBody.append('<div class="row"><label class="col-sm-2 col-form-label"></label><button aid="' + appointment.id + '" class="edtAppointmentShow btn btn-warning">' + lns.getText('n30') + '</button></div>');
//     cardBody.append(br.clone());
//     cardBody.append(divider.clone());

//     cardBody.append(br.clone());
//     cardBody.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n72") + '</label></div>');

//   }
//   var hiddenRow = $("<span/>").addClass("editableDrugs").attr("style", "display:none");
//   var visableRow = $("<span/>").addClass("noneEditableDrugs");

//   cardBody.append(br.clone());
//   var drugs = JSON.parse(appointment.drugs);
//   if (drugs) {
//     for (var a in drugs) {
//       hiddenRow.append(br.clone());
//       visableRow.append(br.clone());
//       hiddenRow.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n71") + '</label> <input value="' + drugs[a].name + '" class="isDrug form-control col-sm-3"><label class="col-sm-2 col-form-label">' + lns.getText("n27") + '</label> <input name="count" value="' + drugs[a].count + '" class=" form-control col-sm-3"> <button class="removeDrug btn btn-danger">X</button></div><br>');
//       visableRow.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n71") + '</label> <lable class="col-sm-3 col-form-label">' + drugs[a].name + '</lable><label class="col-sm-2 col-form-label">' + lns.getText("n27") + '</label> <lable  class=" col-sm-3 col-form-label">' + drugs[a].count + '<lable></div><br>');
//     }
//   }
//   hiddenRow.append('<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText("n71") + '</label> <input class="isDrug form-control col-sm-3"><label class="col-sm-2 col-form-label">' + lns.getText("n27") + '</label> <input name="count"  class=" form-control col-sm-3"> <button class="removeDrug btn btn-danger">X</button></div><br>');
//   cardBody.append(visableRow);
//   cardBody.append(hiddenRow);




//   var cardShadow = $("<div/>").addClass(" shadow mb-4");
//   cardShadow.append(cardheader);
//   cardShadow.append(cardBody);

//   var card = $("<div/>").addClass("col-lg-12 mb-12");
//   card.append(cardShadow);
//   return card;
// }
// function dropDwons(menue, inp) {

//   var m = '<select name="month" class="' + inp + ' form-control col-sm-4">';
//   for (var i = 0; i < 12; i++) {
//     m += '<option value="' + (i + 1) + '">' + months[i + 1] + '</option>';
//   }
//   m += '</select>';

//   var y = '<select name="year" class="' + inp + ' form-control col-sm-4">';
//   for (var i = 2019; i < 2025; i++) {
//     y += '<option value="' + i + '">' + i + '</option>';
//   }
//   y += '</select>';

//   var d = '<select name="day" class="' + inp + ' form-control col-sm-2">';
//   for (var i = 0; i < 31; i++) {
//     d += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
//   }
//   d += '</select>';

//   var h = '<select name="hour" class="' + inp + ' form-control col-sm-2">';
//   for (var i = 0; i < 24; i++) {
//     h += '<option value="' + i + '">' + i + '</option>';
//   }
//   h += '</select>';

//   var mn = '<select name="minutes" class="' + inp + ' form-control col-sm-2">';
//   for (var i = 0; i <= 30; i += 30) {
//     mn += '<option value="' + i + '">' + i + '</option>';
//   }
//   mn += '</select>';

//   if (menue == "m")
//     return m;
//   else if (menue == "y")
//     return y;
//   else if (menue == "d")
//     return d;
//   else if (menue == "h")
//     return h;
//   else if (menue == "mn")
//     return mn;
// }
// function buildDoctorAndPatientOption(patients, doctors, inp) {
//   var res = '<div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n39') + '</label><select  name="doctor" class="' + inp + ' addAppDocSelct form-control col-sm-4" ><option value="" >' + lns.getText("n60") + '</option>';
//   for (var a in doctors) {
//     res += '<option value="' + doctors[a].id + '">' + doctors[a].fname + ',' + doctors[a].lname + '</option>';
//   }
//   res += '</select><label class="col-sm-2 col-form-label">' + lns.getText('n40') + '</label><select name="patient" class="' + inp + '  form-control col-sm-4"><option value="" >' + lns.getText("n60") + '</option>';
//   for (var a in patients) {
//     res += '<option value="' + patients[a].id + '">' + patients[a].fname + ',' + patients[a].lname + '</option>';
//   }
//   res += '</select>';
//   return res;
// }
// function setFlds(appointment) {
//   var tempDate = appointment.date.split("T");
//   var time = tempDate[1].split(':');
//   tempDate = tempDate[0].split('-');
//   var year = parseInt(tempDate[0]);
//   var month = parseInt(tempDate[1]);
//   var day = parseInt(tempDate[2]);

//   var hour = parseInt(time[0]);
//   var minutes = parseInt(time[1]);

//   $(".editAppInp[name='doctor']").val(appointment.doctor_id);
//   $(".editAppInp[name='patient']").val(appointment.patient_id);

//   $(".editAppInp[name='day']").val(day);
//   $(".editAppInp[name='month']").val(month);
//   $(".editAppInp[name='year']").val(year);

//   $(".editAppInp[name='hour']").val(hour);
//   $(".editAppInp[name='minutes']").val(minutes);

//   $(".editAppInp[name='specialty']").val(appointment.specialty);

// }
// function addAppointmentFields(appointment) {
//   var d = new Date();


//   if (appointment.doctor_id)
//     $(".addNewAppInp[name='doctor']").val(appointment.doctor_id);

//   if (appointment.patient_id)
//     $(".addNewAppInp[name='patient']").val(appointment.patient_id);

//   if (appointment.day)
//     $(".addNewAppInp[name='day']").val(appointment.day);
//   else
//     $(".addNewAppInp[name='hour']").val(d.getDate());

//   if (appointment.month)
//     $(".addNewAppInp[name='month']").val(appointment.month);
//   else
//     $(".addNewAppInp[name='hour']").val(d.getMonth());

//   if (appointment.year)
//     $(".addNewAppInp[name='year']").val(appointment.year);
//   else
//     $(".addNewAppInp[name='year']").val(d.getFullYear());

//   if (appointment.hour)
//     $(".addNewAppInp[name='hour']").val(appointment.hour);
//   else
//     $(".addNewAppInp[name='hour']").val(d.getHours());

//   if (appointment.minutes)
//     $(".addNewAppInp[name='minutes']").val(appointment.minutes);

//   if (appointment.specialty)
//     $(".addNewAppInp[name='specialty']").val(appointment.specialty);
// }
// function specOptions() {
//   return '<option value="dermatology">Dermatology (Skin)</option> <option value="dentistry">Dentistry (Teeth)</option> <option value="psychiatry">Psychiatry</option> <option value="pediatrics">Pediatrics</option> <option value="neurology">Neurology</option> <option value="orthopedics">Orthopedics</option> <option value="gynecology">Gynecology and Infertility</option> <option value="ear">Ear</option> <option value="throat">Nose and Throat</option> <option value="cardiology">Cardiology and Vascular </option> <option value="allergy">Allergy</option> <option value="androgyny">Androgyny</option> <option value="audiology">Audiology</option> <option value="cardiology">Cardiology</option> <option value="chest">Chest and Respiratory</option> <option value="diabetes">Diabetes and Endocrinology</option> <option value="diagnostic">Diagnostic </option> <option value="radiology">Radiology</option> <option value="dietitian">Dietitian and Nutrition</option> <option value="elders">Elders</option>';
// }
// function appointmentStatusBtns(id, stat) {
//   if (stat == 0) {
//     return '\
//     <div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n63') + '</label>\
//       <div class="btn-group" role="group" >\
//         <button aid="'+ id + '" stat="0" class="changeStatBtn btn btn-info">' + lns.getText('n64') + '</button>\
//         <button aid="'+ id + '" stat="1" class="changeStatBtn btn btn-secondary">' + lns.getText('n65') + '</button>\
//         <button aid="'+ id + '" stat="2"  class="changeStatBtn btn btn-secondary">' + lns.getText('n66') + '</button>\
//       </div>\
//     </div>';
//   } else if (stat == 1) {
//     return '\
//     <div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n63') + '</label>\
//       <div class="btn-group" role="group" >\
//         <button aid="'+ id + '" stat="0"  class="changeStatBtn btn btn-secondary">' + lns.getText('n64') + '</button>\
//         <button aid="'+ id + '" stat="1"  class="changeStatBtn btn btn-info">' + lns.getText('n65') + '</button>\
//         <button aid="'+ id + '" stat="2"  class="changeStatBtn btn btn-secondary">' + lns.getText('n66') + '</button>\
//       </div>\
//     </div>';
//   } else {
//     return '\
//     <div class="row"><label class="col-sm-2 col-form-label">' + lns.getText('n63') + '</label>\
//       <div class="btn-group" role="group" >\
//         <button aid="'+ id + '" stat="0"  class="changeStatBtn btn btn-secondary">' + lns.getText('n64') + '</button>\
//         <button aid="'+ id + '" stat="1"  class="changeStatBtn btn btn-secondary">' + lns.getText('n65') + '</button>\
//         <button aid="'+ id + '" stat="2"  class="changeStatBtn btn btn-info">' + lns.getText('n66') + '</button>\
//       </div>\
//     </div>';
//   }

// }
// function getEditAppointmentDrugs() {
//   var drugs = '[';
//   var error = false;
//   $(".isDrug").each(function () {
//     var drug = $(this).val().toLowerCase().trim().replace(/ +(?= )/g, '');
//     var comment = $(this).next().next().val().toLowerCase().trim().replace(/ +(?= )/g, '');

//     if (drug == "" || comment == "")
//       error = true;

//     drugs += '{"name":"' + drug + '","count":"' + comment + '"},';
//   });
//   if (error) {
//     cAlert("empty fields");
//     return "error";
//   }
//   else {
//     drugs = drugs.substring(0, drugs.length - 1);
//     drugs += "]";
//     return drugs;
//   }
// }