'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

const uri = 'mongodb://localhost:27017/ngzoo';

const options =
{
	reconnectTries: 3,
	reconnectInterval: 500,
	poolSize: 10,
	bufferMaxEntries: 0
};

mongoose.connect(uri, options)
		.then(() =>
		{
			console.log('Connected to MongoDB');
			app.listen(port, () => { console.log('NodeJs Server online'); });
		},
		err => { console.log(err); }
);