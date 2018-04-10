'use strict';

let fs = require('fs');
let path = require('path');

let uploadService = require('../services/upload');

function upload(req, res)
{
	let id = req.params.id;
	let category = req.params.category;

	if(req.files.image)
	{
		let file_path = req.files.image.path;

		let photo =
		{
			id: id,
			category: category,
			file_path: file_path
		};

		uploadService.updateDatabase(photo, handleResult);
	} else {

		res.status(500).send({ message: 'No images to upload' });
	}

	function handleResult(err, response)
	{
		if(err)
		{
			//console.log('callback error: ' + err.message);

			uploadService.removeFile(err.files.src);
			res.status(500).send({ message: err.message });
		} else {

			/*console.log('callback res: ' + response.message);
			console.log('file source: ' + response.files.src);
			console.log('file destination: ' + response.files.dest);
			console.log('file old: ' + response.files.old);*/

			uploadService.finishUpload(response.files);
			res.status(200).send({ message: response.message, image: response.files.name });
		}
	}
}

function show(req, res)
{
	let imageFile = req.params.name;
	let category = req.params.category;

	let baseDir = (category == 'animal' ? './uploads/animals/' : './uploads/users/');
	let path_file = baseDir + imageFile;

	fs.exists(path_file, function (exists)
	{
		if(exists)
		{
			res.sendFile(path.resolve(path_file));
		} else {

			res.status(404).send({ message: 'File not found' + path_file });
		}
	});
}

module.exports = { upload, show };