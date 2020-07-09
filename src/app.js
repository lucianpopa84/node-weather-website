const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucian Popa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lucian Popa'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lucian Popa',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }); 
        }

        forecast(latitude, longitude, (error, { temperature, description } = {}) => {
            if (error) {
                return res.send({ error }); 
            }

            res.send({
                location,
                temperature,
                description,
                address: req.query.address
            });
        });
    })
});

app.get('/help/*', (eq, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Lucian Popa',
        errorMsg: 'Help article not found. Please try another help link.'
    });
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Lucian Popa',
        errorMsg: 'Page not found. Please try another link.'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});