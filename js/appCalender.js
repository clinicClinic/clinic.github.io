var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDate();
var dayOffset = d.getDay();
var monthDays = daysInThisMonth(year, month);
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekDaysDates = ["", "", "", "", "", "", ""];
var daysString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

import * as lns from './lanSelector.js';
import * as obj from './obj.js';


//listeners 
$(document).on("click", ".calNext", function () {
  var acid = $(this).attr("acId");
  if (acid == "month") {
    day = monthDays;
    changeDay("inc");
  }
  else if (acid == "week") {
    changeWeekCal("nxt");
  }
  else {
    changeDay("inc");
  }

  calTran();
  renderApp();

});
$(document).on("click", ".calPrev", function () {
  var acid = $(this).attr("acId");
  if (acid == "month") {
    day = 1;
    changeDay("dec");
    day = 1;
  }
  else if (acid == "week") {
    changeWeekCal("prev");
  }
  else {
    changeDay("dec");
  }

  calTran();
  renderApp();

});


$(document).on("click", ".weeksBtn", function () {
  //update the week header dates
  buildWeeksCalHelper();
  $(".slcted").attr("cid", "week");
  $(".calNext").attr("acid", "week");
  $(".calPrev").attr("acid", "week");

  localStorage.setItem("slctdCalView", "week");

  calTran();
});
$(document).on("click", ".monthsBtn", function () {
  $(".slcted").attr("cid", "month");
  $(".calNext").attr("acid", "month");
  $(".calPrev").attr("acid", "month");

  localStorage.setItem("slctdCalView", "month");

  day = 1;
  var tmpDate = new Date(year, month);
  dayOffset = tmpDate.getDay();
  $(".slcted").attr("cid", "month");
  calTran("month");
});
$(document).on("click", ".dayBtn", function () {
  $(".slcted").attr("cid", "day");
  $(".calNext").attr("acid", "day");
  $(".calPrev").attr("acid", "day");

  localStorage.setItem("slctdCalView", "day");

  calTran();
  renderApp();
});
$(document).on("change", ".slcted", function (event) {
  var cid = $(this).attr("cid");
  renderApp();

});
$(document).on("click", ".isMonthDayCell", function (event) {
  var date = $(this).attr('day-cell')
  var date = date.split("-");
  day = date[2];

  localStorage.setItem("slctdCalView", "day");

  $(".slcted").attr("cid", "day");
  $(".calNext").attr("acid", "day");
  $(".calPrev").attr("acid", "day");
  calTran();
  renderApp();
});
export function rend() {
  appointmentCont();
  calTran();
}

// ------------------------------------------------------------------------------------------ monthly calendar functions------------------------------------------------------------------------------------------
//------------------------------------------------------------------monthly calendar------------------------------------------------------------------

//this function renders the main appointment Monthly calendar ?!
function appointmentCont() {
  var weekBtn = $("<a/>").addClass("weeksBtn btn-sm animated-button thar-one").text(lns.getText('n53'));
  var monthBtn = $("<a/>").addClass("monthsBtn btn-sm animated-button thar-one").text(lns.getText('n54'));
  var dayBtn = $("<a/>").addClass("dayBtn btn-sm animated-button thar-one").text(lns.getText('n55'));
  var title = $("<h3/>").attr("id", "calnderDate").addClass("m-0 font-weight-bold mdl-color-text--blue-A200 ").text(year + ',' + months[month]);
  var prevBtn = $("<a/>").attr("acid", "month").addClass("calPrev btn-sm animated-button thar-four").text(lns.getText('n56'));
  var nextBtn = $("<a/>").attr("acid", "month").addClass("calNext btn-sm animated-button thar-three").text(lns.getText('n57'));

  var colEmpty = $("<div/>").addClass("col-md-1");
  var dayBtnCol = $("<div/>").addClass("col-md-1");
  dayBtnCol.append(dayBtn);
  var weekBtnCol = $("<div/>").addClass("col-md-1");
  weekBtnCol.append(weekBtn);
  var monthBtnCol = $("<div/>").addClass("col-md-1");
  monthBtnCol.append(monthBtn);
  var titleBtnCol = $("<div/>").addClass("col-md-5");
  titleBtnCol.append(title);
  var prevBtnCol = $("<div/>").addClass("col-md-1");
  prevBtnCol.append(prevBtn);
  var afterBtnCol = $("<div/>").addClass("col-md-1");
  afterBtnCol.append(nextBtn);

  var calHeaderRow = $("<div/>").addClass("row");
  calHeaderRow.append(monthBtnCol);
  calHeaderRow.append(weekBtnCol);
  calHeaderRow.append(dayBtnCol);
  calHeaderRow.append(colEmpty.clone());
  calHeaderRow.append(colEmpty.clone());
  calHeaderRow.append(titleBtnCol);
  calHeaderRow.append(prevBtnCol);
  calHeaderRow.append(afterBtnCol);

  var br = $("<br/>");
  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(selectionHeader("month"));
  cardBody.append(br.clone());
  cardBody.append(calHeaderRow);
  cardBody.append(br);
  cardBody.append("<div class='calendar' ></div>");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n42'));
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentCard dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").attr('app-data', '{"month":"' + month + '"}').text("+");
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

  $("#contentFirstRow").html("");
  $("#contentFirstRow").append(card);
  renderMonthAppointments('', '');

}
function buildMonthlycalendar() {
  var calendarHeader = $("<div/>").addClass("monthly_calendar_header");
  var daysArray = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  for (var i = 0; i < 7; i++) {
    calendarHeader.append($("<div/>").text(daysArray[i]));
  }
  var calCells = buildcalendarCells();
  var calendar = $("<div/>").addClass("");
  calendar.append(calendarHeader);
  calendar.append(calCells);

  return calendar;
}
//this function return a full card conatining the calendar
function buildcalendarCells() {
  var dayStart = new Date(year, month, 1);
  dayStart = dayStart.getDay();
  var w = buildCalWeek(dayStart);
  return w;
}
//this function helps adding the blocks of the monthly calendar $year is the globally defined year  ===== $ dayStart is when the current month starts i.e  1 => sat
function buildCalWeek(dayStart) {
  //days is the varible that contains html blocks as string
  var days = "";
  //adding empty block in the begining
  for (var f = 0; f < dayStart; f++) {
    days += '<div class="mdl-color--blue-50	 monthly_calendar_day_box day"></div>';
  }
  //keep adding daily blocks == to the number of days in the current month
  for (var k = 1; k <= monthDays; k++) {
    days += '<div  appointmentCount="0" day-cell="' + year + '-' + month + '-' + k + '" class="isMonthDayCell monthly_calendar_day_box calendar_hov day"><div>' + k + '</div><a style="display:none"class="btn btn-warning-no-bg btn-circle btn-sm"></a></div>';
  }
  // adds how much block needed to complete the row
  var remians = 7 - ((monthDays + dayStart) % 7);
  //filling empty blocks
  for (var j = 0; j < remians; j++) {
    days += '<div class="mdl-color--blue-50	 monthly_calendar_day_box day"></div>';
  }
  //return the blocks as string
  return '<div class="monthly_calendar_body">' + days + '</div>';
}
//------------------------------------------------------------------------------------------- dayly calender functions
function buildDaylycalendar() {
  var daysArray = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var tempDay = new Date(year, month, day);
  var v = "";
  v += '<div class="dayly_calendar_box  day">HR</div>';
  v += '<div class="dayly_calendar_box  day"><center>' + months[month] + '-' + daysArray[tempDay.getDay()] + '-' + day + '</center></div>';
  var am = "am";
  for (var i = 0; i < 24; i++) {
    if (i == 12)
      am = "pm";
    v += "<div class='dayly_calendar_box  day'>" + ((i % 12)) + ":00 " + am + "</div>";
    v += "<div appointmentcount='0' day-hour-cell='" + year + "-" + month + "-" + day + "-" + (i + 1) + ":00' app-data='" + '{"year":"' + year + '","month":"' + month + '","day":"' + day + '","hour":"' + i + '","minutes":"0"}' + "'   class='clickable toggleAppointmentCard isCalWeekCell dayly_calendar_box calendar_hov day'></div>";
    v += "<div class='dayly_calendar_box  day'>--</div>";
    v += "<div appointmentcount='0' day-hour-cell='" + year + "-" + month + "-" + day + "-" + (i + 1) + ":30' app-data='" + '{"year":"' + year + '","month":"' + month + '","day":"' + day + '","hour":"' + i + '","minutes":"30"}' + "'   class='clickable toggleAppointmentCard isCalWeekCell dayly_calendar_box calendar_hov day'></div>"
  }

  var calendarHeader = $("<div/>").addClass("dayly_calendar_header");
  var calBody = $("<div/>").addClass("dayly_calendar_body");
  calBody.append(v);
  var calendar = $("<div/>").addClass("");
  calendar.append(calendarHeader);
  calendar.append(calBody);

  return calendar;
}
//------------------------------------------------------------------weekly calendar------------------------------------------------------------------
//this function renders the weeklly calendar
function buildWeekscalendar(s, e, am) {
  var calendar = $("<div/>").addClass("");
  var v = buildDayHours(s, e, am);
  var w = '<div class="weekly_calendar_header">\
  <div >Hr</div>\
  <div calss="weekSunDate" day-head-date="'+ weekDaysDates[0] + '">Sun(' + weekDaysDates[0] + ')</div>\
    <div day-head-date="'+ weekDaysDates[1] + '">Mon(' + weekDaysDates[1] + ')</div>\
    <div day-head-date="'+ weekDaysDates[2] + '">Tus(' + weekDaysDates[2] + ')</div>\
    <div day-head-date="'+ weekDaysDates[3] + '">Wen(' + weekDaysDates[3] + ')</div>\
    <div day-head-date="'+ weekDaysDates[4] + '">Thi(' + weekDaysDates[4] + ')</div>\
    <div day-head-date="'+ weekDaysDates[5] + '">Fri(' + weekDaysDates[5] + ')</div>\
    <div day-head-date="'+ weekDaysDates[6] + '">Sat(' + weekDaysDates[6] + ')</div>\
  </div>\
  <div class="weekly_calendar_body">'+ v;
  calendar.append(w);
  return calendar;
}
//this function builds the hourlly blocks of the weekly calendar $s = starting time $e ending time $am timing
function buildDayHours(s, e, am) {
  var timePeroid = ['am', 'pm'];
  var v = "";
  for (var i = s; i < e; i++) {
    if ((i % 12) == 0)
      am = (am + 1) % 2;
    v += "<div class='weekly_calendar_box calendar_hov day'>" + (i % 12) + ":00 " + timePeroid[am] + "</div>";
    for (var k = 0; k < 7; k++) {
      v += "<div appointmentCount='0' day-hour-cell='" + weekDaysDates[k] + "-" + i + ":00' app-data='" + '{"year":"' + year + '","month":"' + month + '","day":"' + day + '","hour":"' + (i + 1) + '","minutes":"0"}' + "'  class='toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day'></div>";
    }
    v += "<div  class='weekly_calendar_box calendar_hov day'>--</div>";
    for (var j = 0; j < 7; j++) {
      v += "<div appointmentCount='0' day-hour-cell='" + weekDaysDates[k] + "-" + i + ":30' app-data='" + '{"year":"' + year + '","month":"' + month + '","day":"' + day + '","hour":"' + (i + 1) + '","minutes":"30"}' + "'  class='toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day'></div>";
    }
  }
  return v;
}
//this function builds an array to help identifies hourlly blocks date
function buildWeeksCalHelper() {
  var tmpOffSet = dayOffset + 1;
  //calculate the start of the week
  for (var i = 0; i < tmpOffSet; i++) {
    changeDay("dec");
  }

  //calculate the start of the week
  for (var i = 0; i < 7; i++) {
    changeDay("inc");
    weekDaysDates[i] = year + "-" + month + "-" + day;
  }


}
//---------------------------------------------------------------- transation managers + helpers
function changeDay(chng) {
  if (chng == "inc") {
    day++;
    //check if the day changes the month and year
    if (day > monthDays) {
      var tempMonth = (month + 1) % 12;
      if (tempMonth < month)
        year++;
      month = tempMonth;
      day = 1;
      var tmpDate = new Date(year, month);
      dayOffset = tmpDate.getDay();
      monthDays = daysInThisMonth(year, month);
    }
  }
  else {
    day--;
    //check if the day changes the month and year
    if (day < 1) {
      var tempMonth = (month - 1) % 12;
      //adjust if tempMonth is negative
      if (tempMonth < 0) {
        tempMonth = tempMonth + 12;
        year--;
      }
      month = tempMonth;
      day = daysInThisMonth(year, month);
      var tmpDate = new Date(year, month);
      dayOffset = tmpDate.getDay();
      monthDays = daysInThisMonth(year, month);
    }
  }
}
//this function change the calendar based on the action spicisfied
function changeWeekCal(chng) {
  if (chng == "nxt") {
    //calculate the start of the week
    for (var i = 0; i < 7; i++) {
      changeDay("inc");
      weekDaysDates[i] = year + "-" + month + "-" + day;
    }
  }
  else {
    //calculate the start of the week
    for (var i = 0; i < 14; i++) {
      changeDay("dec");
    }
    //calculate the start of the week
    for (var i = 0; i < 7; i++) {
      changeDay("inc");
      weekDaysDates[i] = year + "-" + month + "-" + day;
    }
  }
  console.log("weekDaysDates");
}
//this function return the number of days in the giving month and year
function daysInThisMonth(year, month) {
  var now = new Date();
  return new Date(year, month + 1, 0).getDate();
}
//----------------------------------------------------------------- rendering appointment in the calender
//rendering the appointments
function renderWeeksAppointments(specialty, did) {
  var a;
  var appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments);
  for (a in appointments) {
    if (specialty != '' && did != '') {
      if (appointments[a].specialty != specialty) continue;
      if (appointments[a].doctor_id != did) continue;
    }
    else if (specialty != '' && did == '') {
      if (appointments[a].specialty != specialty) continue;
    }
    else if (specialty == '' && did != '') {
      if (appointments[a].doctor_id != did) continue;
    }

    var appointment = obj.getAppointment(appointments[a].id);
    var adjDate = adjustDate(appointment.date);

    var elmnt = $('.isCalWeekCell[day-hour-cell="' + adjDate + '"]');
    var count = elmnt.attr("appointmentCount");
    if (count < 2) {
      var appBox = '<div  appointmentId="' + appointment.id + '" class="appCardClick appointment-week-boxs"><div>Specialty :' + appointment.specialty + '</div></div>';
      elmnt.append(appBox);
    }
    else if (count == 2) {
      var appBox = '<div  appointment-index="" class="appointment-week-boxs">+</div>';
      elmnt.append(appBox);
    }
    count++;
    elmnt.attr("appointmentCount", count);
  }
}
//rendering the dayly appointments
function renderDaysAppointments(specialty, did) {
  var a;
  var appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments);
  for (a in appointments) {
    if (specialty != '' && did != '') {
      if (appointments[a].specialty != specialty) continue;
      if (appointments[a].doctor_id != did) continue;
    }
    else if (specialty != '' && did == '') {
      if (appointments[a].specialty != specialty) continue;
    }
    else if (specialty == '' && did != '') {
      if (appointments[a].doctor_id != did) continue;
    }
    var appointment = obj.getAppointment(appointments[a].id);
    var adjDate = adjustDate(appointment.date);

    var elmnt = $('.isCalWeekCell[day-hour-cell="' + adjDate + '"]');
    var count = elmnt.attr("appointmentCount");
    if (count < 5) {
      var appBox = '<div  appointmentId="' + appointment.id + '" class="px-2 appCardClick appointment-week-boxs"><div>Doctor :' + appointment.doctor.fname + ',' + appointment.doctor.lname + '</div> \
                                                                            <div> Patient :' + appointment.patient.fname + ',' + appointment.patient.lname + '</div>\
                                                                            <div>Specialty :' + appointment.specialty + '\</div></div>';
      elmnt.append(appBox);
    }
    else if (count == 5) {
      var appBox = '<div  appointment-index="" class="appointment-week-boxs">+</div>';
      elmnt.append(appBox);
    }
    count++;
    elmnt.attr("appointmentCount", count);
  }
}
//rendering the appointments
function renderMonthAppointments(specialty, did) {
  var appointments = localStorage.getItem('appointments');
  appointments = JSON.parse(appointments);
  if (!appointments)
    return;


  var a;
  for (a in appointments) {
    if (specialty != '' && did != '') {
      if (appointments[a].specialty != specialty) continue;
      if (appointments[a].doctor_id != did) continue;
    }
    else if (specialty != '' && did == '') {
      if (appointments[a].specialty != specialty) continue;
    }
    else if (specialty == '' && did != '') {
      if (appointments[a].doctor_id != did) continue;
    }


    var tempDate = appointments[a].date.split("T");
    tempDate = tempDate[0].split('-');
    tempDate = parseInt(tempDate[0]) + '-' + parseInt(tempDate[1]) + '-' + parseInt(tempDate[2]);
    var elmnt = $('.isMonthDayCell[day-cell="' + tempDate + '"]');
    var count = elmnt.attr("appointmentCount");
    count++;
    elmnt.find('a').show().html(count);
    elmnt.attr("appointmentCount", count);
  }

}
//rempve appointment
function rmvApp(cid) {
  if (cid == "month") {
    $(".isMonthDayCell").each(function () {
      $(this).attr("appointmentCount", 0);
      $(this).find('a').hide().html("");
    });
  }
  else {
    $(".isCalWeekCell").each(function () {
      $(this).attr("appointmentCount", 0);
      $(this).html("");
    });
  }

}
function adjustDate(date) {
  date = date.split('T');
  var time = date[1];
  var tempDate = date[0].split('-');
  tempDate = parseInt(tempDate[0]) + '-' + parseInt(tempDate[1]) + '-' + parseInt(tempDate[2]) + '-';
  var tempTime = time.split(':');
  if (parseInt(tempTime[1]) < 30) {
    return tempDate + parseInt(tempTime[0]) + ":00";
  }
  else {
    return tempDate + parseInt(tempTime[0]) + ":30";
  }
}
function selectionHeader(cid) {
  return '<div class="row shadow border-bottom mdl-color--blue-50	">\
  <h3 class="col-sm-2 ">'+ lns.getText('n59') + '</h3>\
  <h3 class="col-sm-2 ">' + lns.getText('n20') + '</h3>\
  <select  cid="'+ cid + '" id="slctedSpec" name="Specialty" class="slcted form-control col-sm-2">' + specOptions() + '</select>\
  <h3 class="col-sm-2 ">' + lns.getText('n39') + '</h3>\
  <select  cid="'+ cid + '" id="slctedDoc" name="doctor" class="slcted form-control col-sm-3" >' + doctorOption() + '</select>\
  </div>';
}
function doctorOption() {
  var doctors = localStorage.getItem("doctors");
  doctors = JSON.parse(doctors);
  var res = '<option value="" >' + lns.getText("n60") + '</option>';
  if (!doctors)
    return;
  for (var a in doctors) {
    res += '<option value="' + doctors[a].id + '">' + doctors[a].fname + ',' + doctors[a].lname + '</option>';
  }
  return res;
}
function specOptions() {
  return '<option value="" >' + lns.getText("n60") + '</option><option value="dermatology (skin)">Dermatology (Skin)</option> <option value="dentistry (teeth)">Dentistry (Teeth)</option> <option value="psychiatry">Psychiatry</option> <option value="pediatrics">Pediatrics</option> <option value="neurology">Neurology</option> <option value="orthopedics">Orthopedics</option> <option value="gynecology and infertility">Gynecology and Infertility</option> <option value="ear">Ear</option> <option value="nose and throat">Nose and Throat</option> <option value="cardiology and vascular ">Cardiology and Vascular </option> <option value="allergy">Allergy</option> <option value="androgyny">Androgyny</option> <option value="audiology">Audiology</option> <option value="cardiology">Cardiology</option> <option value="chest and respiratory">Chest and Respiratory</option> <option value="diabetes and rndocrinology">Diabetes and Endocrinology</option> <option value="diagnostic ">Diagnostic </option> <option value="radiology">Radiology</option> <option value="dietitian and nutrition">Dietitian and Nutrition</option> <option value="elders">Elders</option>';
}
function renderApp() {
  var cid = $(".slcted").attr("cid");
  var did = $("#slctedDoc").val();
  var spec = $("#slctedSpec").val();

  if (cid == "month") {
    rmvApp("month");
    renderMonthAppointments(spec, did);
  }
  else if (cid == "week") {
    rmvApp("week");
    renderWeeksAppointments(spec, did)
  }
  else {
    rmvApp("day");
    renderDaysAppointments(spec, did);
  }

}
function calTran() {
  var cid = localStorage.getItem("slctdCalView");
  if (!cid || cid == "")
    cid = $(".slcted").attr("cid");

  $("#calnderDate").text(year + ',' + months[month]);
  if (cid == "month") {
    $(".calendar").html(buildMonthlycalendar());
  }
  else if (cid == "week") {
    $(".calendar").html(buildWeekscalendar(0, 24, 0));
  }
  else {
    $(".calendar").html(buildDaylycalendar());
  }

  renderApp();

}