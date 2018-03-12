'use strict';

let secret = require('../globals').secret;

let jwt = require('jwt-simple');
let moment = require('moment');

exports.createToken = function(user)
{
	let payload =
	{
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(1, 'day')
	};

	return jwt.encode(payload, secret);
};