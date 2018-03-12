'use strict';

let secret = require('../globals').secret;

let jwt = require('jwt-simple');
let moment = require('moment');

exports.ensureAuth = function(req, res, next)
{
	if(!req.headers.authorization)
	{
		return res.status(403).send({ message: 'Authentication header missing'});
	}

	let token = req.headers.authorization.replace(/['"]+/g, '');
	let payload = jwt.decode(token, secret);

	try
	{
		if(payload.exp <= moment().unix())
		{
			return res.status(401).send({ message: 'Authentication expired'});
		}
	} catch(ex) {

		return res.status(404).send({ message: 'Invalid authorization'});
	}

	req.user = payload;

	next();
};
