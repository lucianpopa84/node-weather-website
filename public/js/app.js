console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('#error-msg');
const successMsg = document.querySelector('#success-msg');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    successMsg.textContent = `Please wait, searching for ${location}...`;
    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
      response.json().then((data) => {
        data.error ? (errorMsg.textContent = 'Error: ' + data.error, successMsg.textContent = '') :
        (successMsg.textContent = `It is currently ${data.temperature} degrees Celsius out and ${data.description} in ${data.location}.`, errorMsg.textContent ='')
      });
    });
})
