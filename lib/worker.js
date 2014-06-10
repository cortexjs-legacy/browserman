var util = require("util");
var events = require("events");
var semver = require('semver');
var token = require('./token');

function Worker(options) {
	this.workerId = token();
	this.browser = {
		name: options.name.toLowerCase(),
		version: options.version + '.0',
		os: options.os
	};
	this.setMaxListeners(0);
}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(job) {
	this.emit('job', {
		jobId: job.jobId,
		requirement: job.requirement,
		url: job.url
	});
}

Worker.prototype.reload = function() {
	this.emit('reload');
}

Worker.prototype.meet = function(requirement) {
	var browsers = requirement.browser;
	if (!browsers || browsers.length == 0) {
		return true;
	}
	var browser = this.browser;
	
	for (var i = browsers.length - 1; i >= 0; i--) {
		var pair = browsers[i].split('@');
		var name = pair[0];
		var version = pair[1];

		if (browser.name == name && !version) {
			return true;
		}
		if (browser.name == name && semver.satisfies(browser.version, version)) {
			return true;
		}
	}
	return false;
}

module.exports = Worker;