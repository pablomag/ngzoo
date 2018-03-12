'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema(
{
	name: String,
	description: String,
	origin: String,
	year: Number,
	image: String,
	keeper: { type: Schema.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('animal', AnimalSchema);