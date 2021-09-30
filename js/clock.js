const day = document.getElementById("day");
const month = document.getElementById("month");
const dayMonth = document.getElementById("dayMonth");
const year = document.getElementById("year");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const timePeriod = document.getElementById("timePeriod");

/**
 * Display the current date and the time into 12 hour AM/PM format.
 */
function currentDateTime() {
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthOfYear = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentMonth = currentDate.getMonth();
    let currentDayMonth = currentDate.getDate();

    let currentYear = currentDate.getFullYear();
    let currentSeconds = currentDate.getSeconds();
    let currentMinutes = currentDate.getMinutes();
    let currentHours = currentDate.getHours();

    if (hours < 12) {
        timePeriod.innerHTML = "AM";
    } else {
        timePeriod.innerHTML = "PM";
        currentHours %= 12;
    }

    day.innerHTML = dayOfWeek[currentDay];
    month.innerHTML = monthOfYear[currentMonth];
    dayMonth.innerHTML = currentDayMonth;
    year.innerHTML = currentYear;
    seconds.innerHTML = currentSeconds.toString().padStart(2, "0");
    minutes.innerHTML = currentMinutes.toString().padStart(2, "0");
    hours.innerHTML = currentHours.toString().padStart(2, "0");

    setInterval(currentDateTime, 1000);
}

currentDateTime();