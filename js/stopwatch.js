// Access the stopwatch milliseconds, seconds, and minutes elements.
const watchMilliseconds = document.getElementById("watchMilliseconds");
const watchSeconds = document.getElementById("watchSeconds");
const watchMinutes = document.getElementById("watchMinutes");

// Access the lap milliseconds, seconds, and minutes elements.
const lapMilliseconds = document.getElementById("lapMilliseconds");
const lapSeconds = document.getElementById("lapSeconds");
const lapMinutes = document.getElementById("lapMinutes");

// Access the stopwatch reset, start, and lap button elements.
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");

// Access the lap times and lap data table elements.
const lapTime = document.getElementById("lapTime");
const lapTimeData = document.getElementById("lapTimeData");
const currentTblBody = document.getElementById("lapData");

resetButton.addEventListener("click", resetStopwatch);
startButton.addEventListener("click", displayButton);
lapButton.addEventListener("click", recordLapTime);

let timeInterval;
let lapInterval;
let lapNumber = 0;
let isLapButton = false;

/**
 * Controls the stopwatch using the keyboard keys Space, R and L.
 * @param {object} e - The event that occurs when a key on the keyboard is released. 
 */
document.body.onkeyup = function (e) {
    switch (e.keyCode) {
        case 32:
            displayButton()
            break;
        case 82:
            resetStopwatch();
            break;
        case 76:
            recordLapTime();
            break;
        default:
            break;
    }
}

/**
 * Changes the start button to display either the Start, Stop or Resume button 
 * and starts or resumes the stopwatch time or the lap time.
 */
function displayButton() {
    if (startButton.innerHTML == "Start") {
        startStopwatch();
        startButton.innerHTML = "Stop";
        startButton.style.backgroundColor = "#ff0000";
    } else if (startButton.innerHTML == "Stop") {
        clearInterval(timeInterval);
        clearInterval(lapInterval);
        startButton.innerHTML = "Resume";
        startButton.style.backgroundColor = "#ffc000"
    } else {
        let previousMilliseconds = parseInt(watchMilliseconds.innerHTML);
        let previousSeconds = parseInt(watchSeconds.innerHTML);
        let previousMinutes = parseInt(watchMinutes.innerHTML);
        startStopwatch(previousMilliseconds, previousSeconds, previousMinutes);

        if (isLapButton) {
            previousMilliseconds = parseInt(lapMilliseconds.innerHTML);
            previousSeconds = parseInt(lapSeconds.innerHTML);
            previousMinutes = parseInt(lapMinutes.innerHTML);
            startStopwatch(previousMilliseconds, previousSeconds, previousMinutes, false);
        }
        startButton.innerHTML = "Stop";
        startButton.style.backgroundColor = "#ff0000";
    }
}

/**
 * Starts the stopwatch.
 * @param {number} previousMilliseconds - Previous milliseconds of the stopwatch.
 * @param {number} previousSeconds - Previous seconds of the stopwatch.
 * @param {number} previousMinutes - Previous minutes of the stopwatch.
 * @param {boolean} isStopwatch - Flag value to choose between starting the stopwatch time and starting the lap time.
 */
function startStopwatch(previousMilliseconds = 0, previousSeconds = 0, previousMinutes = 0, isStopwatch = true) {
    let startTime = new Date();

    if (isStopwatch) {
        timeInterval = setInterval(() => {
            const currentTime = watchTime(startTime, previousMilliseconds, previousSeconds, previousMinutes);
            displayTime(currentTime.stopwatchMilliseconds, currentTime.stopwatchSeconds, currentTime.stopwatchMinutes, true);
        }, 10);
    } else {
        lapInterval = setInterval(() => {
            const currentTime = watchTime(startTime, previousMilliseconds, previousSeconds, previousMinutes);
            displayTime(currentTime.stopwatchMilliseconds, currentTime.stopwatchSeconds, currentTime.stopwatchMinutes, false);
        }, 10);
    }
}

/**
 * Returns the stopwatch current milliseconds, seconds, and minutes.
 * @param {object} startTime - The date object.
 * @param {number} previousMilliseconds - Previous milliseconds of the stopwatch.
 * @param {number} previousSeconds - Previous seconds of the stopwatch.
 * @param {number} previousMinutes - Previous minutes of the stopwatch.
 * @returns {object} The object represents the stopwatch current milliseconds, seconds, and minutes.
 */
function watchTime(startTime, previousMilliseconds = 0, previousSeconds = 0, previousMinutes = 0) {
    let currentMilliseconds = 0;
    let currentSeconds = 0;
    let currentMinutes = 0;
    let timeElapsed;

    timeElapsed = Date.now() - startTime.getTime();

    currentMilliseconds = timeElapsed + previousMilliseconds;
    if (currentMilliseconds > 1000) {
        currentMilliseconds %= 1000;
    }

    currentSeconds = (timeElapsed / 1000) + previousSeconds;
    if (currentSeconds > 60) {
        currentSeconds %= 60;
    }

    currentMinutes = (timeElapsed / 60000) + previousMinutes;

    return {
        stopwatchMilliseconds: currentMilliseconds,
        stopwatchSeconds: currentSeconds,
        stopwatchMinutes: currentMinutes
    }
}

/**
 * Resets the stopwatch and lap time and clears the lap time information.
 * @param {boolean} isLap - Flag value to choose between resetting all the times and resetting the lap time.
 */
function resetStopwatch(isLap = true) {
    if (startButton.innerHTML != "Start") {
        if (isLap) {
            if (startButton.innerHTML == "Stop" || startButton.innerHTML == "Resume") {
                startButton.style.backgroundColor = "#00ff00";
                clearInterval(timeInterval);
                clearInterval(lapInterval);

                watchMilliseconds.innerHTML = 00.toString().padStart(2, "0");
                watchSeconds.innerHTML = 00.toString().padStart(2, "0");
                watchMinutes.innerHTML = 00.toString().padStart(2, "0");

                lapMilliseconds.innerHTML = 00.toString().padStart(2, "0");
                lapSeconds.innerHTML = 00.toString().padStart(2, "0");
                lapMinutes.innerHTML = 00.toString().padStart(2, "0");

                startButton.innerHTML = "Start";
            }
            while (currentTblBody.firstChild) {
                currentTblBody.removeChild(currentTblBody.firstChild);
            }
            lapTimeData.hidden = true;
            lapTime.style.display = "none";
            isLapButton = false;
            lapNumber = 0;

        } else {
            clearInterval(lapInterval);
            lapMilliseconds.innerHTML = 00.toString().padStart(2, "0");
            lapSeconds.innerHTML = 00.toString().padStart(2, "0");
            lapMinutes.innerHTML = 00.toString().padStart(2, "0");
        }
    }
}

/**
 * Display the stopwatch time or the lap time in the correct format.
 * @param {number} milliseconds - Milliseconds to display on the stopwatch or lap time.
 * @param {number} seconds - Seconds to display on the stopwatch or lap time.
 * @param {number} minutes - Minutes to display on the stopwatch or lap time.
 * @param {boolean} isStopwatch - Flag value to choose between starting the stopwatch time and starting the lap time.
 */
function displayTime(milliseconds = 0, seconds = 0, minutes = 0, isStopwatch) {
    if (isStopwatch) {
        watchMilliseconds.innerHTML = parseInt(milliseconds).toString().padStart(3, "00");
        watchSeconds.innerHTML = parseInt(seconds).toString().padStart(2, "0");
        watchMinutes.innerHTML = parseInt(minutes).toString().padStart(2, "0");
    } else {
        lapMilliseconds.innerHTML = parseInt(milliseconds).toString().padStart(3, "00");
        lapSeconds.innerHTML = parseInt(seconds).toString().padStart(2, "0");
        lapMinutes.innerHTML = parseInt(minutes).toString().padStart(2, "0");
    }
}

/**
 * Record and display the lap time information.
 */
function recordLapTime() {
    let currentLapMilliseconds = lapMilliseconds.innerHTML.toString().padStart(3, "00");
    let currentLapSeconds = lapSeconds.innerHTML;
    let currentLapMinutes = lapMinutes.innerHTML;

    if (startButton.innerHTML != "Resume") {
        resetStopwatch(false);
    }
    if (startButton.innerHTML == "Stop") {
        lapTime.style.display = "block";
        isLapButton = true;
        lapNumber++;
        lapTimeData.hidden = false;
        startStopwatch(0, 0, 0, false);

        let overallMilliseconds = watchMilliseconds.innerHTML.toString().padStart(3, "00");
        let overallSeconds = watchSeconds.innerHTML;
        let overallMinutes = watchMinutes.innerHTML;
        let overallTime = overallMinutes + ":" + overallSeconds + ":" + overallMilliseconds;
        let currentLapTime = currentLapMinutes + ":" + currentLapSeconds + ":" + currentLapMilliseconds;

        if (lapNumber == 1) {
            createTbodyElement(lapNumber, overallTime, overallTime);
        } else {
            createTbodyElement(lapNumber, currentLapTime, overallTime);
        }
    }
}

/**
 * Create new table body elements to record the lap time information.
 * @param {number} lapNumber - Current lap number.
 * @param {string} lapTime - Current lap time.
 * @param {string} overallTime - Current overall time.
 */
function createTbodyElement(lapNumber, lapTime, overallTime) {
    const lapData = [lapNumber, lapTime, overallTime];
    const dataTr = document.createElement("tr");

    for (let i = 0; i < lapData.length; i++) {
        const dataTd = document.createElement("td");
        const dataTdText = document.createTextNode(lapData[i]);
        dataTd.appendChild(dataTdText);
        dataTr.appendChild(dataTd);
    }
    currentTblBody.appendChild(dataTr);
}