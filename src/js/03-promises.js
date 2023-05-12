import Notiflix from 'notiflix';

const formRef = document.querySelector('form');

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

  const delay = e.currentTarget.delay.value;
  const step = e.currentTarget.step.value;
  const amount = e.currentTarget.amount.value;

  fun(delay, step, amount);
});

const fun = (delay, step, amount) => {
  const max = Math.floor(amount);
  for (let i = 0; i < max; i += 1) {
    createPromise(i + 1, Math.floor(delay) + Math.floor(step) * i)
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
