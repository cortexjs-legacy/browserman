var io = require('./lib/socket.io');
var browser=require('./lib/bowser').browser;

var socket = io.connect('/worker', {});

socket.on('connect', function() {
	console.log('connected');

	socket.emit('register', {
		name: browser.name,
		version: browser.version
	});

	socket.on('job', function(job) {
		window.open(job.url);
	});

	socket.on('disconnect', function() {

	});


})