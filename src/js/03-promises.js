import Notiflix from 'notiflix';

const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const formRef = document.querySelector('form');

// const delayRef = Math.floor(delay.value);
// const stepRef = Math.floor(step.value);
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', e => {
  e.preventDefault();

  fun();
});

const fun = () => {
  const max = Math.floor(amount.value);
  for (let i = 0; i < max; i += 1) {
    createPromise(i + 1, Math.floor(delay.value) + Math.floor(step.value) * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};
