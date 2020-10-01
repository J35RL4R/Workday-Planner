$(document).ready(function(){
    if(!localStorage.getItem('workDay')) {
      updateTasks(workDay);
    } else {
      updateTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })

let workDay = {
    "9AM": "",
    "10AM": "",
    "11AM": "",
    "12PM": "",
    "1PM": "",
    "2PM": "",
    "3PM": "",
    "4PM": "",
    "5PM": "",
  };
  
  
  
  $('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourStr = $(this).siblings("div").text();
    
    saveSchedule(hourStr, value);
  });
  
  let counter = 1;
  for(const property in workDay) {
    let userInput = "#user-input" + counter;
    $(userInput).text(workDay[property]);
    let timeSlot = "#time" + counter;
    let present = moment().hour();
    let timeString = $(timeSlot).text();
    let timeNumber = hourNumberHourStr(timeString);  
    if(timeNumber < present) {
      $(userInput).addClass("past");
    } else if (timeNumber > present) {
      $(userInput).addClass("future");
    } else {
      $(userInput).addClass("present");
    }
    counter ++;
  }
  
  function hourNumberHourStr(hourStr) {
    switch(hourStr) {
      case "9AM": return 9;
      case "10AM": return 10;
      case "11AM": return 11;
      case "12PM": return 12;
      case "1PM": return 13;
      case "2PM": return 14;
      case "3PM": return 15;
      case "4PM": return 16;
      case "5PM": return 17;
    }
  }
  
 // function loadCorrectDataset() {
   // result = localStorage.getItem('workDay')
   // return (result ? result : workDay);
  //}
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(workDayObject) {
    localStorage.setItem('workDay', JSON.stringify(workDayObject));
  }
  
  function saveSchedule(hourStr, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourStr] = val
  
    saveToLocalStorage(workHours);
  }

  function updateTasks(Object) {
    var  calendarRow = $('.calendar-row')
    console.log(calendarRow)
    calendarRow.each(function() {
      let task = $(this).children("div");
      $(this).children("textarea").text(Object[task.text()]);

    })
  }