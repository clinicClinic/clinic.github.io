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
  day = monthDays;
  changeDay("inc");
  appointmentCont();
});
$(document).on("click", ".calPrev", function () {
  day = 1;
  changeDay("dec");
  day = 1;
  appointmentCont();
});
$(document).on("click", ".calDayPrev", function () {
  changeDay("dec");
  daycalendar();
});
$(document).on("click", ".calDayNext", function () {

  changeDay("inc");
  daycalendar();
});
$(document).on("click", ".weeksBtn", function () {
  //update the week header dates
  buildWeeksCalHelper();
  buildWeekscalendar(8, 24, 0);

});
$(document).on("click", ".monthsBtn", function () {
  day = 1;
  var tmpDate = new Date(year, month);
  dayOffset = tmpDate.getDay();
  appointmentCont();
});
$(document).on("click", ".calWeeksNext", function () {
  changeWeekCal("nxt");
  buildWeekscalendar(0, 24, 0);
});
$(document).on("click", ".calWeeksPrev", function () {
  changeWeekCal("prev");
  buildWeekscalendar(0, 24, 0);
});
$(document).on("click", ".dayBtn", function () {
  daycalendar();
});
// $(document).on("click", ".appointment-week-boxs", function (event) {
  
//   event.stopPropagation();
// });
$(document).on("click", ".isMonthDayCell", function (event) {
  var date = $(this).attr('day-cell')
  var date = date.split("-");
  day = date[2];
  daycalendar();
});
export function rend() {
  appointmentCont();
}

// ------------------------------------------------------------------------------------------ calendar related functions------------------------------------------------------------------------------------------
//------------------------------------------------------------------monthly calendar------------------------------------------------------------------

//this function renders the main appointment Monthly calendar ?!
function appointmentCont() {
  var weekBtn = $("<a/>").addClass("weeksBtn btn-sm animated-button thar-one").text(lns.getText('n53'));
  var monthBtn = $("<a/>").addClass("btn-sm animated-button thar-one").text(lns.getText('n54'));
  var dayBtn = $("<a/>").addClass("dayBtn btn-sm animated-button thar-one").text(lns.getText('n55'));
  var title = $("<h3/>").addClass("m-0 font-weight-bold mdl-color-text--blue-A200 ").text(year + ',' + months[month]);
  var prevBtn = $("<a/>").addClass("calPrev btn-sm animated-button thar-four").text(lns.getText('n56'));
  var nextBtn = $("<a/>").addClass("calNext btn-sm animated-button thar-three").text(lns.getText('n57'));

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
  cardBody.append(calHeaderRow);
  cardBody.append(br);
  cardBody.append(buildMonthlycalendar());

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n42'));
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

  $("#contentFirstRow").html("");
  $("#contentFirstRow").append(card);
  renderMonthAppointments();

}
function buildMonthlycalendar() {
  var calendarHeader = $("<div/>").addClass("monthly_calendar_header");
  var daysArray = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  for (var i = 0; i < 7; i++) {
    calendarHeader.append($("<div/>").text(daysArray[i]));
  }
  var calCells = buildcalendarCells();
  var calendar = $("<div/>").addClass("calendar");
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

function daycalendar() {

  var weekBtn = $("<a/>").addClass("weeksBtn btn-sm animated-button thar-one").text(lns.getText('n53'));
  var monthBtn = $("<a/>").addClass("monthsBtn btn-sm animated-button thar-one").text(lns.getText('n54'));
  var dayBtn = $("<a/>").addClass(" btn-sm animated-button thar-one").text(lns.getText('n55'));
  var title = $("<h3/>").addClass("m-0 font-weight-bold mdl-color-text--blue-A200 ").text(year + ',' + months[month]);
  var prevBtn = $("<a/>").addClass("calDayPrev btn-sm animated-button thar-four").text(lns.getText('n56'));
  var nextBtn = $("<a/>").addClass("calDayNext btn-sm animated-button thar-three").text(lns.getText('n57'));

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
  cardBody.append(calHeaderRow);
  cardBody.append(br);
  cardBody.append(buildDaylycalendar());

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(lns.getText('n42'));
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
  $("#contentFirstRow").html("");
  $("#contentFirstRow").append(card);
  renderDaysAppointments();


}
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
    v += '<div class="dayly_calendar_box  day">' + ((i % 12) + 1) + ':00 ' + am + '</div>';
    v += '<div appointmentcount="0" day-hour-cell="' + year + '-' + month + '-' + day + '-' + (i + 1) + ':00" class="clickable toggleAppointmentCard isCalWeekCell dayly_calendar_box calendar_hov day"></div>';
    v += '<div class="dayly_calendar_box  day">--</div>';
    v += '<div appointmentcount="0" day-hour-cell="' + year + '-' + month + '-' + day + '-' + (i + 1) + ':30" class="clickable toggleAppointmentCard isCalWeekCell dayly_calendar_box calendar_hov day"></div>'
  }

  var calendarHeader = $("<div/>").addClass("dayly_calendar_header");
  var calBody = $("<div/>").addClass("dayly_calendar_body");
  calBody.append(v);
  var calendar = $("<div/>").addClass("calendar");
  calendar.append(calendarHeader);
  calendar.append(calBody);

  return calendar;
}
//------------------------------------------------------------------weekly calendar------------------------------------------------------------------
//this function renders the weeklly calendar
function buildWeekscalendar(s, e, am) {
  //v is the hourly blocks as string
  var v = buildDayHours(s, e, am);
  var w = '';
  w = '<div class="col-lg-12 mb-12">\
        <div class=" shadow mb-4">\
        <div class="card-header py-3">\
        <div class="row">\
            <div class="col-auto"><h4 class="m-0 font-weight-bold text-primary">Appointments</h4></div>\
            <div class="col-auto"><button class=" toggleAppointmentCard mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">+</button></div>\
        </div>\
        </div>\
        <div class="card-body">\
            <div class="row">\
            <div class="col-md-1"> <a class=" monthsBtn btn-sm animated-button thar-one">Months</a></div>\
            <div class="col-md-1"> <a class="  btn-sm animated-button thar-one">Weeks</a></div>\
            <div class="col-md-1"><a class="dayBtn btn-sm animated-button thar-one">Day</a></div>\
            <div class="col-md-1"></div>\
            <div class="col-md-1"></div>\
            <div class="col-md-5">\
                <h3 class="m-0 font-weight-bold mdl-color-text--blue-A200 ">'+ year + ',' + months[month] + '-' + (month + 1) + '</h3>\
            </div>\
            <div class="col-md-1"> <a class="calWeeksPrev btn-sm animated-button thar-four">Prev</a></div>\
            <div class="col-md-1"><a class="calWeeksNext btn-sm animated-button thar-three">Next</a></div>\
            </div> <br>\
            <div class="calendar">\
            <div class="weekly_calendar_header">\
                <div >Hr</div>\
                <div calss="weekSunDate" day-head-date="'+ weekDaysDates[0] + '">Sun(' + weekDaysDates[0] + ')</div>\
                <div day-head-date="'+ weekDaysDates[1] + '">Mon(' + weekDaysDates[1] + ')</div>\
                <div day-head-date="'+ weekDaysDates[2] + '">Tus(' + weekDaysDates[2] + ')</div>\
                <div day-head-date="'+ weekDaysDates[3] + '">Wen(' + weekDaysDates[3] + ')</div>\
                <div day-head-date="'+ weekDaysDates[4] + '">Thi(' + weekDaysDates[4] + ')</div>\
                <div day-head-date="'+ weekDaysDates[5] + '">Fri(' + weekDaysDates[5] + ')</div>\
                <div day-head-date="'+ weekDaysDates[6] + '">Sat(' + weekDaysDates[6] + ')</div>\
            </div>\
            <div class="weekly_calendar_body">'+ v + '\
            </div>\
            </div>\
        </div>\
        </div>\
    </div>';
  //render the calendar
  $("#contentFirstRow").html("");
  $("#contentFirstRow").append(w);
  renderWeeksAppointments();

}
//this function builds the hourlly blocks of the weekly calendar $s = starting time $e ending time $am timing
function buildDayHours(s, e, am) {
  var timePeroid = ['am', 'pm'];
  var v = "";
  for (var i = s; i < e; i++) {
    if ((i % 12) == 0)
      am = (am + 1) % 2;
    v += '\
    <div class="weekly_calendar_box calendar_hov day">'+ (i % 12) + ':00 ' + timePeroid[am] + '</div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[0] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[1] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[2] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[3] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[4] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[5] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[6] + '-' + i + ':00" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div  class="weekly_calendar_box calendar_hov day">--</div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[0] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[1] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[2] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[3] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[4] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[5] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+ weekDaysDates[6] + '-' + i + ':30" class="toggleAppointmentCard clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>';

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
    weekDaysDates[i] = year + "-" + month  + "-" + day;
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
      weekDaysDates[i] = year + "-" + month  + "-" + day;
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
      weekDaysDates[i] = year + "-" + month  + "-" + day;
    }
  }
}
//this function return the number of days in the giving month and year
function daysInThisMonth(year, month) {
  var now = new Date();
  return new Date(year, month + 1, 0).getDate();
}
//----------------------------------------------------------------- rendering appointment in the calender
//rendering the appointments
function renderWeeksAppointments() {
  var a;
  var appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments);
  for (a in appointments) {
    var appointment = obj.getAppointment(appointments[a].id);
    var adjDate = adjustDate(appointment.date);
    console.log(adjDate);

    var elmnt = $('.isCalWeekCell[day-hour-cell="' + adjDate + '"]');
    var count = elmnt.attr("appointmentCount");
    if (count < 2) {
      var appBox = '<div  appointmentId="'+appointment.id+'" class="appCardClick appointment-week-boxs"><div>Specialty :' + appointment.specialty +'</div></div>';
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
function renderDaysAppointments() {
  var a;
  var appointments = localStorage.getItem("appointments");
  appointments = JSON.parse(appointments);
  for (a in appointments) {
    var appointment = obj.getAppointment(appointments[a].id);
    var adjDate = adjustDate(appointment.date);
    console.log(adjDate);

    var elmnt = $('.isCalWeekCell[day-hour-cell="' + adjDate + '"]');
    var count = elmnt.attr("appointmentCount");
    if (count < 5) {
      var appBox = '<div  appointmentId="'+appointment.id+'" class="px-2 appCardClick appointment-week-boxs"><div>Doctor :' + appointment.doctor.fname+','+appointment.doctor.lname + '</div> \
                                                                            <div> Patient :' + appointment.patient.fname+','+appointment.patient.lname +'</div>\
                                                                            <div>Specialty :' + appointment.specialty +'\</div></div>';
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
function renderMonthAppointments() {
  var appointments = localStorage.getItem('appointments');
  appointments = JSON.parse(appointments);
  var a;
  for (a in appointments) {
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
function adjustDate(date){
  date = date.split('T');
  var time = date[1];
  var tempDate = date[0].split('-');
  tempDate = parseInt(tempDate[0]) + '-' + parseInt(tempDate[1]) + '-' + parseInt(tempDate[2]) + '-'; 
  var tempTime = time.split(':');
  if(parseInt(tempTime[1])<30){
    return tempDate+parseInt(tempTime[0])+":00";
  }
  else{
    return tempDate+parseInt(tempTime[0])+":30";
  }
}