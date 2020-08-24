const request = require('request');

const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const limit = 1;

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}&limit=${limit}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        } else if (!body.features.length) {
            callback(`No location found for ${body.query} search term. Try another search.`, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

const revGeocode = (lat, lon, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?access_token=${ACCESS_TOKEN}&limit=${limit}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined);
        } else if (!body.features.length) {
            callback(`No location found for ${body.query} search term. Try another search.`, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = { geocode, revGeocode };