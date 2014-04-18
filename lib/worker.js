var util = require("util");
var events = require("events");

function Worker(options) {
	this.workerId=options.workerId;
	this.browser=options.browser;
	this.sermver=options.browser.name+"@"+options.browser.version;
}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(jobData) {
	this.emit('job', jobData);
	return this;
};

module.exports = Worker;