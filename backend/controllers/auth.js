'use strict';

let bcrypt = require('bcrypt-nodejs');

let User = require('../models/user');

let jwt = require('../services/jwt');

function login(req, res)
{
	let params = req.body;

	if(params.email != undefined && params.password != undefined)
	{
		User.findOne({ email: params.email.toLowerCase() },
			(err, user) =>
			{
				if(err)
				{
					res.status(500).send({ message: 'Error while querying the DB'});
				} else {

					if (user)
					{
						bcrypt.compare(params.password, user.password, (err, check) =>
						{
							if (check)
							{
								if (params.gettoken == 'true')
								{
									res.status(200).send({ token: jwt.createToken(user) });
								} else {

									res.status(200).send({ user: user });
								}
							} else {

								res.status(200).send({ message: 'User or password is incorrect' });
							}
						});
					} else {

						res.status(500).send({ message: 'User not registered in our DB' });
					}
				}
			});
	} else {

		res.status(400).send({ message: 'No data received'});
	}
}

module.exports = { login };