import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/confetti.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const time = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
let seconds = document.querySelector('span[data-seconds]');
let minutes = document.querySelector('span[data-minutes]');
let hours = document.querySelector('span[data-hours]');
let days = document.querySelector('span[data-days]');
let result = { days, hours, minutes, seconds };
let userSelectedDate = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate - Date.now() > 0) {
      button.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
    }
  },
};
button.onclick = () => {
  countDown();
  intervalId = setInterval(countDown, 1000);
  button.disabled = true;
  time.disabled = true;
  time.style.cursor = 'auto';
};

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
  return String(value).padStart(2, '0');
}
function countDown() {
  result = convertMs(userSelectedDate - Date.now());
  seconds.textContent = addLeadingZero(result.seconds);
  minutes.textContent = addLeadingZero(result.minutes);
  hours.textContent = addLeadingZero(result.hours);
  days.textContent = addLeadingZero(result.days);
  if (result.seconds <= 0) {
    clearInterval(intervalId);
    seconds.textContent = '00';
    time.disabled = false;
    time.style.cursor = 'pointer';
    return;
  }
}
flatpickr(time, options);
