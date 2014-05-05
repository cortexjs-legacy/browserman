var io = require('./lib/socket.io');
var browser = require('bowser').browser;
var querystring = require('querystring');
var html2canvas = require('./lib/html2canvas');
var canvas2image = require('./lib/canvas2image');

function Browserman(options) {
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

	var query = querystring.parse(location.search.replace('?', ''));
	var jobId = query.browserman_jobid;
	var needsSceenshot = query.browserman_screenshot=='false'?false:true;
	var connected = false;
	var self = this;

	if (!jobId) {
		return;
	}

	var socket = io.connect('http://' + this.server + '/tester');
	socket.on('connect', function() {
		connected = true;
	});
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name.toLowerCase(),
			version: browser.version+'.0',
			os:getOS()
		},
		data: {
			passes: [],
			failures: []
		}
	};
	self.reporter[self.type].run({
		instance: self.instance,
		pass: function(data) {
			result.data.passes.push(data);
		},
		fail: function(data) {
			result.data.failures.push(data);
		},
		end: function() {
			var interval = setInterval(function() {
				if (!connected) {
					return;
				}
				if (needsSceenshot) {
					html2canvas(document.body, {
						onrendered: function(canvas) {
							var img = canvas2image.saveAsJPEG(canvas, true);
							result.screenshot = img.outerHTML;
							socket.emit('done', result);
							setTimeout(window.close, 500);
						}
					});
				} else {
					socket.emit('done', result);
					setTimeout(window.close, 500);
				}
				clearInterval(interval);
			}, 200);
		}
	});
};

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
} 

var server=document.getElementById('browserman').getAttribute('data-server');
if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha,
		server:	server

	}).init();
} else {
	new Browserman({
		type: 'plain',
		instance: window,
		server:server
	}).init();
}