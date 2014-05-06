var io = require('./lib/socket.io');
var browser = require('bowser').browser;
var querystring = require('querystring');
var html2canvas = require('./lib/html2canvas');
var canvas2image = require('./lib/canvas2image');

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
	var query = querystring.parse(location.search.replace('?', ''));
	var jobId = node.getAttribute('data-jobid') || query.browserman_jobid;
	var needsSceenshot = (!query.browserman_screenshot || query.browserman_screenshot== 'false') ? false : true;
	
	var connected = false;
	
	var self = this;

	if (!jobId) {
		return;
	}

	var socket = io.connect('http://' + server + '/tester');
	socket.on('connect', function() {
		connected = true;
	});
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name.toLowerCase(),
			version: browser.version + '.0',
			os: getOS()
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