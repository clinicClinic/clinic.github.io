
$(document).ready(function(){
 //find the selected language
   // !!fetch selected language
   var lang = "en";
   // text selector
  var selectedLang = { en : {
                            sideBarTitle: "Clinic ",
                            dashboardMenu: "Dashboard",
                            dividerHeading1: "My Clinic",
                            doctorsMenuText: "Doctors",
                            appointmentMenuTxt: "Appointments",
                            patientMenuText: "Patients",
                            monthlyIncomeCardTxt: "EARNINGS (MONTHLY)"
                           },
                    ar:   {
                            sideBarTitle: "عيادة ",
                            dashboardMenu: "الإحصائيات",
                            dividerHeading1: "عيادتي",
                            doctorsMenuText: "الأطباء",
                            appointmentMenuTxt: "المواعيد",
                            patientMenuText: "المراجعين",
                            monthlyIncomeCardTxt: "(الأرباح (الشهرية"
                           }
                  };

$(".isText").each(function(){
  id = $(this).attr('id');
  $(this).text(selectedLang[lang][id]);
});

});
