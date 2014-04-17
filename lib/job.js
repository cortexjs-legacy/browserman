var util = require('util');
var events = require('events');
var uuid=require('node-uuid'); 
var url=require('url');
var querystring=require('querystring');

function Job(options) {
	var jobId= uuid.v1();
	this.data = {
		jobId: jobId,
		url: generateUrlWithJobId(options.url,jobId),
		requirement: options.requirement || {}
	}
}

util.inherits(Job, events.EventEmitter);

Job.prototype.done = function(data) {
	this.emit('done', data);
	return this;
};

function generateUrlWithJobId(originalUrl,jobId){
	var parsedUrl=url.parse(originalUrl);
	var query=querystring.parse(parsedUrl.query);
	query.jobId=jobId;
	parsedUrl.search=querystring.stringify(query);
	//console.log(url.format(parsedUrl))
	return url.format(parsedUrl);
} 

module.exports = Job;

generateUrlWithJobId('http://loc/?a=1',1)