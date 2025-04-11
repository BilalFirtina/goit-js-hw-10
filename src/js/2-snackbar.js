import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="delay"]');
const fulfilled = document.querySelector('input[value="fulfilled"]');
const rejected = document.querySelector('input[value="rejected"]');
const button = document.querySelector('button[type="submit"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (fulfilled.checked) {
        resolve(
          iziToast.success({
            title: '✅ ',
            message: `Fulfilled promise in ${Number(input.value)}ms`,
            position: 'topRight',
          })
        );
      } else {
        reject(
          iziToast.error({
            title: '❌ ',
            message: `Rejected promise in ${Number(input.value)}ms`,
            position: 'topRight',
          })
        );
      }
    });
  }, Number(input.value));
});
