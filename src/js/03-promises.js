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
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
