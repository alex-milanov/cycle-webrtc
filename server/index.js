'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const ffmpeg = require('fluent-ffmpeg');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// middleware
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.resolve(__dirname, '../web/dist')));

app.get('/video/:filename', function(req, res) {
	res.contentType('flv');
	// make sure you set the correct path to your video file storage
	var pathToMovie = path.resolve(__dirname, '../assets', req.params.filename);
	var proc = ffmpeg(pathToMovie)
		// use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
		.preset('flashvideo')
		// setup event handlers
		.on('end', function() {
			console.log('file has been converted succesfully');
		})
		.on('error', function(err) {
			console.log('an error happened: ' + err.message);
		})
		// save to stream
		.pipe(res, {end: true});
});

// ssl stuff
const privateKey = fs.readFileSync(path.resolve(__dirname, 'ssl/server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, 'ssl/server.crt'), 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	passphrase: 'booya123'
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

console.log('HTTP Server listening at 8080');
console.log('HTTPS Server listening at 8443');
