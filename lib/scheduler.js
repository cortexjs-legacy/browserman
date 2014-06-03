var semver = require('semver');
var Worker = require('./worker');
var Job = require('./job');
var logger = require('./logger');

var jobs = {}; //jobId: job

var workers = {}; // workerId: worker

exports.registerWorker = function(worker) {
	workers[worker.workerId] = worker;
	logger.info('[worker] registered: %s', JSON.stringify(worker));
}

exports.removeWorker = function(worker) {
	if (worker && worker.workerId) {
		delete workers[worker.workerId];
		logger.info('[worker] removed: %s', worker.workerId);
	} else {
		logger.warn('[worker] not found');
	}
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

	var qualifiedWorkers = Object.keys(workers).map(function(workerId) {
		return workers[workerId];
	}).filter(function(worker) {
		return worker.meet(requirement);
	});

	if (!qualifiedWorkers || qualifiedWorkers.length == 0) {
		job.complete({
			err: 'no compatible browser'
		});
		return;
	}

	job.once('prepared', function() {

		addJobToQueue(job);

		job.begin(qualifiedWorkers.length);

		job.once('complete', function() {
			removeJobFromQueue(job, jobs);
		});

		qualifiedWorkers.forEach(function(worker) {
			logger.debug('[worker] do job(%s) with workerId(%s)', job.jobId, worker.workerId);
			worker.doJob(job);
		});
	})

	job.prepare();

}

exports.jobDone = function(data) {
	var job = jobs[data.jobId];
	if (job) {
		job.done(data);
	} else {
		logger.warn('[job] failed to find job(%s)', data.jobId);
	}
}

function addJobToQueue(job) {
	jobs[job.jobId] = job;
}

function removeJobFromQueue(job) {
	delete jobs[job.jobId];
	logger.debug('[job queue] length: %d', JSON.stringify(Object.keys(jobs).length));
}