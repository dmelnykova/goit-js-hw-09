import { throttle } from 'lodash';
import { Notify } from 'notiflix';

const userData = {};

const formEl = document.querySelector('.form');

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  
  const delay = parseInt(event.target.querySelector('input[name="delay"]').value);
  const step = parseInt(event.target.querySelector('input[name="step"]').value);
  const amount = parseInt(event.target.querySelector('input[name="amount"]').value);
  
  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + (i - 1) * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function handleFormInput(event) {
  if (event.target.name === 'delay') {
    userData.delay = parseInt(event.target.value);
  }
  if (event.target.name === 'step') {
    userData.step = parseInt(event.target.value);
  }
  if (event.target.name === 'amount') {
    userData.amount = parseInt(event.target.value);
  }
}
