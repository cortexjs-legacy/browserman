exports.run = function(options) {
	var doNothing=function(){};
	var pass = options.pass||doNothing;
	var fail = options.fail||doNothing;
	var end = options.end||doNothing;
	var mocha = options.instance;

	function Reporter(runner) {

		runner.on('pass', function(test) {
			pass({
				title: test.title,
				fullTitle: test.fullTitle(),
				duration: test.duration,
			})
		});

		runner.on('fail', function(test, err) {
			fail({
				title: test.title,
				fullTitle: test.fullTitle(),
				duration: test.duration,
				error: err.message
			});
		});

		runner.on('end', function() {
			end();
		});
	}

	mocha.reporter(Reporter);
	mocha.run();
}