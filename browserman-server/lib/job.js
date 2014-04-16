var util = require('util');
var events = require('events');

function Job(options) {
	
}

util.inherits(Job, events.EventEmitter);

Job.prototype.done = function(data) {
	this.emit('done', data);
	return this;
};

module.exports = Job;