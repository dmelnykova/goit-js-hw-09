import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");

const options = {
  enableTime: true,
  time_24hr: true,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let intervalId;

function updateTimer(endDate) {
  const currentDate = new Date();
  const difference = endDate - currentDate;

  if (difference <= 0) {
    clearInterval(intervalId);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

startButton.addEventListener("click", () => {
  console.log("Button clicked");
  const endDate = new Date(datetimePicker.value);
  intervalId = setInterval(() => {
    updateTimer(endDate);
  }, 1000);
});
