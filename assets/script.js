var countdown;
var timeLeft = document.querySelector('.time-left');
var endTime = document.querySelector('.time-end');

function timer(seconds) {
    const now = Date.now(); // milliseconds
    const then = now + (seconds * 1000); // figure out end time in milliseconds
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(function () {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
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
    console.log(timestamp);
    const hours = q.getHours();
    const minutes = q.getMinutes();
    endTime.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}