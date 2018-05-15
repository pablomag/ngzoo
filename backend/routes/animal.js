'use strict';

let express = require('express');
let AnimalController = require('../controllers/animal');

let Auth = require('../middleware/authenticated');
let Role = require('../middleware/roles');

let api = express.Router();

api.post('/animal/create', [ Auth.ensureAuth, Role.isKeeper ], AnimalController.create);
api.get('/animals', AnimalController.list);
api.get('/animal/:id', AnimalController.read);
api.put('/animal/:id', [ Auth.ensureAuth, Role.isKeeper ], AnimalController.update);
api.delete('/animal/:id', [ Auth.ensureAuth, Role.isKeeper ], AnimalController.destroy);

module.exports = api;