'use strict';

exports.isAdmin = function(req, res, next)
{
	if(req.user.role != 'ROLE_ADMIN')
	{
		return res.status(403).send({ message: 'Permission denied'});
	}

	next();
};

exports.isKeeper = function(req, res, next)
{
	if(req.user.role != 'ROLE_ADMIN' && req.user.role != 'ROLE_KEEPER')
	{
		return res.status(403).send({ message: 'Permission denied'});
	}

	next();
};
