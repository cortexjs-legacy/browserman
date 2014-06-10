var should = require('chai').should();
var Job = require('../lib/job');
var Worker = require('../lib/worker');
var scheduler = require('../lib/scheduler');

var worker = new Worker({
	name: 'chrome',
	version: '31.0',
	os: 'win'
});

describe('Scheduler', function() {
	describe('#registerWorker()', function() {
		it('should register a worker', function() {
			scheduler.registerWorker(worker);
		});
	});

	describe('#removeWorker()', function() {
		it('should remove a worker', function() {
			scheduler.removeWorker(worker);
		});
	});

	describe('#scheduleJob()', function() {
		it('scheduler the job to workers', function() {
			worker.on('job',function(job){
				job.should.be.a('object');
			})
			scheduler.registerWorker(worker);
			var job = new Job({
				requiremane: {
					browser: 'chrome',
					version: '*'
				},
				url: 'http://browserman.io'
			});
			scheduler.scheduleJob(job);
		});
	});

	describe('#jobDone()', function() {
		it('finish a job', function() {
			var job = new Job({
				requiremane: {
					browser: 'chrome',
					version: '*'
				},
				url: 'http://browserman.io'
			});
			scheduler.scheduleJob(job);
			scheduler.jobDone(job);
		});
	});

});