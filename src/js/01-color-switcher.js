function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// DOM
const bodyElement = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId;

function changeBackgroundColor() {
  bodyElement.style.backgroundColor = getRandomHexColor();
}

function onStart() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function onStop() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

// EventListener
startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);
