const $weatherForm = document.querySelector('form');
const $errorMsg = document.querySelector('#error-msg');
const $successMsg = document.querySelector('#success-msg');

$weatherForm.elements.searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const location = $weatherForm.elements.location.value;
    $successMsg.textContent = `Please wait, searching for ${location}...`;
    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            data.error
                ? ($errorMsg.textContent = 'Error: ' + data.error,
                  $successMsg.textContent = '')
                : ($successMsg.textContent = `It is currently ${data.temperature} degrees Celsius out and ${data.description} in ${data.location}.`,
                  $errorMsg.textContent = '');
        });
    });
});

$weatherForm.elements.detectBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
        return (
            ($errorMsg.textContent = 'Geolocation is not supported by your browser'),
            ($weatherForm.elements.detectBtn.disabled = true) // disable location detect button 
        );
    }

    $weatherForm.elements.detectBtn.disabled = true; // disable button while searching for location

    navigator.geolocation.getCurrentPosition((position, error) => {
        $weatherForm.elements.detectBtn.disabled = false; // re-enable button after getting location

        if (error) {
            return console.log(error);
        }

        $successMsg.textContent = `Please wait, detecting your location...`;
        fetch(`/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                data.error
                    ? ($errorMsg.textContent = 'Error: ' + data.error,
                      $successMsg.textContent = '')
                    : ($successMsg.textContent = `It is currently ${data.temperature} degrees Celsius out and ${data.description} at ${data.location}.`,
                      $errorMsg.textContent = '');
            });
        });
    })
});