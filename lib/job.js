var util = require('util');
var events = require('events');
var url = require('url');
var querystring = require('querystring');
var token = require('./token');

function Job(options) {
	var jobId = token();
	this.jobId = jobId;
	this.requirement = options.requirement || {};
	this.url = generateUrlWithParamAppended(options.url, {
		browserman_jobid:jobId,
		browserman_screenshot:this.requirement.screenshot||false
	});
}

util.inherits(Job, events.EventEmitter);

Job.prototype.done = function(data) {
	this.emit('done', data);
}

function generateUrlWithParamAppended(originalUrl, param) {
	var parsedUrl = url.parse(originalUrl);
	var query = querystring.parse(parsedUrl.query);
	parsedUrl.search = querystring.stringify(merge(query, param));
	return url.format(parsedUrl);
}

function merge(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

module.exports = Job;