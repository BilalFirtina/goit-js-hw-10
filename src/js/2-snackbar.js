import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const time = document.querySelector('input[name="delay"]');
const fulfilled = document.querySelector('input[value="fulfilled"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  const timeLeft = time.value;
  const checked = fulfilled.checked;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checked) {
        resolve(`✅ Fulfilled promise in ${timeLeft}ms`);
      } else {
        reject(`❌ Rejected promise in ${timeLeft}ms`);
      }
    }, timeLeft);
  });
  promise
    .then(val => {
      iziToast.success({
        message: val,
        position: 'topRight',
      });
    })
    .catch(val => {
      iziToast.error({
        message: val,
        position: 'topRight',
      });
    });
  form.reset();
});
