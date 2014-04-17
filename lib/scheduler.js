var Worker = require('../lib/worker');
var Job = require('../lib/job');
var logger = require('../lib/logger');

var jobs = {} //jobId: job

var workers = {} // workerId: worker

exports.registerWorker = function(worker) {
	workers[worker.workerId] = worker;
	logger.info('worker registered: %s', JSON.stringify(worker));
}

exports.removeWorker = function(worker) {
	delete workers[worker.workerId];
	logger.info('worker removed: %s', worker.workerId);
}

exports.getAllWorkers = function(){
	return workers;
}

exports.scheduleJob = function(job) {
	// register job with jobId
	// var worker = fetch_random(workers);
	// console.dir(job.data);
	var jobData=job.data;
	console.dir(jobData);
	var worker=workers[jobData.requirement.workerId];
	if (!worker) {
		job.done({
			err:'no compatible browser'
		});
		return;
	}
	logger.info('send job(%s)  to worker(%s)',jobData.jobId,worker.workerId);
	jobs[jobData.jobId]=job;
	worker.doJob(jobData);	
}

exports.jobDone = function(data) {
	//console.dir(data);
	var job = jobs[data.jobId];
	logger.info('job(%s) done with result:%s',data.jobId,JSON.stringify(data.result));
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