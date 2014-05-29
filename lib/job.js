var util = require('util');
var events = require('events');
var url = require('url');
var querystring = require('querystring');
var token = require('./token');
var logger = require('./logger');
var config = require('./config');
var temp = require('./temp');
var logger = require('./logger');

function Job(options) {
	var jobId = token();
	this.jobId = jobId;
	this.requirement = options.requirement || {};
	this.url = options.url;
	this.html = options.html;

	var self=this;
	this.timeout = setTimeout(function() {
		logger.warn('[job] timeout: %s', self.jobId);
		self.complete();
	}, options.timeout || 30000);
	
	this.leftCount = 0;
	this.setMaxListeners(0);
}

util.inherits(Job, events.EventEmitter);

Job.prototype.prepare = function() {
	var self = this;
	if (self.html) {
		temp.createFile({
			name: self.jobId,
			content: self.html
		}, function(err, url) {
			if (err) {
				logger.error(err);
				self.complete();
				return;
			}
			prepare(url);
		});
	} else {
		prepare(self.url)
	}

	function prepare(url) {
		self.url = generateUrlWithParamAppended(url, {
			browserman_jobid: self.jobId,
			browserman_screenshot: self.requirement.screenshot || false
		});
		self.emit('prepared');
	}
}

Job.prototype.begin = function(totalCount) {
	this.leftCount = totalCount;
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
	clearTimeout(this.timeout);
	temp.deleteFile(this.jobId);
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