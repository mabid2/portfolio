// Require the Express Module
var express = require('express');
// Require path
var path = require('path');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var client = require('twilio')('AC2363c40b04f0d75012253bf11c842264', '3788473dca73fb1230effbbefe58148c')

  /// Flash messages
var flash = require('connect-flash');
var app = express();
var session = require('express-session');


// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');


// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: false }));

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './css')));
app.use(express.static(path.join(__dirname, './js')));

app.use(bodyParser.json());

// This sets the location where express will look for the ejs views
app.set('client', __dirname + '/client');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

var routes_setter = require('./server/config/routes.js')
routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(3000, function() {
    console.log("listening on port 3000");
})
