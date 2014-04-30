var util = require("util");
var events = require("events");
var token = require('./token');

function Worker(options) {
	this.workerId = token();
	this.browser = {
		name: options.name.toLowerCase(),
		version: options.version+'.0'
	};
}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(job) {
	this.emit('job', job);
}

module.exports = Worker;