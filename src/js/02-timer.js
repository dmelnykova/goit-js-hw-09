import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertMs } from "../plus/convert-time-02";

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

startButton.disabled = true;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

startButton.addEventListener("click", onStart);

function onStart() {
  const endDate = new Date(datetimePicker.value);

  if (isNaN(endDate) || endDate <= Date.now()) {
    alert('Please choose a valid date and time in the future.');
    return;
  }

  startButton.disabled = true;
  intervalId = setInterval(() => {
    updateTimer(endDate);
  }, 1000);
}

flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}

function updateTimer(endDate) {
  const currentDate = new Date();
  const difference = endDate - currentDate;

  if (difference <= 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  updateTimerDisplay(days, hours, minutes, seconds);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerElements.days.textContent = addLeadingZero(days);
  timerElements.hours.textContent = addLeadingZero(hours);
  timerElements.minutes.textContent = addLeadingZero(minutes);
  timerElements.seconds.textContent = addLeadingZero(seconds);
}

