import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');
let userSelectedDate = null;
let id = null;

flatpickr(timePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate - Date.now() > 0) {
      button.disabled = false;
    } else {
      button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  if (String(value).length < 2) {
    return String(value).padStart(2, '0');
  }
  return String(value);
}

function countDown() {
  if (userSelectedDate - Date.now() > 0) {
    let dif = convertMs(userSelectedDate - Date.now());
    seconds.textContent = addLeadingZero(dif.seconds);
    minutes.textContent = addLeadingZero(dif.minutes);
    hours.textContent = addLeadingZero(dif.hours);
    days.textContent = addLeadingZero(dif.days);
    button.disabled = true;
    button.style.cursor = 'not-allowed';
    timePicker.disabled = true;
    timePicker.style.cursor = 'not-allowed';
    if (
      seconds.textContent === '00' &&
      minutes.textContent === '00' &&
      hours.textContent === '00' &&
      days.textContent === '00'
    ) {
      clearInterval(id);
      seconds.textContent = '00';
      minutes.textContent = '00';
      hours.textContent = '00';
      days.textContent = '00';
      timePicker.disabled = false;
      timePicker.style.cursor = 'pointer';
      button.style.cursor = 'auto';
    }
  }
}
button.onclick = () => {
  clearInterval(id);
  id = setInterval(() => {
    countDown();
  }, 1000);
};
