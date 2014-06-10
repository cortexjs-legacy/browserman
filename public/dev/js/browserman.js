var io = require('socket.io-client');
var browser = require('bowser').browser;

//support socket.io jsonp
window.io = io;

function Browserman(options) {
	var options = options || {};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.reporter = {
		'mocha': require('./reporter/mocha'),
		'plain': require('./reporter/plain')
	}
}

Browserman.prototype.init = function() {
	var node = document.getElementById('browserman');

	var server = node.getAttribute('data-server');
	var jobId = node.getAttribute('data-jobid');
	var screenshot = node.getAttribute('data-screenshot');

	var connected = false;
	var completed = false;

	var self = this;

	if (!jobId) {
		return;
	}

	// init reporter
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name.toLowerCase(),
			version: browser.version + '.0',
			os: getOS()
		},
		data: {
			logs : [],
			passes: [],
			failures: []
		}
	};

	self.reporter[self.type].run({
		instance: self.instance,
		log: function(data) {
			result.data.logs.push(data);
		},
		pass: function(data) {
			result.data.passes.push(data);
		},
		fail: function(data) {
			result.data.failures.push(data);
		},
		end: function() {
			completed = true;
			location.hash='completed';
		}
	});

	// connect to server
	var socket = io.connect('http://' + server + '/tester');
	socket.on('connect', function() {
		connected = true;
		location.hash='connected';
	});
	
	// when connected and completed, send result to server
	var interval = setInterval(function() {
		if (!connected || !completed) {
			return;
		}
		socket.emit('done', result);
		setTimeout(window.close, 1000);
		clearInterval(interval);
	}, 300);

};

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
}

if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha
	}).init();
} else {
	new Browserman({
		type: 'plain',
		instance: window
	}).init();
}