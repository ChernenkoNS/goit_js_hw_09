import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {},
};

flatpickr(`#datetime-picker`, options);

const actionForm = document.querySelector('form.newForm');
const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

class Countdown {
  #intervalID = null;
  #onChangeCallback = () => {};

  constructor({ onChange } = {}) {
    if (onChange) this.#onChangeCallback = onChange;
  }

  start(value) {
    this.#intervalID = setInterval(() => {
      const delta = new Date(value) - Date.now();
      if (Math.sign(delta) === -1) {
        stop();
        return;
      }

      const convert = convertMs(delta);
      this.#onChangeCallback({
        days: Countdown.formatValue(convert.days),
        hours: Countdown.formatValue(convert.hours),
        minutes: Countdown.formatValue(convert.minutes),
        seconds: Countdown.formatValue(convert.seconds),
      });
    }, 1000);
  }

  stop() {
    clearInterval(this.#intervalID);
  }

  static formatValue(value) {
    return value.toString().padStart(2, '0');
  }
}

const countdown = new Countdown({ onChange: onCountdownChange });

actionForm.addEventListener('submit', e => {
  e.preventDefault();

  if (e.currentTarget.dataset.action === 'start') {
    if (+new Date(input.value) < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    button.textContent = 'stop';
    e.currentTarget.dataset.action = 'stop';
    input.disabled = true;
    countdown.start(input.value);
  } else {
    button.textContent = 'start';
    e.currentTarget.dataset.action = 'start';
    input.disabled = false;

    countdown.stop();
  }
});

function onCountdownChange({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}

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
