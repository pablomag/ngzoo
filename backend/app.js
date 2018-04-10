'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let middlewareAuth = require('./middleware/authenticated');

/* Headers */
app.use((req, res, next) =>
{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

/* Routes */
app.get('/', middlewareAuth.ensureAuth, (req, res) =>
{
	res.status(200).send(
		{
			message: 'Welcome to the API home, logged user'
		}
	);
});

let auth_routes = require('./routes/auth');
let user_routes = require('./routes/user');
let keeper_routes = require('./routes/keeper');
let animal_routes = require('./routes/animal');
let photo_routes = require('./routes/photo');

/* Middleware */
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', auth_routes);
app.use('/api', user_routes);
app.use('/api', keeper_routes);
app.use('/api', animal_routes);
app.use('/api', photo_routes);

/* Exports */
module.exports = app;