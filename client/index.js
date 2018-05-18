'use strict';

const express = require('express');
const router = express.Router();
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const config =  require('./config');

app.use(cors({
	credentials: true,
	origin: true
}));

router.get('/upload', function(req, res) {
    res.setHeader('Content-Type', 'image/png');
    draw().pngStream().pipe(res);
})

app.use('/', express.static('public'))

server.listen(config.port, () => {
	console.log('Listening on port ' + config.port);
});
