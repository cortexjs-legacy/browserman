var io = require('./lib/socket.io');
var browser = require('bowser').browser;
var querystring = require('querystring');

function Browserman(options) {
	console.log(options);
	var options = options || {};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.server = options.server || 'localhost:9000';
	this.reporter = {
		'mocha': require('./reporter/mocha'),
		'plain': require('./reporter/plain')
	}
}

Browserman.prototype.init = function() {
	console.log('init browserman');
	var jobId = querystring.parse(location.search.replace('?', '')).browserman_jobid;
	if (!jobId) {
		return;
	}
	var self = this;
	var connected = false;
	var socket = io.connect('http://' + this.server + '/tester');
	socket.on('connect', function() {
		connected = true;
		console.log('connected to server');
	});
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name,
			version: browser.version
		},
		data: {
			passes: [],
			failures: []
		}
	};
	self.reporter[self.type]({
		pass: function(data) {
			result.data.passes.push(data);
		},
		fail: function(data) {
			result.data.failures.push(data);
		},
		end: function() {
			setInterval(function() {
				if (connected) {
					socket.emit('done', result);
					window.close()
				}
			}, 200);
		},
		instance: self.instance
	});
};

if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha
	}).init()
} else {
	new Browserman({
		type: 'plain',
		instance: window
	}).init()
}