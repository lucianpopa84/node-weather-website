const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    const units = 'metric';
    const time = Math.floor(Date.now()/1000); // current time
    const lang = 'en';
    const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&units=${units}&dt=${time}&appid=${API_KEY}&lang=${lang}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service`, undefined)
        } else if (body.cod) {
            callback(`Unable to find location, ${body.message}`, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temp,
                description: body.current.weather[0].description
            });
        }   
    })
}

module.exports = forecast;