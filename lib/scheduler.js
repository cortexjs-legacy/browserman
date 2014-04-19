var semver = require('semver');
var Worker = require('./worker');
var Job = require('./job');
var logger = require('./logger');

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

exports.getAllWorkers = function() {
	return workers;
}

exports.findQualifiedWorkers = function(requirement) {

	return Object.keys(workers).filter(function(workerId) {
		var worker = workers[workerId];
		var browser = worker.browser;
		if (!requirement.name) {
			return true;
		}
		if (requirement.name == browser.name && !requirement.version) {
			return true;
		}
		if (requirement.name == browser.name && semver.satisfies(browser.version, requirement.version)) {
			return true;
		}
		return false;
	}).map(function(workerId) {
		var worker = workers[workerId];
		return {
			browser: worker.browser,
			workerId: worker.workerId
		}
	});
}

exports.scheduleJob = function(job) {
	var worker = workers[job.requirement.workerId];
	if (!worker) {
		job.done({
			err: 'no compatible browser'
		});
		return;
	}
	logger.info('send job(%s)  to worker(%s)', job.jobId, worker.workerId);
	addJobToQueue(job, jobs);
	worker.doJob(job);
}

exports.jobDone = function(data) {
	//console.dir(data);
	var job = jobs[data.jobId];
	if (!job) {
		logger.warn('failed to find job(%s)', data.jobId);
		return;
	}
	logger.info('job(%s) done with result:%s', data.jobId, JSON.stringify(data.result));
	job.done(data);
	removeJobFromQueue(data, jobs);
}

function addJobToQueue(job, jobs) {
	jobs[job.jobId] = job
}

function removeJobFromQueue(job, jobs) {
	delete jobs[job.jobId];
}
