'use strict';

let Keeper = require('../models/user');

function list(req, res)
{
	Keeper.find({ role: 'ROLE_KEEPER' }).exec((err, keepers) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'Get error' });
		} else {

			if(keepers)
			{
				res.status(200).send({ keepers });
			} else {

				res.status(200).send({ message: 'No keepers found' });
			}
		}
	});
}

module.exports = { list };