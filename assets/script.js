var countdown;
var counter = 0;
var timeLeft = document.querySelector('.time-left');
var endTime = document.querySelector('.time-end');
var buttons = document.querySelectorAll('[data-time]');
var tally = document.querySelector('.tally');
var alarm = document.querySelector('#alarm');
var stopButton = document.querySelector('#stop');
var stopTimerButton = document.querySelector('#stopTimer');
stopButton.style.visibility = 'hidden';
stopButton.addEventListener('click', stopAlarm);
stopTimerButton.addEventListener('click', stopTimer);
buttons.forEach(button => button.addEventListener('click', startTimer));
//for testing
//alarm.src = "assets/sounds/clock-chimes-daniel_simon.mp3";
//playAlarm();
function timer(seconds, isBreak) {
    if (seconds === 300) {
        isBreak = true;
    }
    clearInterval(countdown);
    const now = Date.now(); // milliseconds
    const then = now + (seconds * 1000); // figure out end time in milliseconds
    displayTimeLeft(seconds);
    displayEndTime(then);
    tally.textContent = `Completed: ${counter}`

    countdown = setInterval(function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            if (!isBreak) {
                counter++;
            }
            tally.textContent = `Completed: ${counter}`
            clearInterval(countdown);

            playAlarm();

            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.round(seconds % 60);
    const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    timeLeft.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    var q = new Date(timestamp);
    const hours = q.getHours();
    const minutes = q.getMinutes();
    endTime.textContent = `End time: ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time));
}

function playAlarm(arguments) {
    stopButton.style.visibility = 'visible';
    endTime.textContent = '';
    alarm.play();
}
function stopAlarm() {
    stopButton.style.visibility = 'hidden';
    timeLeft.textContent = 'No time selected';
    endTime.textContent = 'grab a coffee'
    alarm.pause();

    if (counter >= 4) {
        counter = 0;
        timer(1800);
    } else {
       timer(300, true);
    }
}
function stopTimer() {
    clearInterval(countdown);
    timeLeft.textContent = 'No time selected';
    endTime.textContent = 'grab a coffee';
    document.title = "Pomodoro.works";
}

//alarm sounds
document.querySelector('#lnkRailroad').addEventListener("click", loadSound);
document.querySelector('#lnkClock').addEventListener("click", loadSound);
document.querySelector('#lnkFrontDesk').addEventListener("click", loadSound);
document.querySelector('#lnkCheering1').addEventListener("click", loadSound);
document.querySelector('#lnkCheering2').addEventListener("click", loadSound);

function loadSound() {
    alarm.src = this.getAttribute('data-value');
    alarm.load();
    //clear any checkmarks
    span = document.getElementsByClassName('currentAlarm');
    [].slice.call(span).forEach(function (span) {
        span.innerHTML = "";
    });
    var checkmark = this.getElementsByClassName("currentAlarm")[0];
    checkmark.innerHTML = ' &#10003;';

}






