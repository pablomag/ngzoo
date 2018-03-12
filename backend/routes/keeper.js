'use strict';

let express = require('express');
let KeeperController = require('../controllers/keeper');

let api = express.Router();

api.get('/keepers', KeeperController.list);

module.exports = api;