var util = require('util');
var events = require('events');
var uuid = require('node-uuid');
var url = require('url');
var querystring = require('querystring');

function Job(options) {
	var jobId = token(8);
	this.jobId = jobId,
	this.url = generateUrlWithJobId(options.url, jobId),
	this.requirement = options.requirement || {}
}

util.inherits(Job, events.EventEmitter);

Job.prototype.done = function(data) {
	this.emit('done', data);
	return this;
};

function generateUrlWithJobId(originalUrl, jobId) {
	var parsedUrl = url.parse(originalUrl);
	var query = querystring.parse(parsedUrl.query);
	query.jobId = jobId;
	parsedUrl.search = querystring.stringify(query);
	return url.format(parsedUrl);
}

function token(n) {
	var salt = 'ABCDEFGHIJKLMNOPQRSTUVWQYZ0123456789',
		key = '',
		len = n || 6,
		length = salt.length,
		i = 0;
	if (length < len) {
		while (salt.length < len) {
			salt += salt;
		}
		length = salt.length;
	}
	for (; i < len; key += salt.charAt(Math.floor(Math.random() * length)), i++);
	return key;
}

module.exports = Job;