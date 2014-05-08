var util = require("util");
var events = require("events");
var token = require('./token');

function Worker(options) {
	this.workerId = token();
	this.browser = {
		name: options.name.toLowerCase(),
		version: options.version + '.0',
		os: options.os
	};
}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(job) {
	this.emit('job', job);
}

Worker.prototype.reload = function() {
	this.emit('reload');
}

Worker.prototype.meet = function(requirement) {
	var browser = this.browser;
	if (!requirement.name) {
		return true;
	}
	if (requirement.name == browser.name && !requirement.version) {
		return true;
	}
	if (requirement.name == browser.name && semver.satisfies(browser.version, requirement.version)) {
		return true;
	}
	return false;
}

module.exports = Worker;