var countdown;
var timeLeft = document.querySelector('.time-left');

function timer(seconds) {
    const now = Date.now(); // milliseconds
    const then = now + (seconds * 1000); // figure out end time in milliseconds
    displayTimeLeft(seconds);
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
    const display = `${minutes}:${secondsLeft}`;
    timeLeft.textContent = display;
    console.log(minutes, ':', secondsLeft, seconds);
}