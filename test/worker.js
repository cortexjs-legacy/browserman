var should = require('chai').should();
var Job = require('../lib/job');
var Worker = require('../lib/worker');

var options = {
	name: 'chrome',
	version: '31.0',
	os: 'win'
}

describe('Worker', function() {
	describe('#init()', function() {
		it('should be initialized properly', function() {
			var worker = new Worker(options);
			worker.should.have.property('workerId');
			worker.browser.name.should.equal('chrome');
			worker.browser.version.should.equal('31.0.0');
			worker.browser.os.should.equal('win');
		});
	});

	describe('#doJob()', function() {
		it('should do job properly', function() {
			var job = new Job({
				requiremane: {
					browser: 'chrome',
					version: '*'
				},
				url: 'http://browserman.io'
			});
			var worker = new Worker(options);
			var onJob = false;
			worker.on('job', function(data) {
				onJob = true;
			});
			worker.doJob(job);
			onJob.should.equal(true);
		});
	});

	describe('#meet()', function() {
		it('should decide whether meet the reqirement', function() {
			var worker = new Worker({
				name: 'chrome',
				version: '31.0',
				os: 'win'
			});
			worker.meet({
				browser: ['chrome@*']
			}).should.equal(true);

			worker.meet({
				browser: ['chrome@>1.0.0']
			}).should.equal(true);

			worker.meet({
				browser: ['firefox@>1.0.0']
			}).should.equal(false);
		});
	});


});