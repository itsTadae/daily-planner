// Digital Clock
function digi() {
  var date = new Date(),
      hour = date.getHours(),
      minute = checkTime(date.getMinutes()),
      ss = checkTime(date.getSeconds());
  // fetch time
  function checkTime(i) {
    if( i < 10 ) {
      i = "0" + i;
    }
    return i;
  }

if ( hour > 12 ) {
  hour = hour - 12;
  if ( hour == 12 ) {
    hour = checkTime(hour);
  document.getElementById("tt").innerHTML = hour+":"+minute+":"+ss+" AM";
  }
  else {
    hour = checkTime(hour);
    document.getElementById("tt").innerHTML = hour+":"+minute+":"+ss+" PM";
  }
}
else {
  document.getElementById("tt").innerHTML = hour+":"+minute+":"+ss+" AM";;
}
var time = setTimeout(digi,1000);
}

// jquery 
$(document).ready(function() {
  
  const test = false;

  const now = moment().format('MMMM Do YYYY');

  let nowHour24 = moment().format('H');
  
  let nowHour12 = moment().format('h');

  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);
  
  const saveIcon = "./images/save-regular.svg"; 

  let textStorage = JSON.parse(localStorage.getItem("textStorage"));

  if (textStorage !== null) {
    textArr = textStorage;
  } else {
    // Create Arrays
    textArr = new Array(9);
    textArr[4] = "";
  }

  if (test) {console.log("",textArr); }

  let $scheduleDiv = $('#scheduleContainer');
 
  $scheduleDiv.empty();

  // Show Row Color
  function updateRowColor ($hourRow,hour) { 

    if (test) {console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
      // Display Color depending on the time  
      // console.log times
      if (test) {console.log("lessThan"); }
      $hourRow.css("background-color","crimson")
    } else if (hour > nowHour24) {
      if (test) {console.log("greaterThan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) {console.log("equalTo"); }
      $hourRow.css("background-color","lightgrey")
    }
  };
  
  // Save Data
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    textArr[$index] = $value;
    // store text
    $(`#saveid-${$index}`).removeClass('shadowText');
    localStorage.setItem("textStorage", JSON.stringify(textArr));
  });  
  
  $(document).on('change','input', function(event) {
    event.preventDefault();  

    let i = $(this).attr('hour-index');

    $(`#saveid-${i}`).addClass('shadowText');
  });
  
  if (test) {console.log("current time",nowHour12); }

  // Daily Clock est
  for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;
    
    let $rowDiv = $('<div>');
    
    $rowDiv.addClass('row');
    $rowDiv.addClass('scheduleRow');
    $rowDiv.attr('hour-index',hour);
  

    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    const $timeBoxSpn = $('<span>');
    
    $timeBoxSpn.attr('class','timeBox');
    
    // Schedule Time
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else if (hour < 12) {
      displayHour = hour;
      ampm = "am";
    } else {
      displayHour = hour;
      ampm = "pm";
    }
    
    // Display Scheduler
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    $dailyPlanSpn.val( textArr[index] );
    
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);


    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);


    updateRowColor($rowDiv, hour);
    
    $scheduleDiv.append($rowDiv);
  };
 
});