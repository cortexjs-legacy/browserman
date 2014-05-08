var semver = require('semver');
var Worker = require('./worker');
var Job = require('./job');
var logger = require('./logger');

var jobs = {}; //jobId: job

var workers = {}; // workerId: worker

exports.registerWorker = function(worker) {
	workers[worker.workerId] = worker;
	logger.info('[worker] registered: %s', JSON.stringify(worker));
	logger.debug('[worker] %s', workers);
}

exports.removeWorker = function(worker) {
	if (worker.workerId) {
		delete workers[worker.workerId];
		logger.info('[worker] removed: %s', worker.workerId);
	}else{
		logger.warn('[worker] not found: %s', worker.workerId);
	}
	logger.debug('[worker] %s', workers);
}

exports.reloadAllWorkers = function() {
	for (var workerId in workers) {
		workers[workerId].reload();
	}
}

exports.getAllWorkers = function() {
	return Object.keys(workers).map(function(workerId) {
		return workers[workerId];
	})
}

exports.scheduleJob = function(job) {
	var requirement = job.requirement;

	var qualifiedWorkers = Object.keys(workers).filter(function(workerId) {
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
		return workers[workerId];
	});

	if (!qualifiedWorkers || qualifiedWorkers.length == 0) {
		job.complete({
			err: 'no compatible browser'
		});
		return;
	}


	job.left(qualifiedWorkers.length);

	job.once('complete', function() {
		removeJobFromQueue(job, jobs);
	});

	addJobToQueue(job);

	qualifiedWorkers.forEach(function(worker) {
		logger.debug('[worker] do job(%s) with workerId(%s)', job.jobId, worker.workerId);
		worker.doJob(job);
	});
}

exports.jobDone = function(data) {
	var job = jobs[data.jobId];
	if (!job) {
		logger.warn('[job] failed to find job(%s)', data.jobId);
		return;
	}
	job.done(data);
}

function addJobToQueue(job) {
	jobs[job.jobId] = job;
}

function removeJobFromQueue(job) {
	delete jobs[job.jobId];
}