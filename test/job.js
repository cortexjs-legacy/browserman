var fs = require('fs');
var path = require('path');
var should = require('chai').should();
var config = require('../lib/config');
config.set(JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'))));

var Job = require('../lib/job');

var options = {
	requiremane: {
		browser: 'chrome',
		version: '*'
	},
	url: 'http://browserman.io'
}

describe('Job', function() {
	describe('#prepare()', function() {
		it('should be initialized properly', function() {
			var job = new Job(options);
			var prepared = false;
			job.on('prepared', function() {
				prepared = true;
			});
			job.prepare();
			job.should.have.property('jobId');
			job.url.should.equal('http://browserman.io/?browserman_jobid=' + job.jobId + '&browserman_screenshot=false');
			prepared.should.equal(true);
		});
	});

	describe('#begin()', function() {
		it('should be started properly', function() {
			var job = new Job(options);
			job.prepare();
			job.begin(3);
			job.leftCount.should.equal(3);
		});
	});

	describe('#done()', function() {
		it('should be done properly', function() {
			var job = new Job(options);
			var doneCount = 0
			job.on('done', function(data) {
				doneCount++;
			})
			job.prepare();
			job.begin(3);
			job.done({});
			job.done({});
			job.leftCount.should.equal(1);
			doneCount.should.equal(2);
		});
	});

	describe('#complete()', function() {
		it('should complete properly', function() {
			var job = new Job(options);
			var completed = false;
			job.on('complete', function(data) {
				completed = true;
			});
			job.prepare();
			job.begin(2);
			job.done({});
			job.done({});
			job.leftCount.should.equal(0);
			completed.should.equal(true);
		});
	});
});