var util = require('util');
var events = require('events');
var url = require('url');
var querystring = require('querystring');
var token = require('./token');
var logger = require('./logger');
var config = require('./config');

function Job(options) {
	var jobId = token();
	this.jobId = jobId;
	this.requirement = options.requirement || {};
	this.url = options.url && generateUrlWithParamAppended(options.url, {
		browserman_jobid: jobId,
		browserman_screenshot: this.requirement.screenshot || false
	});
	this.html = options.html;
	this.serverAddress = config.getMainServerAddress();
	this.leftCount = 0;
}

util.inherits(Job, events.EventEmitter);

Job.prototype.left = function(leftCount) {
	this.leftCount = leftCount;
	logger.debug('[job] begin - jobId:%s left:%d', this.jobId, this.leftCount)
}

Job.prototype.done = function(data) {
	this.emit('done', data);
	this.leftCount--;
	logger.debug('[job] done - jobId:%s left:%d', this.jobId, this.leftCount)
	if (this.leftCount == 0) {
		this.complete();
	}
}

Job.prototype.complete = function(data) {
	logger.debug('[job] complete - jobId:%s left:%d', this.jobId, this.leftCount)
	this.emit('complete', data);
}

function generateUrlWithParamAppended(originalUrl, param) {
	var parsedUrl = url.parse(originalUrl);
	var query = querystring.parse(parsedUrl.query);
	parsedUrl.search = querystring.stringify(merge(query, param));
	return url.format(parsedUrl);
}

function merge(obj1, obj2) {
	var obj3 = {};
	for (var attrname in obj1) {
		obj3[attrname] = obj1[attrname];
	}
	for (var attrname in obj2) {
		obj3[attrname] = obj2[attrname];
	}
	return obj3;
}

module.exports = Job;