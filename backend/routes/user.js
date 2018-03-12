'use strict';

let express = require('express');
let UserController = require('../controllers/user');

let Auth = require('../middleware/authenticated');
let Role = require('../middleware/roles');

let api = express.Router();

api.post('/user/register', UserController.create);
api.get('/users', Auth.ensureAuth, Role.isAdmin, UserController.list);
api.get('/user/:id', Auth.ensureAuth, Role.isAdmin, UserController.read);
api.put('/user/:id', Auth.ensureAuth, Role.isAdmin, UserController.update);
api.delete('/user/:id', Auth.ensureAuth, Role.isAdmin, UserController.destroy);

module.exports = api;