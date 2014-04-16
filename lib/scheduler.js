var Worker = require('../lib/worker');
var Job = require('../lib/job');
var logger = require('../lib/logger');

var jobs = {} //jobId: job

var workers = {} // workerId: worker

exports.registerWorker = function(worker) {
	workers[worker.id] = worker;
	logger.info('worker registered: %s', JSON.stringify(worker));
}

exports.removeWorker = function(worker) {
	delete workers[worker.id];
	logger.info('worker removed: %s', worker.id);
}

exports.getAllWorkers = function(){
	return Object.keys(workers);
}

exports.scheduleJob = function(job) {
	// register job with jobId
	var worker = fetch_random(workers);
	if (!worker) {
		job.done({
			err:'no compatible browser'
		});
		return;
	}
	logger.info('send job(%s)  to worker(%s)',job.url,worker.id);
	worker.doJob(job);	
}

exports.jobDone = function(data) {
	var job = jobs[data.jobId];
	job.done(data);
}

function fetch_random(obj) {
	var temp_key, keys = [];
	for (temp_key in obj) {
		if (obj.hasOwnProperty(temp_key)) {
			keys.push(temp_key);
		}
	}
	var key = keys[Math.floor(Math.random() * keys.length)];
	return obj[key]
}