var stns = {
  "BDM":"Bedford",
  "FLT":"Flitwick",
  "HLN":"Harlington",
  "LEA":"Leagrave",
  "LUT":"Luton",
  "LTN":"Luton Airport Parkway",
  "HPD":"Harpenden",
  "SAC":"St Albans",
  "RDT":"Radlett",
  "ELS":"Elstree & Borehamwood",
  "MIL":"Mill Hill Broadway",
  "HEN":"Hendon",
  "CRI":"Cricklewood",
  "WHP":"West Hampstead Thameslink",
  "KTN":"Kentish Town Station",
  "STP":"London St Pancras Intl",
  "ZFD":"Farringdon",
  "CTK":"City Thameslink"
};

function add_stn(stn, dir, select) {
  // if (stns.hasOwnProperty(stn)) {
  var option = document.createElement("option");
  option.value = stn;
  option.text = dir + ' ' + stns[stn];
  var sel_obj = document.getElementById(select);
  sel_obj.add(option, sel_obj[-1]);
}

window.onload = function build_select() {
  for(var stn in stns) {
    var fradd = add_stn(stn, 'From', 'fr_stn');
    var toadd = add_stn(stn, 'To', 'to_stn');
  }
}

function get_stn(fr_to) {
  var sel = document.getElementById(fr_to);
  return sel.options[sel.selectedIndex].value;
}

function pad(number){
  if ( number < 10 ) {
    number = "0" + number;
  }
  return number;
}

function show_link () {

  var d = new Date();

  // Go forward 5 mins & round to nearest 5
  var coeff = 1000 * 60 * 5;
  d = new Date( Math.round((d.getTime()+coeff)/ coeff) * coeff)

  var dd = d.getDate(); 
  var mm = d.getMonth()+1;
  var yy = d.getYear();  
  var th = d.getHours();
  var tm = d.getMinutes();

  var today = "" + pad(dd) + pad(mm) + (yy - 100);
  var time = "" + pad(th) + pad(tm);

  var tm = d.getTime();

  var fr_stn = get_stn('fr_stn');
  var to_stn = get_stn('to_stn');
  if ( fr_stn == to_stn ) {
      alert("From & To stations must not be the same.\n");
      return false;
  }
  var frto = fr_stn + "/" + to_stn;

  var url;
  if( navigator.userAgent.match(/Mobile/i) ){
      url = 'http://m.nationalrail.co.uk/pj/plan/' + frto + '/' + today + '/' + time + '/dep';
  } else {
      url = 'http://ojp.nationalrail.co.uk/service/timesandfares/' + frto + '/today/' + time + '/dep';
  }
  // http://traintimes.org.uk/STP/LUT/

  window.location.href = url;

}
// document.getElementById("timetable").bgcolor="#1a1a7a";

