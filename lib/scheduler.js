var semver=require('semver');
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

exports.getAllWorkers = function(){
	return workers;
}

exports.findQualifiedWorkers=function(requirement){

	var allWorkers = Object.keys(workers).map(function (key) {
    	return workers[key];
	});

	var result=[];
	for (var i = allWorkers.length - 1; i >= 0; i--) {
		var worker=allWorkers[i];
		if(requirement.name==='ALL'){
			result.push(worker.workerId);
			continue;
		}
		if(!worker.browser.name===requirement.name){
			continue;
		}
		if(!semver.satisfies(worker.browser.version,requirement.version)){
			continue;
		}
		result.push(worker.workerId);
	};
	return result;
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