'use strict';

let express = require('express');
let PhotoController = require('../controllers/photo');

let multipart = require('connect-multiparty');

let Upload = multipart({ uploadDir: 'uploads'});

let Auth = require('../middleware/authenticated');
let Role = require('../middleware/roles');

let api = express.Router();

api.post('/:category/:id/upload', [ Auth.ensureAuth, Role.isKeeper, Upload ], PhotoController.upload);
api.get('/photo/:name', [ Auth.ensureAuth, Upload ], PhotoController.show);

module.exports = api;