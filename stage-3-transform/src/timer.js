export function startTimer (delayInMilliseconds) {
    timer.start();
    setTimeout(stopTimer, delayInMilliseconds);
}

export function stopTimer () {
    timer.stop;
}