'use strict';

//let User = require('../models/user');
let Animal = require('../models/animal');

let uploadService = require('../services/upload');

function create(req, res)
{
	let animal = new Animal;
	let data = req.body;

	const params = JSON.parse(data.json);

	if(params && params.name)
	{
		Animal.findOne({ name: { $regex : new RegExp(params.name, "i") } },
			(err, dupe) =>
			{
				if(err)
				{
					res.status(500).send({ message: 'Error while querying the DB'});
				} else {

					if (!dupe)
					{
						animal.name = params.name;
						animal.description = params.description;
						animal.origin = params.origin;
						animal.year = params.year;
						animal.image = params.image;
						animal.keeper = req.user.sub;

						animal.save((err, data) =>
						{
							if (err)
							{
								res.status(500).send({ message: 'Error while saving data' });
							} else {

								if (!data)
								{
									res.status(400).send({ message: 'Could not add animal' });
								} else {

									res.status(200).send({ animal: data });
								}
							}
						});
					} else {

						res.status(500).send({ message: 'There is an animal with that name already registered in our DB' });
					}
				}
			});
	} else {

		res.status(400).send({ message: 'No data received'});
	}
}

function list(req, res)
{
	Animal.find({}).populate({ path: 'keeper' }).exec((err, animals) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'There was an error querying the DB', error: err });
		} else {

			if(!animals)
			{
				res.status(404).send({ message: 'There are no animals to list' });
			} else {

				res.status(200).send({ animals });
			}
		}
	});
}

function read(req, res)
{
	let animalId = req.params.id;

	Animal.findById(animalId).populate({ path: 'keeper' }).exec((err, animal) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'There was an error querying the DB', error: err });
		} else {

			if (!animal) {
				res.status(404).send({message: 'The animal does not exist'});
			} else {

				res.status(200).send({animal});
			}
		}
	});
}

function update(req, res)
{
	let animalId = req.params.id;
	let data = req.body;

	const update = JSON.parse(data.json);

	Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animal) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'Could not update animal' });
		} else {

			if(animal)
			{
				res.status(200).send({ animal });
			} else {

				res.status(404).send({ message: 'Could not find animal' });
			}
		}
	});
}

function destroy(req, res)
{
	let animalId = req.params.id;

	Animal.findByIdAndRemove(animalId, (err, animal) =>
	{
		if(err)
		{
			res.status(500).send({ message: 'Could not delete animal' });
		} else {

			if(animal)
			{
				let deleteFile = "./uploads/animals/" + animal.image;

				if (animal.image != null)
				{
					uploadService.removeFile(deleteFile);
				}

				res.status(200).send({ animal });
			} else {

				res.status(404).send({ message: 'Could not find animal' });
			}
		}
	});
}

module.exports = { create, read, update, destroy, list };