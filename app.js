var express = require('express'),
	bodyParser  = require('body-parser'),
	morgan      = require('morgan');

var app = express();

var config = require("./config/config");
require('./config/mongoose')();

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

require("./app/routes/main.routes")(app);

app.listen(3000, function (){
 console.log('Project run on port 3000');
});