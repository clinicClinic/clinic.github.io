var d = new Date();
var year = d.getFullYear();
var month = d.getMonth();
var day = d.getDate();
var dayOffset = d.getDay();
var monthDays = daysInThisMonth(year,month);
var months =["January","February","March","April","May","June","July","August","September","October","November","December"];
var weekDaysDates = ["","","","","","",""];
var daysString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var appointments = [["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-16-9:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-5-9-11:00-am","doctorName","patient","visit","docId","patId","appId"],["2019-4-9-6:00-pm","doctorName","patient","visit","docId","patId","appId"],["2019-4-9-5:00-pm","doctorName","patient","visit","docId","patId","appId"]];
var doctors = [
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],
  [["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],[["id"],["name"],["lastName"],["birthDate"],["nationality"],["address"],["speciality"]],

];

$(document).ready(function(){
  transTab("dash");
  addChart("chart1");
  addAppointmentModal();
  addDoctorModal();


  hd = buildHeader("dashBoardText,genRightBtnText");
  $("#main-body-header").append(hd);

  $("#dashNav").click(function(){
      transTab("dash");
      addChart("chart1");
      $(this).addClass("active");
  });
  $("#clinicNav").click(function(){
      transTab("clinic");
      $(this).addClass("active");
  });
  $("#appointmentNav").click(function(){
      transTab("clnd");
      $(this).addClass("active");

  });
  $("#docNav").click(function(){
      transTab("doc");
      $(this).addClass("active");
  });
  $("#patintNav").click(function(){
      transTab("pat");
      $(this).addClass("active");
  });

  $(document).on("click",".edtProfBtn",function() {
          $(this).hide();
          $(".profEditField").each(function(){
            var txt = $(this).parent().prev().first().text();
            $(this).val(txt);
          });
          $(".profEditField").show();
          $(".updtProfBtn").show();
      });
  $(document).on("click",".updtProfBtn",function() {
          $(this).hide();
          $(".profEditField").hide();
          $(".profEditField").each(function(){
            var txt = $(this).val();
            $(this).parent().prev().first().text(txt);
          });
          $(".edtProfBtn").show();
      });
  $(document).on("click",".calNext",function() {
          day = monthDays;
          changeDay("inc");
          transTab("clnd");
      });
  $(document).on("click",".calPrev",function() {
          day = 1;
          changeDay("dec");
          day = 1;
          transTab("clnd");
      });
  $(document).on("click",".calDayPrev",function() {
          changeDay("dec");
          daycalendar();
      });
  $(document).on("click",".calDayNext",function() {

          changeDay("inc");
          daycalendar();
      });
  $(document).on("click",".weeksBtn",function() {
    //update the week header dates
    buildWeeksCalHelper();
    buildWeekscalendar(8,24,0);

      });
  $(document).on("click",".monthsBtn",function() {
          day = 1;
          var tmpDate = new Date(year,month);
          dayOffset = tmpDate.getDay();
          transTab("clnd");
      });
  $(document).on("click",".calWeeksNext",function() {
        changeWeekCal("nxt");
        buildWeekscalendar(8,24,0);
      });
  $(document).on("click",".calWeeksPrev",function() {
        changeWeekCal("prev");
        buildWeekscalendar(8,24,0);
      });
  $(document).on("click",".docCardClick",function() {
        buildDoctorProfile(0);
      });
  $(document).on("click",".patCardClick",function() {
        buildPatientProfile(0);
      });
  $(document).on("click",".addNewDoctorCard",function() {
        buildEmptyDoctorProfile(0);
      });
  $(document).on("click",".isCalWeekCell ",function() {

        $("#addAppointmentModal").modal("show");
      });
  $(document).on("click",".dayBtn",function() {
        daycalendar();
      });
  $(document).on("click",".appointment-week-boxs",function(event) {
         addEditableAppointmentModal();
         $("#addAppointmentModal").modal("show");
         event.stopPropagation();
    });
  $(document).on("click",".toggleAppointmentModal",function(event) {

        $("#addAppointmentModal").modal("show");
         event.stopPropagation();
    });
  $(document).on("click",".toggleAddDoctorModal",function(event) {

          $("#addDoctorModal").modal("show");
           event.stopPropagation();
    });
  $(document).on("click",".isMonthDayCell",function(event) {
        var date = $(this).attr('day-cell')
        var date = date.split("-");
        day = date[2];
        daycalendar();
    });
  $(document).on("click",".minimizeBtn",function() {
        $(this).parent().parent().parent().next().slideToggle();
  });
  $(document).on("keyup",".searchAppointmentInList",function() {
    var inp = $(this).val();
    $("[appointment-content]").each(function(){
      var appVal = $(this).attr("appointment-content");
      if(appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
    });
  });
  $(document).on("keyup",".searchDoctorInList",function() {
    var inp = $(this).val();
    $("[doctors-list-content]").each(function(){
      var appVal = $(this).attr("doctors-list-content");
      if(appVal.indexOf(inp) !== -1)
        $(this).show();
      else
        $(this).hide();
    });
  });
});

function transTab(nxt){
  $(".isNav").removeClass("active");
  $("#contentFirstRow").html("");
  if(nxt=="dash"){
    con = dashCont();
  }
  else if(nxt=="clinic"){
    clinicCont();
  }
  else if(nxt=="clnd"){
    cld = appointmentCont();
    $("#contentFirstRow").append(cld);
    renderMonthAppointments();
  }
  else if(nxt=="pat"){
    patintCont();
  }
  else if(nxt=="doc"){
    doctorsCont();
  }
}
//------------------------------------------------------ renders page component based on the clicked menu item
function doctorsCont(){

  $("#contentFirstRow").append(buildDoctorCard("name1","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name2","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name3","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name4","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name1","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name2","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name3","doctorSpecialties"));
  $("#contentFirstRow").append(buildDoctorCard("name4","doctorSpecialties"));
  $("#contentFirstRow").append(buildAddDoctorCard());

}
function patintCont(){

  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));
  $("#contentFirstRow").append(buildPatientCard("name","name1 name2 name3"));

}
function dashCont(){
  $("#contentFirstRow").append( buildStatCard("$2536","EARNINGS (MONTHLY)","danger","fa-calendar"));
  $("#contentFirstRow").append( buildStatCard("$2536","EARNINGS (ANNUAL)","success","dollar-sign"));
  $("#contentFirstRow").append( buildStatCard("$2536","TASKS","primary","fa-comments"));
  $("#contentFirstRow").append( buildStatCard("$2536","PENDING REQUESTS","warning","fa-calendar"));


  //adding chart cards
  $("#contentFirstRow").append(buildChartCard("chart1",7,"chart1"));
  $("#contentFirstRow").append(buildChartCard("chart2",5,"chart2"));
  $("#contentFirstRow").append(buildChartCard("chart3",12,"chart3"));

}
function clinicCont(){

  $("#contentFirstRow").append(buildAddDoctorCard());
  $("#contentFirstRow").append(buildAddAppointmentCard());
  $("#contentFirstRow").append(buildAddAppointmentCard());
  $("#contentFirstRow").append(buildAppointmentslistCard());
  $("#contentFirstRow").append(buildDocListCard());
  $("#contentFirstRow").append(buildMyClinicCont());
}
//---------------------------------------------------- render helpers
function addChart(id){
  reqCount = [34,65,76,35,12,67,23,65,78,23,56];
  provCount = [67,23,65,78,23,56,34,65,76,35,12];
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
function buildTxtFeild(inpId,title,cont,visiable){
  var row = $("<div/>").addClass("row");
  var col0 = $("<div/>").addClass("col-md-4");
  var col1 = $("<div/>").addClass("col-md-4");
  var col2 = $("<div/>").addClass("col-md-4");

  var headingTitle = $("<h5/>").addClass("m-0 font-weight-bold").append("<span/>").text(title);
  var headingCont = $("<h5/>").addClass("m-0 font-weight-bold mdl-color-text--teal-500").append("<span/>").text(cont);

  var customClass = inpId+' profEditField form-control bg-light border-0 small';
  if(visiable){
    var inp = $("<input/>").addClass(customClass).attr("type","text").attr("placeholder","new");
  }
  else{
    var inp = $("<input/>").addClass(customClass).attr("type","text").attr("placeholder","new").css({"display":"none"});
  }


  col0.append(headingTitle);
  col1.append(headingCont);
  col2.append(inp);

  row.append(col0);
  row.append(col1);
  row.append(col2);

  return row;
}
function buildTextArea(inpId,title,cont,visiable){
  var row = $("<div/>").addClass("row");
  var col0 = $("<div/>").addClass("col-md-4");
  var col1 = $("<div/>").addClass("col-md-4");
  var col2 = $("<div/>").addClass("col-md-4");

  var headingTitle = $("<h5/>").addClass("m-0 font-weight-bold").append("<span/>").text(title);
  var headingCont = $("<h5/>").addClass("m-0 font-weight-bold mdl-color-text--teal-500").append("<span/>").text(cont);

  var customClass = inpId+' profEditField form-control bg-light border-0 small';
  if(visiable){
    var inp = $("<textarea/>").addClass(customClass).attr("placeholder","new");
  }
  else{
    var inp = $("<textarea/>").addClass(customClass).attr("placeholder","new").css({"display":"none"});
  }


  col0.append(headingTitle);
  col1.append(headingCont);
  col2.append(inp);

  row.append(col0);
  row.append(col1);
  row.append(col2);

  return row;
}
function buildStatCard(numb,title,color,symbol){

  var txtName = $("<div/>").addClass("text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(title);
  var txtSpec = $("<div/>").addClass("h5 mb-0 font-weight-bold text-gray-800").append("<span/>").text(numb);
  var col = $("<div/>").addClass("col mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var customClass = 'fas '+ symbol +'fa-2x text-gray-300';
  var colAut1 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass(customClass);
  colAut1.append(i);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(col);
  row.append(colAut1);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var customClass  = "card border-left-"+color+" shadow h-100 py-2";
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
function buildDoctorCard(name,doctorSpecialties){
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/img_491471.png").attr("height","60");
  var txtAv =  $("<div/>").addClass("h5 mb-0 font-weight-bold text-primary").append("<span>").text("Available");
  var colAut1 = $("<div/>").addClass("col-auto");
  var center = $("<center/>");

  center.append(img);
  center.append(txtAv);
  colAut1.append(center);

  var txtName = $("<div/>").addClass("h4 text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(name);
  var txtSpec = $("<div/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(doctorSpecialties);
  var col = $("<div/>").addClass("col mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var colAut2 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass("fas fa-user-md  fa-2x text-gray-300");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
  colAut2.append(addAppointmentBtn);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(colAut1);
  row.append(col);
  row.append(colAut2);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-primary shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable docCardClick col-xl-3 col-md-6 mb-4");
  card.append(cardShadow);

  return card;
}
function buildPatientCard(fname,fullName){
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/img_491471.png").attr("height","60");
  var txtAv =  $("<div/>").addClass("h5 mb-0 font-weight-bold text-primary").append("<span>").text("New");
  var colAut1 = $("<div/>").addClass("col-auto");
  var center = $("<center/>");

  center.append(img);
  center.append(txtAv);
  colAut1.append(center);
  var txtName = $("<div/>").addClass("h4 text-xs font-weight-bold text-primary text-uppercase mb-1").append("<span/>").text(fname);
  var txtSpec = $("<div/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text(fullName);
  var col = $("<div/>").addClass("col mr-2");

  col.append(txtName);
  col.append(txtSpec);

  var colAut2 = $("<div/>").addClass("col-auto");
  var i = $("<div/>").addClass("fas fa-user-md  fa-2x text-gray-300");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
  colAut2.append(addAppointmentBtn);

  var row = $("<div/>").addClass("row no-gutters align-items-center");

  row.append(colAut1);
  row.append(col);
  row.append(colAut2);

  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-primary shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable patCardClick col-xl-3 col-md-6 mb-4");
  card.append(cardShadow);

  return card;
}
function buildAddDoctorCard(){
  var heading = $("<h3/>").text("Add Doctor +");
  var row = $("<div/>").addClass("row no-gutters align-items-center");
  row.append(heading);
  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-warning shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable toggleAddDoctorModal col-xl-2 col-md-2 mb-4");
  card.append(cardShadow);

  return card;
}
function buildChartCard(title,size,id){
var canvas = $("<canvas/>").attr("id",id).addClass("chartjs-render-monitor").css({"display": "block","width": "1037px","height":"320px"});
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

var customClass = 'col-xl-'+ size +' col-lg-'+ size;

var card = $("<div/>").addClass(customClass);

card.append(cardShadow);

  return card;
}
function buildHeader(id0,id1){
  var elm0 = $('<i/>').addClass("fas fa-download fa-sm text-white-50");
  var elm1 = $('<a/>').attr("href","#").addClass("d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm");
  var elm4 = $("<span/>").text("Generate Report");
  elm1.append(elm0);
  elm1.append(elm4);
  var elm2 = $('<h1/>').addClass("h3 mb-0 text-gray-800").append("<span/>").text("Dashboard");
  var elm3 = $('<div/>').addClass("d-sm-flex align-items-center justify-content-between mb-4");
  elm3.append(elm2);
  elm3.append(elm1);

return elm3;

  // v = '<div class="d-sm-flex align-items-center justify-content-between mb-4">\
  //         <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>\
  //         <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>\
  //       </div>';
  // return v;
}
function buildDoctorProfile(docIndex){

    var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
    var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

    var aBtnEdit  = $("<a/>").addClass("edtProfBtn btn-sm animated-button thar-one").append("<span/>").text("Edit");
    var aBtnUpdate = $("<a/>").addClass("updtProfBtn btn-sm animated-button thar-three").css({"display":"none"}).append("<span/>").text("Update");

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

    var h2 = $("<h2/>").append("<span/>").text("Image");
    var br0 = $("<br/>");
    var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/img_491471.png").attr("height","150").attr("width","150");

    var center = $("<center/>");
    var col_11_0 = $("<div/>").addClass("col-lg-2");
    center.append(h2);
    center.append(br0);

    center.append(img);
    col_11_0.append(center);

    var h2Info = $("<h2/>").append("<span/>").text("Doctor Information");
    var br1 = $("<br/>");
    var col_11_1 = $("<div/>").addClass("col-lg-10");
    col_11_1.append(h2Info);
    col_11_1.append(br1);
    col_11_1.append(divider);
    col_11_1.append(buildTxtFeild("profNameInp","Name","clinic1",0));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","City","Dammam",0));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","Phone Number","056482145465",0));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTextArea("profNameInp","about","For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer. ",0));
    col_11_1.append(divider.clone());
    col_11_1.append(row0);

    var row2 = $("<div/>").addClass("row");
    row2.append(col_11_0);
    row2.append(col_11_1);

    var cardBody = $("<div/>").addClass("card-body");
    cardBody.append(row2);

    var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Doctor Profile");
    var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
}
function buildPatientProfile(docIndex){

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

    var h2 = $("<h2/>").append("<span/>").text("Image");
    var br0 = $("<br/>");
    var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/img_491471.png").attr("height","150").attr("width","150");

    var center = $("<center/>");
    var col_11_0 = $("<div/>").addClass("col-lg-2");
    center.append(h2);
    center.append(br0);

    center.append(img);
    col_11_0.append(center);

    var h2Info = $("<h2/>").append("<span/>").text("patient Information");
    var br1 = $("<br/>");
    var col_11_1 = $("<div/>").addClass("col-lg-10");
    col_11_1.append(h2Info);
    col_11_1.append(br1);
    col_11_1.append(divider);
    col_11_1.append(buildTxtFeild("profNameInp","Name","clinic1",0));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","City","Dammam",0));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","Phone Number","056482145465",0));
    col_11_1.append(divider.clone());
    col_11_1.append(row0);

    var row2 = $("<div/>").addClass("row");
    row2.append(col_11_0);
    row2.append(col_11_1);

    var cardBody = $("<div/>").addClass("card-body");
    cardBody.append(row2);

    var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Patient Profile");
    var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
}
function buildEmptyDoctorProfile(docIndex){

    var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
    var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

    var aBtnEdit  = $("<a/>").addClass("edtProfBtn btn-sm animated-button thar-one").css({"display":"none"}).append("<span/>").text("Edit");
    var aBtnUpdate = $("<a/>").addClass("updtProfBtn btn-sm animated-button thar-three").append("<span/>").text("Update");

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

    var h2 = $("<h2/>").append("<span/>").text("Image");
    var br0 = $("<br/>");
    var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/img_491471.png").attr("height","150").attr("width","150");

    var center = $("<center/>");
    var col_11_0 = $("<div/>").addClass("col-lg-2");
    center.append(h2);
    center.append(br0);

    center.append(img);
    col_11_0.append(center);

    var h2Info = $("<h2/>").append("<span/>").text("Doctor Information");
    var br1 = $("<br/>");
    var col_11_1 = $("<div/>").addClass("col-lg-10");
    col_11_1.append(h2Info);
    col_11_1.append(br1);
    col_11_1.append(divider);
    col_11_1.append(buildTxtFeild("profNameInp","Name","",1));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","City","",1));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTxtFeild("profNameInp","Phone Number","",1));
    col_11_1.append(divider.clone());
    col_11_1.append(buildTextArea("profNameInp","about","",1));
    col_11_1.append(divider.clone());
    col_11_1.append(row0);

    var row2 = $("<div/>").addClass("row");
    row2.append(col_11_0);
    row2.append(col_11_1);

    var cardBody = $("<div/>").addClass("card-body");
    cardBody.append(row2);

    var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Doctor Profile");
    var cardheader = $("<div/>").addClass("card-header py-3");
    cardheader.append(headerH4);


    var cardShadow = $("<div/>").addClass(" shadow mb-4");
    cardShadow.append(cardheader);
    cardShadow.append(cardBody);

    var card = $("<div/>").addClass("col-lg-12 mb-12");
    card.append(cardShadow);

    $("#contentFirstRow").html("");
    $("#contentFirstRow").append(card);
}
function addAppointmentModal(){

  var btn = $("<button/>").addClass("close").attr("type","button").attr("data-dismiss","modal").text("X");
  var heading = $("<h4/>").addClass("modal-title").text("Add New Appointment").text("Add New Appointment");

  var modalHeader = $("<div/>").addClass("modal-header");
  modalHeader.append(heading);
  modalHeader.append(btn);

  var modalBody = $("<div/>").addClass("modal-body");
  modalBody.append(buildDocPatRow(false));
  modalBody.append(buildSelectDateRow(false));

  var modalFooter = $("<div/>").addClass("modal-footer");
  var btn1 = $("<button/>").addClass("btn btn-primary").attr('data-dismiss','modal').text("Confirm");
  modalFooter.append(btn1);

  var modalCont = $("<div/>").addClass("modal-content");
  modalCont.append(modalHeader);
  modalCont.append(modalBody);
  modalCont.append(modalFooter);

  var modalDial = $("<div/>").addClass("modal-dialog");
  modalDial.append(modalCont);

  var modal = $("<div/>").addClass("modal fade").attr("id","addAppointmentModal").attr("role","dialog");
  modal.append(modalDial);
  $("#contentSecondRow").append(modal);
}
function addDoctorModal(){

  var btn = $("<button/>").addClass("close").attr("type","button").attr("data-dismiss","modal").text("X");
  var heading = $("<h4/>").addClass("modal-title").text("Add New Appointment").text("Add New Doctor");

  var modalHeader = $("<div/>").addClass("modal-header");
  modalHeader.append(heading);
  modalHeader.append(btn);


  var modalBody = $("<div/>").addClass("modal-body");
  modalBody.append('<div class="row"><label class="col-sm-3 col-form-label">First Name</label><input class="form-control col-sm-3"><label class="col-sm-3 col-form-label">Last Name</label><input class="form-control col-sm-3"></div>');
  modalBody.append('<div class="row"><label class="col-sm-3 col-form-label">Address</label><input class="form-control col-sm-3"><label class="col-sm-3 col-form-label">Speciality</label><input class="form-control col-sm-3"></div>');
  modalBody.append('<div class="row"><label class="col-sm-3 col-form-label">Nationality</label><input class="form-control col-sm-3"></div>');
  //modalBody.append();

  var modalFooter = $("<div/>").addClass("modal-footer");
  var btn1 = $("<button/>").addClass("btn btn-primary").attr('data-dismiss','modal').text("Confirm");
  modalFooter.append(btn1);

  var modalCont = $("<div/>").addClass("modal-content");
  modalCont.append(modalHeader);
  modalCont.append(modalBody);
  modalCont.append(modalFooter);

  var modalDial = $("<div/>").addClass("modal-dialog");
  modalDial.append(modalCont);

  var modal = $("<div/>").addClass("modal fade").attr("id","addDoctorModal").attr("role","dialog");
  modal.append(modalDial);
  $("#contentSecondRow").append(modal);
}
function addEditableAppointmentModal(appIndex){

  var btn = $("<button/>").addClass("close").attr("type","button").attr("data-dismiss","modal").text("X");
  var heading = $("<h4/>").addClass("modal-title").text("Add New Appointment").text("Add New Appointment");

  var modalHeader = $("<div/>").addClass("modal-header");
  modalHeader.append(heading);
  modalHeader.append(btn);


  var modalBody = $("<div/>").addClass("modal-body");
  modalBody.append(buildDocPatRow(true));
  modalBody.append(buildSelectDateRow(true));


  var modalFooter = $("<div/>").addClass("modal-footer");
  var btn1 = $("<button/>").addClass("btn btn-warning").attr('data-dismiss','modal').text("Edit");
  modalFooter.append(btn1);

  var modalCont = $("<div/>").addClass("modal-content");
  modalCont.append(modalHeader);
  modalCont.append(modalBody);
  modalCont.append(modalFooter);

  var modalDial = $("<div/>").addClass("modal-dialog");
  modalDial.append(modalCont);

  var modal = $("<div/>").addClass("modal fade").attr("id","addAppointmentModal").attr("role","dialog");
  modal.append(modalDial);
  $("#contentSecondRow").html("");
  $("#contentSecondRow").html(modal);
}
function buildDocPatRow(dsabled){
  var option0 = $("<option />").text("option 0 ");
  var option1 = $("<option />").text("option 1 ");
  var option2 = $("<option />").text("option 2 ");
  var option3 = $("<option />").text("option 3 ");
  var option4 = $("<option />").text("option 4 ");

  if(dsabled)
    var select = $("<select />").attr('disabled','true').addClass("form-control col-sm-3 ");
  else
    var select = $("<select />").addClass("form-control col-sm-3 ");

  select.append(option4);
  select.append(option3);
  select.append(option2);
  select.append(option1);
  select.append(option0);

  var lable0 = $("<label>").addClass("col-sm-3 col-form-label").text("Select parties");
  var lable1 = $("<label>").addClass("col-sm-3 col-form-label").text("With");

  var docs_pat_row = $("<div/>").addClass("row");
  docs_pat_row.append(lable0);
  docs_pat_row.append(select);
  docs_pat_row.append(lable1);
  docs_pat_row.append(select.clone());

  return docs_pat_row;
}
function buildSelectDateRow(dsabled){
  if(dsabled){
    var select0 = $("<select />").attr('disabled','true').addClass("form-control col-sm-3 ");
    var select1 = $("<select />").attr('disabled','true').addClass("form-control col-sm-3 ");
    var select2 = $("<select />").attr('disabled','true').addClass("form-control col-sm-3 ");
  }
  else{
    var select0 = $("<select />").addClass("form-control col-sm-3 ");
    var select1 = $("<select />").addClass("form-control col-sm-3 ");
    var select2 = $("<select />").addClass("form-control col-sm-3 ");
  }

  for(var i = 0 ; i < 11; i++){
    var option = $("<option />").text(months[i]);
    select0.append(option);
  }

  for(var i = 0 ; i < 31; i++){
    var option = $("<option />").text(i+1);
    select1.append(option);
  }

  for(var i = 0 ; i < 24; i++){
    var option0 = $("<option />").text(i+":00");
    var option1 = $("<option />").text(i+":30");
    select2.append(option0);
    select2.append(option1);
  }

  var lable0 = $("<label>").addClass("col-sm-3 col-form-label").text("Date");

  var docs_pat_row = $("<div/>").addClass("row");
  docs_pat_row.append(lable0);
  docs_pat_row.append(select0);
  docs_pat_row.append(select1);
  docs_pat_row.append(select2);

  return docs_pat_row;
}
function buildGenericSearch(classs){
  return '<div class="input-group"><input type="text" class=" '+classs+' form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"><div class="input-group-append"><button class="btn btn-primary" type="button><i class="fas fa-search fa-sm"></i></button></div></div>';
}

//-------------------------------------------------------------------------my clinic related functions display appointment list + clinic profile ----------------------------------
function buildAddAppointmentCard(){
  var heading = $("<h3/>").text("New Appointment +");
  var row = $("<div/>").addClass("row no-gutters align-items-center");
  row.append(heading);
  var cardBody = $("<div/>").addClass("card-body");
  cardBody.append(row);

  var cardShadow = $("<div/>").addClass("card border-left-warning shadow h-100 py-2");

  cardShadow.append(cardBody);

  var card = $("<div/>").addClass("clickable toggleAppointmentModal col-xl-2 col-md-2 mb-4");
  card.append(cardShadow);

  return card;
}
function buildMyClinicCont(){
  var headingEmpty1 = $("<h5/>").addClass("m-0 font-weight-bold ");
  var headingEmpty2 = $("<h5/>").addClass("m-0 font-weight-bold ");

  var aBtnEdit  = $("<a/>").addClass("edtProfBtn btn-sm animated-button thar-one").append("<span/>").text("Edit");
  var aBtnUpdate = $("<a/>").addClass("updtProfBtn btn-sm animated-button thar-three").css({"display":"none"}).append("<span/>").text("Update");

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

  var h2 = $("<h2/>").append("<span/>").text("Image");
  var br0 = $("<br/>");
  var img = $("<img/>").addClass("img-profile rounded-circle").attr("src","img/clinic1.jpg").attr("height","150").attr("width","150");

  var center = $("<center/>");
  var col_11_0 = $("<div/>").addClass("col-lg-2");
  center.append(h2);
  center.append(br0);

  center.append(img);
  col_11_0.append(center);

  var h2Info = $("<h2/>").append("<span/>").text("Clinic Information");
  var br1 = $("<br/>");
  var col_11_1 = $("<div/>").addClass("col-lg-10");
  col_11_1.append(h2Info);
  col_11_1.append(br1);
  col_11_1.append(divider);
  col_11_1.append(buildTxtFeild("profNameInp","Name","clinic1",0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp","Address","Dammam",0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp","location","Dammam",0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTxtFeild("profNameInp","Phone Number","056482145465",0));
  col_11_1.append(divider.clone());
  col_11_1.append(buildTextArea("profNameInp","About","So by colonel hearted ferrars. Draw from upon here gone add one. He in sportsman household otherwise it perceived instantly. Is inquiry no he several excited am. Called though excuse length ye needed it he having. Whatever throwing we on resolved entrance together graceful. Mrs assured add private married removed believe did she.",0));
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

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Doctors");
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

  var card = $("<div/>").addClass("col-lg-12 mb-12");
  card.append(cardShadow);

  return card;
}
function buildAppointmentslistCard(){
  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Appointments");
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

  cardBody.append(appointmentListBody());

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-8 mb-8 mb-4");
  card.append(cardShadow);
  return card;
}
function appointmentListBody(){
  var a;
  var calendar = $("<div/>").addClass("calendar");

  var calBody = buildAppointmentListHeader();
  calendar.append(calBody);
  for (a in appointments) {
    var date = appointments[a][0].split("-");
    var hour = date[3];
    var date = date[0]+"-"+date[1]+"-"+date[2];
    var emptDiv = $("<div/>").addClass("appointment_list_body").attr("appointment-Content",hour+"-"+date +"-"+appointments[a][1]+"-"+ appointments[a][2] +"-"+appointments[a][3]);
    emptDiv.append("<div class='appointment_list_side calendar_hov'><div/>");
    emptDiv.append("<div class='appointment_list_box'>"+hour+"<div/>");
    emptDiv.append("<div class='appointment_list_box'>"+date+"<div/>");
    emptDiv.append("<div class='appointment_list_box calendar_hov'>"+appointments[a][1]+"<div/>");
    emptDiv.append("<div class='appointment_list_box calendar_hov'>"+appointments[a][2]+"<div/>");
    emptDiv.append("<div class='appointment_list_box_last'>"+appointments[a][3]+"<div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}
function buildAppointmentListHeader(){
  var calBody = $("<div/>").addClass("appointment_list_body");
    calBody.append("<div class='appointment_list_box_first_row'><div/>");
    calBody.append("<div class='appointment_list_box_first_row'>Hour<div/>");
    calBody.append("<div class='appointment_list_box_first_row'>Date<div/>");
    calBody.append("<div class='appointment_list_box_first_row'>Doctor<div/>");
    calBody.append("<div class='appointment_list_box_first_row'>Patient<div/>");
    calBody.append("<div class='appointment_list_box_first_last'>Visit<div/>");
  return calBody;
}
//doc stuff
function buildDocListCard(){
  var row = $("<div/>").addClass("row");
  var col10 = $("<div/>").addClass("col-md-6");
  var col2 = $("<div/>").addClass("col-md-6");

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Doctors");
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

  cardBody.append(buildDoctorsListBody());

  var cardShadow = $("<div/>").addClass("card shadow ");
  cardShadow.append(cardheader);
  cardShadow.append(cardBody);
  var card = $("<div/>").addClass("col-lg-4 mb-4 mb-4");
  card.append(cardShadow);
  return card;
}
function buildDoctorsListBody(){
  var a;
  var calendar = $("<div/>").addClass("calendar");
  var calBody = buildDocListHeader();
  calendar.append(calBody);
  for (a in doctors) {
    var emptDiv = $("<div/>").addClass("doctor_list_body").attr("doctors-list-Content",doctors[a][0]+"-"+doctors[a][0] +"-"+doctors[a][1]+"-"+ doctors[a][2] +"-"+doctors[a][3]);
    emptDiv.append("<div class='doctor_list_side calendar_hov'><div/>");
    emptDiv.append("<div class='doctor_list_box'>"+doctors[a][0]+"<div/>");
    emptDiv.append("<div class='doctor_list_box'>"+doctors[a][1]+"<div/>");
    emptDiv.append("<div class='doctor_list_box'>"+doctors[a][2]+"<div/>");
    emptDiv.append("<div class='doctor_list_box_last'>"+doctors[a][3]+"<div/>");
    calendar.append(emptDiv);
  }
  return calendar;
}
function buildDocListHeader(){
  var calBody = $("<div/>").addClass("doctor_list_body");
    calBody.append("<div class='doctor_list_box_first_row'><div/>");
    calBody.append("<div class='doctor_list_box_first_row'>First Name<div/>");
    calBody.append("<div class='doctor_list_box_first_row'>Last Name<div/>");
    calBody.append("<div class='doctor_list_box_first_row'>Speciality<div/>");
    calBody.append("<div class='doctor_list_box_first_row'>Address<div/>");

  return calBody;
}

// ------------------------------------------------------------------------------------------ calendar related functions------------------------------------------------------------------------------------------
                        //------------------------------------------------------------------monthly calendar------------------------------------------------------------------
function daycalendar(){

  var weekBtn = $("<a/>").addClass("weeksBtn btn-sm animated-button thar-one").text("Weeks");
  var monthBtn = $("<a/>").addClass("monthsBtn btn-sm animated-button thar-one").text("Months");
  var dayBtn = $("<a/>").addClass(" btn-sm animated-button thar-one").text("Day");
  var title = $("<h3/>").addClass("m-0 font-weight-bold mdl-color-text--blue-A200 ").text(year+','+months[month]+'-'+(month+1));
  var prevBtn = $("<a/>").addClass("calDayPrev btn-sm animated-button thar-four").text("Previous");
  var nextBtn = $("<a/>").addClass("calDayNext btn-sm animated-button thar-three").text("Next");

  var colEmpty = $("<div/>").addClass("col-md-1");
  var dayBtnCol = $("<div/>").addClass("col-md-1");
  dayBtnCol.append(dayBtn);
  var weekBtnCol= $("<div/>").addClass("col-md-1");
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

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Appointments");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
  renderWeeksAppointments();


}
function buildDaylycalendar(){
  var daysArray = ["sun","mon","tue","wed","thu","fri","sat"];
  var tempDay = new Date(year,month,day);
  var v = "";
  v+= '<div class="dayly_calendar_box  day">HR</div>';
  v+= '<div class="dayly_calendar_box  day"><center>'+months[month]+'-'+daysArray[tempDay.getDay()]+'-'+day+'</center></div>';
  var am = "am";
  for(var i = 0 ; i<24; i++){
    if(i==12)
      am = "pm";
    v+= '<div class="dayly_calendar_box  day">'+((i%12)+1)+':00 '+am+'</div>';
    v+= '<div appointmentcount="0" day-hour-cell="'+year+'-'+(month+1)+'-'+day+'-'+((i%12)+1)+':00-'+am+'" class="clickable isCalWeekCell dayly_calendar_box calendar_hov day"></div>';
    v+= '<div class="dayly_calendar_box  day">--</div>';
    v+= '<div appointmentcount="0" day-hour-cell="'+year+'-'+(month+1)+'-'+day+'-'+((i%12)+1)+':30-'+am+'" class="clickable isCalWeekCell dayly_calendar_box calendar_hov day"></div>'
  }

  var calendarHeader = $("<div/>").addClass("dayly_calendar_header");
  var calBody = $("<div/>").addClass("dayly_calendar_body");
  calBody.append(v);
  var calendar = $("<div/>").addClass("calendar");
  calendar.append(calendarHeader);
  calendar.append(calBody);

  return calendar;
}
//this function renders the main appointment Monthly calendar
function appointmentCont(){
  var weekBtn = $("<a/>").addClass("weeksBtn btn-sm animated-button thar-one").text("Weeks");
  var monthBtn = $("<a/>").addClass("btn-sm animated-button thar-one").text("Months");
  var dayBtn = $("<a/>").addClass("dayBtn btn-sm animated-button thar-one").text("Day");
  var title = $("<h3/>").addClass("m-0 font-weight-bold mdl-color-text--blue-A200 ").text(year+','+months[month]+'-'+(month+1));
  var prevBtn = $("<a/>").addClass("calPrev btn-sm animated-button thar-four").text("Previous");
  var nextBtn = $("<a/>").addClass("calNext btn-sm animated-button thar-three").text("Next");

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

  var headerH4 = $("<h4/>").addClass("m-0 font-weight-bold text-primary").append("<span/>").text("Appointments");
  var addAppointmentBtn = $("<button/>").addClass("toggleAppointmentModal dropShadHov mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored").text("+");
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
  $("#contentFirstRow").append(card);

}
function buildMonthlycalendar(){
  var calendarHeader = $("<div/>").addClass("monthly_calendar_header");
  var daysArray = ["sun","mon","tue","wed","thu","fri","sat"];
  for(var i = 0 ; i < 7; i++){
    calendarHeader.append($("<div/>").text(daysArray[i]));
  }
  var calCells = buildcalendarCells();
  var calendar = $("<div/>").addClass("calendar");
  calendar.append(calendarHeader);
  calendar.append(calCells);

  return calendar;
}
//this function return a full card conatining the calendar
function buildcalendarCells(){
  dayStart = new Date(year, month, 1);
  dayStart = dayStart.getDay();
  w = buildCalWeek(dayStart);
  return w;
}

//this function helps adding the blocks of the monthly calendar $year is the globally defined year  ===== $ dayStart is when the current month starts i.e  1 => sat
function buildCalWeek(dayStart){

  //days is the varible that contains html blocks as string
  var days = "";
  //adding empty block in the begining
  for(f = 0 ; f < dayStart ; f++){
    days += '<div class="mdl-color--blue-50	 monthly_calendar_day_box day"></div>';
  }
  //keep adding daily blocks == to the number of days in the current month
  for(k = 1 ; k <= monthDays ; k++){
    days += '<div  appointmentCount="0" day-cell="'+year+'-'+(1+month)+'-'+k+'" class="isMonthDayCell monthly_calendar_day_box calendar_hov day"><div>'+k+'</div><a style="display:none"class="btn btn-warning-no-bg btn-circle btn-sm"></a></div>';
  }
  // adds how much block needed to complete the row
  remians = 7 - ((monthDays + dayStart ) % 7);
  //filling empty blocks
  for(j = 0 ; j < remians ; j++){
    days += '<div class="mdl-color--blue-50	 monthly_calendar_day_box day"></div>';
  }
  //return the blocks as string
  return '<div class="monthly_calendar_body">'+days+'</div>';
}
//this function return the number of days in the giving month and year
function daysInThisMonth(year,month) {
  var now = new Date();
  return new Date(year, month+1, 0).getDate();
}
                      //------------------------------------------------------------------weekly calendar------------------------------------------------------------------
//this function renders the weeklly calendar
function buildWeekscalendar(s,e,am){
  //v is the hourly blocks as string
  var v = buildDayHours(s,e,am);
  var w = '';
  w ='<div class="col-lg-12 mb-12">\
    <div class=" shadow mb-4">\
      <div class="card-header py-3">\
      <div class="row">\
        <div class="col-auto"><h4 class="m-0 font-weight-bold text-primary">Appointments</h4></div>\
        <div class="col-auto"><button class=" toggleAppointmentModal mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">+</button></div>\
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
            <h3 class="m-0 font-weight-bold mdl-color-text--blue-A200 ">'+year+','+months[month]+'-'+(month+1)+'</h3>\
          </div>\
          <div class="col-md-1"> <a class="calWeeksPrev btn-sm animated-button thar-four">Prev</a></div>\
          <div class="col-md-1"><a class="calWeeksNext btn-sm animated-button thar-three">Next</a></div>\
        </div> <br>\
        <div class="calendar">\
          <div class="weekly_calendar_header">\
            <div >Hr</div>\
            <div calss="weekSunDate" day-head-date="'+weekDaysDates[0]+'">Sun('+weekDaysDates[0]+')</div>\
            <div day-head-date="'+weekDaysDates[1]+'">Mon('+weekDaysDates[1]+')</div>\
            <div day-head-date="'+weekDaysDates[2]+'">Tus('+weekDaysDates[2]+')</div>\
            <div day-head-date="'+weekDaysDates[3]+'">Wen('+weekDaysDates[3]+')</div>\
            <div day-head-date="'+weekDaysDates[4]+'">Thi('+weekDaysDates[4]+')</div>\
            <div day-head-date="'+weekDaysDates[5]+'">Fri('+weekDaysDates[5]+')</div>\
            <div day-head-date="'+weekDaysDates[6]+'">Sat('+weekDaysDates[6]+')</div>\
          </div>\
          <div class="weekly_calendar_body">'+v+'\
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
function buildDayHours(s,e,am){
  var timePeroid = ['am','pm'];
  var v = "";
  for(var i = s; i < e ; i++){
    if((i%12)==0)
      am = (am+1) % 2;
    v += '\
    <div class="weekly_calendar_box calendar_hov day">'+(i % 12)+':00 '+timePeroid[am]+'</div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[0]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[1]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[2]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[3]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[4]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[5]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[6]+'-'+(i % 12)+':00-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div  class="weekly_calendar_box calendar_hov day">--</div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[0]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[1]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[2]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[3]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[4]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[5]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>\
    <div appointmentCount="0" day-hour-cell="'+weekDaysDates[6]+'-'+(i % 12)+':30-'+timePeroid[am]+'" class="clickable isCalWeekCell weekly_calendar_box calendar_hov day"></div>';

  }
  return v;
}

//this function builds an array to help identifies hourlly blocks date
function buildWeeksCalHelper(){
  var tmpOffSet = dayOffset+1;
  //calculate the start of the week
  for(var i = 0 ; i<tmpOffSet;i++){
    changeDay("dec");
  }

  //calculate the start of the week
  for(var i =0 ; i<7;i++){
    changeDay("inc");
    weekDaysDates[i]= year+"-"+(month+1)+"-"+day;
  }


}
function changeDay(chng){
  if(chng=="inc"){
    day++;
    //check if the day changes the month and year
    if(day>monthDays){
      var tempMonth = (month+1)%12;
      if(tempMonth<month)
        year++;
      month = tempMonth;
      day = 1;
      var tmpDate = new Date(year,month);
      dayOffset = tmpDate.getDay();
      monthDays = daysInThisMonth(year,month);
    }
  }
  else{
    day--;
    //check if the day changes the month and year
    if(day<1){
      var tempMonth = (month-1)%12;
      //adjust if tempMonth is negative
      if(tempMonth<0){
        tempMonth = tempMonth + 12;
        year--;
      }
      month = tempMonth;
      day = daysInThisMonth(year,month);
      var tmpDate = new Date(year,month);
      dayOffset = tmpDate.getDay();
      monthDays = daysInThisMonth(year,month);
      }
    }
  }
//this function change the calendar based on the action spicisfied
function changeWeekCal(chng){
  if(chng == "nxt"){
  	//calculate the start of the week
    for(var i =0 ; i<7;i++){
      changeDay("inc");
      weekDaysDates[i]= year+"-"+(month+1)+"-"+day;
    }
  }
  else{
      //calculate the start of the week
      for(var i =0 ; i<14;i++){
        changeDay("dec");
      }
      //calculate the start of the week
      for(var i =0 ; i<7;i++){
        changeDay("inc");
        weekDaysDates[i]= year+"-"+(month+1)+"-"+day;
      }
    }
  }//
  //rendering the appointments
  function renderWeeksAppointments(){
    var a;
    for (a in appointments) {
      var elmnt = $('.isCalWeekCell[day-hour-cell="'+appointments[a][0]+'"]');
      var count = elmnt.attr("appointmentCount");
      if(count<2){
        var appBox = '<div  appointment-index="" class="appointment-week-boxs">'+appointments[a][1]+'</div>';
        elmnt.append(appBox);
      }
      else if(count == 2 ){
        var appBox = '<div  appointment-index="" class="appointment-week-boxs">+</div>';
        elmnt.append(appBox);
      }
        count++;
        elmnt.attr("appointmentCount",count);
    }
  }

  //rendering the appointments
  function renderMonthAppointments(){
    var a;
    for (a in appointments) {
      var tempDate = appointments[a][0].split("-");
      tempDate = tempDate[0]+"-"+tempDate[1]+"-"+tempDate[2];
      var elmnt = $('.isMonthDayCell[day-cell="'+tempDate+'"]');
      var count = elmnt.attr("appointmentCount");
      count++;
      elmnt.find('a').show().html(count);
      elmnt.attr("appointmentCount",count);
    }
  }
