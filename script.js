// # Local Storage Todo's
// In this activity, we will working on storing our todos in `localStorage`. 
// ## Instructions
// * Inside the `init()` function:
//   * Set a variable called `storedTodos` that retrieves the todos from `localStorage` and parses the JSON string to an object.
//   * Check if the todos were retrieved from `localStorage` and if so, set a `todos` variable with the `storedTodos`.
//   * Lastly, render the todos to the DOM.
// * Inside the `storeTodos()` function:
//   * Stringify and set the "todos" key in `localStorage` to the `todos` array.
// ## Hint
// * You will need to use `JSON.stringify` and `JSON.parse`.

var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");   //MINUTES
var secondsDisplay = document.querySelector("#seconds");    //SECONDS
var workMinutesInput = document.querySelector("#work-minutes"); //WORK SCROLL
var restMinutesInput = document.querySelector("#rest-minutes"); //REST SCROLL
var buttons = document.querySelector("#buttons");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var rest = 5;
var work = 25;
var timerWork;
var timerRest;
let status = true;

var timerId;

resetTimer();
playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", changeStatus);

//reading the scroll bar for minutes of Work
workMinutesInput.addEventListener("click", function (event) {
  event.preventDefault();
  work = event.target.value;
  //console.log(newWork);

});
//reading the scroll bar for minutes of Rest
restMinutesInput.addEventListener("click", function (event) {
  event.preventDefault();
  rest = event.target.value;

})

function changeStatus() {
  if (status) {
    status = false;
    statusSpan.textContent = "Resting";
  } else {
    status = true;
    statusSpan.textContent = "Working";
  }
  stopTimer();
}


function startTimer() {
  if (secondsElapsed === 0) {
    if (status) {
      timerWork = work;
      minutesDisplay.textContent = pad(timerWork);
    } else {
      timerRest = rest;
      minutesDisplay.textContent = pad(timerRest);
    }
  }
  timerId = setInterval(renderClock, 1000);
  //return timerId;
}

function pauseTimer() {
  clearInterval(timerId);
  console.log("paused");
}

function stopTimer() {
  clearInterval(timerId);
  resetTimer();

}

function resetTimer() {
  if (status) {
    minutesDisplay.textContent = pad(work);
    secondsDisplay.textContent = "00";
    secondsElapsed = 0;
    timerWork = work;
  } else {
    minutesDisplay.textContent = pad(rest);
    secondsDisplay.textContent = "00";
    secondsElapsed = 0;
    timerRest = rest;
  }

}

function renderClock() {
  secondsElapsed++;
  if (status) {
    totalSeconds = (timerWork * 60) - secondsElapsed;
    secondsDisplay.textContent = pad(totalSeconds % 60);  //use mod to find seconds. 
    minutesDisplay.textContent = pad(parseInt(totalSeconds / 60)); //use integer division to find minutes
  } else {
    totalSeconds = (timerRest * 60) - secondsElapsed;
    secondsDisplay.textContent = pad(totalSeconds % 60);
    minutesDisplay.textContent = pad(parseInt(totalSeconds / 60));
  }
}

function pad(number) {
  return (number < 10 ? '0' : '') + number;
}
