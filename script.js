let isRunning = false;
let startTime;
let lapStartTime;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStop").textContent = "Start";
        isRunning = false;
    } else {
        startTime = new Date().getTime() - (lapStartTime || 0);
        lapStartTime = 0;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStop").textContent = "Stop";
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(formatTime(lapTime));
        lapStartTime = lapTime;
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = new Date().getTime() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(millisecondsFormatted)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
