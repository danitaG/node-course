const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

//to set up partials
hbs.registerPartials(__dirname + '/views/partials')
//to set the variables used in hbs
app.set('view engine', 'hbs');

app.use(express.static(__dirname+ '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.writeFile('server.log', log + '/n' , (err) => {
        console.log('unable to connect to log');
    })

    next();
});

app.use
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is a bad request'
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



