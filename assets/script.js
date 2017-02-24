var countdown;
var counter = 0;
var timeLeft = document.querySelector('.time-left');
var endTime = document.querySelector('.time-end');
var buttons = document.querySelectorAll('[data-time]');
var tally = document.querySelector('.tally');

buttons.forEach(button => button.addEventListener('click', startTimer));

function timer(seconds) {
    clearInterval(timer);
    const now = Date.now(); // milliseconds
    const then = now + (seconds * 1000); // figure out end time in milliseconds
    displayTimeLeft(seconds);
    displayEndTime(then);
    tally.textContent = `Completed: ${counter}`

    countdown = setInterval(function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            counter++;
            tally.textContent = `Completed: ${counter}`
            clearInterval(countdown);
            if (counter >= 4) {
                timer(1800);
            }
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
    endTime.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time))
}
