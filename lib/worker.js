var util = require("util");
var events = require("events");
var token = require('./token');

function Worker(options) {
	this.workerId = token();
	this.browser = {
		name: options.name,
		version: options.version+'.0'
	}
}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(jobData) {
	this.emit('job', jobData);
	return this;
};

module.exports = Worker;