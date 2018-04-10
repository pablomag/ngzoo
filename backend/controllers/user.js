'use strict';

let bcrypt = require('bcrypt-nodejs');

let User = require('../models/user');

function create(req, res)
{
	let user = new User;
	let params = req.body;

	if(params)
	{
		User.findOne({ email: params.email.toLowerCase() },
		(err, dupe) =>
		{
			if(err)
			{
				res.status(500).send({ message: 'Error while querying the DB'});
			} else {

				if (!dupe)
				{
					user.name = params.name;
					user.surname = params.surname;
					user.email = params.email.toLowerCase();
					user.role = params.role;
					user.image = null;

					bcrypt.hash(params.password, null, null, (err, hash) =>
					{
						user.password = hash;
						user.save((err, data) =>
						{
							if (err)
							{
								res.status(500).send({ message: 'Error while saving data' });
							} else {

								if (!data)
								{
									res.status(400).send({ message: 'Could not register user' });
								} else {

									res.status(200).send({ user: data });
								}
							}
						});
					});
				} else {

					res.status(500).send({ message: 'User email already registered in our DB' });
				}
			}
		});
	} else {

		res.status(400).send({ message: 'No data received'});
	}
}

function read(req, res)
{
	res.status(200).send({ message: 'Read user'	});
}

function update(req, res)
{
	let userId = req.params.id;
	let update = req.body;

	if(update.password)
	{
		bcrypt.hash(update.password, null, null, (err, hash) =>
		{
			if(err)
			{
				delete update.password;
				console.log('password not updated');
				saveData();
			} else {

				update.password = hash;
				console.log('password encrypted');
				saveData();
			}
		});
	} else {

		delete update.password;
		console.log('no password provided');
		saveData();
	}

	function saveData()
	{
		User.findByIdAndUpdate(userId, update, {new: false}, (err, user) =>
		{
			if(err)
			{
				res.status(500).send({ message: 'Could not update user' });
			} else {

				if(user)
				{
					res.status(200).send({ user: user });
				} else {

					res.status(404).send({ message: 'Could not find user' });
				}
			}
		});
	}
}

function destroy(req, res)
{
	let userId = req.params.id;

	User.findByIdAndRemove(userId, (err, user) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'Could not delete user' });
		} else {

			if(user)
			{
				res.status(200).send({ user });
			} else {

				res.status(404).send({ message: 'Could not find user' });
			}
		}
	});
}

function list(req, res)
{
	User.find({}).exec((err, users) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'Get error' });
		} else {

			if(users)
			{
				res.status(200).send({ users });
			} else {

				res.status(200).send({ message: 'No users found' });
			}
		}
	});
}

module.exports = { create, read, update, destroy, list };