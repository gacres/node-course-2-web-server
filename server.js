const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var PORT = 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// ***** WE ARE IN MAINTENANCE MODE *****
//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Brytek Home Page',
        welcomeMessage: 'Brytek welcome message. Some lorem ipsum would be appropriate but will take too long...'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 404,
        errorMessage: 'Oh geez, dude! 404 :('
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});