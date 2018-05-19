'use strict';

const express = require('express');
const router = express.Router();
const http = require('http');
const url = require('url');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const axios = require('axios')
const config =  require('./config');

app.use(cors({
	credentials: true,
	origin: true
}));

app.use('/', express.static('public'));

server.listen(config.port, () => {
	console.log('Listening on port ' + config.port);
});
