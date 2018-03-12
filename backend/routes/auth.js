'use strict';

let express = require('express');
let AuthController = require('../controllers/auth');

let api = express.Router();

api.post('/user/login', AuthController.login);

module.exports = api;