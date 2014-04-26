var util = require('util');
var events = require('events');
var url = require('url');
var querystring = require('querystring');
var token = require('./token');

function Job(options) {
	var jobId = token();
	this.jobId = jobId,
	this.url = generateUrlWithJobIdAppended(options.url, jobId),
	this.requirement = options.requirement || {}
}

util.inherits(Job, events.EventEmitter);

Job.prototype.done = function(data) {
	this.emit('done', data);
};

function generateUrlWithJobIdAppended(originalUrl, jobId) {
	var parsedUrl = url.parse(originalUrl);
	var query = querystring.parse(parsedUrl.query);
	query.jobId = jobId;
	parsedUrl.search = querystring.stringify(query);
	return url.format(parsedUrl);
}


module.exports = Job;