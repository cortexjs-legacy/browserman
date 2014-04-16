var util = require("util");
var events = require("events");

function Worker(options) {

}

util.inherits(Worker, events.EventEmitter);

Worker.prototype.doJob = function(job) {
	this.emit('job', job.data);
	return this;
};

module.exports = Worker;