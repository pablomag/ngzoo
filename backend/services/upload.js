'use strict';

let fs = require('fs');
let move = require('mv');

let User = require('../models/user');
let Animal = require('../models/animal');

exports.updateDatabase = function(photo, callback)
{
	//console.log('Processing file in updateDB method');
	//console.log(photo);
	let id = photo.id;
	let category = photo.category;
	let file_source = photo.file_path;
	let file_dest = null;
	let file_old = null;

	let file_split = file_source.split('\\');
	let file_name = file_split[1];

	let ext_split = file_name.split('\.');
	let file_ext = ext_split[1];

	let err, res, update;

	let files = { src: file_source, dest: file_dest, old: file_old };

	if(file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg' || file_ext == 'jpeg')
	{
		//console.log('Passed the extension check');
		update = { image: file_name };

		if(category == 'animal')
		{
			//console.log('It is an animal');
			Animal.findByIdAndUpdate(id, update, { new: false }, (err, animal) =>
			{
				if(err)
				{
					//console.log('original err: ' + err);

					err = { status: 500, message: 'Could not update animal image', files: files };
					console.log(err);
					return callback(err);
				} else {

					if(animal)
					{
						file_old = (animal.image != null ? "./uploads/animals/" + animal.image : null);
						file_dest = "./uploads/animals/" + file_name;

						files = { src: file_source, dest: file_dest, old: file_old, name: file_name };

						res = { status: 200, message: 'Database updated', data: animal, files: files };
						//console.log(res);
						return callback(err, res);
					} else {

						err = { status: 404, message: 'Could not find animal to assign image', files: files };
						//console.log(err);
						//should delete the file here
						return callback(err);
					}
				}
			})
		} else if(category == 'user') {

			//console.log('It is a user');
			User.findByIdAndUpdate(id, update, { new: false }, (err, user) =>
			{
				if(err)
				{
					//console.log('original err: ' + err);
					err = { status: 500, message: 'Could not update user image', files: files };
					//console.log(err);
					return callback(err);
				} else {

					if(user)
					{
						file_old = (user.image != null ? "./uploads/users/" + user.image : null);
						file_dest = "./uploads/users/" + file_name;

						let files = { src: file_source, dest: file_dest, old: file_old, name: file_name };

						res = { status: 200, message: 'Database updated', data: user, files: files };
						//console.log(res);
						return callback(err, res, files);
					} else {

						err = { status: 404, message: 'Could not find user to assign image', files: files };
						//console.log(err);
						return callback(err);
					}
				}
			})
		} else {

			err = { status: 404, message: 'Category does not exist', files: files };
			//console.log(err);
			return callback(err);
		}
	} else {

		err = { status: 500, message: 'Invalid file type', files: files };
		//console.log(err);
		return callback(err);
	}
};

exports.finishUpload = function(files)
{
	if(files.dest)
	{
		//console.log(files.src);
		//console.log(files.dest);

		move(files.src, files.dest, function(err)
		{
			if(err)
			{
				removeFile(files.src);
				//console.log(err);
			} else {

				if(files.old != null) { removeFile(files.old); /*console.log('Old file deleted ' + files.old);*/ }
				//console.log('File moved to ' + files.dest);
			}
		});
	}
};

let removeFile = function(file)
{
	if(file)
	{
		fs.unlink(file, (err) =>
		{
			if (err)
			{
				//console.log(err);
			} else {

				//console.log('File deleted: ' + file);
			}
		});
	}
};

exports.removeFile = removeFile;