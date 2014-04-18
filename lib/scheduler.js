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
	var worker=workers[job.requirement.workerId];
	if (!worker) {
		job.done({
			err:'no compatible browser'
		});
		return;
	}
	logger.info('send job(%s)  to worker(%s)',job.jobId,worker.workerId);
	addJobToQueue(job,jobs);
	worker.doJob(job);	
}

exports.jobDone = function(data) {
	//console.dir(data);
	var job = jobs[data.jobId];
	if(!job){
		logger.info('failed to find job(%s)',data.jobId);
		return;
	}
	logger.info('job(%s) done with result:%s',data.jobId,JSON.stringify(data.result));
	job.done(data);
	removeJobFromQueue(data,jobs);
}

function addJobToQueue(job,jobs){
	jobs[job.jobId]=job
}

function removeJobFromQueue(job,jobs){
	delete jobs[job.jobId];
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