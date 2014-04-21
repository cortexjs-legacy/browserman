var io = require('./lib/socket.io');
var browser = require('./lib/bowser').browser;


var jobId = getURLParameter('jobId');
if (jobId) {
	initClient();
} else {
	mocha.run();
}


function initClient() {
	var socket = io.connect('/tester');

	var result = {
		jobId: jobId,
		browser: {
			name: browser.name,
			version: browser.version
		},
		data: {
			passes: [],
			failures: []
		}
	}

	socket.on('connect', function() {
		console.log('connected');

		function BrowsermanReporter(runner) {

			runner.on('pass', function(test) {
				result.data.passes.push({
					title: test.title,
					fullTitle: test.fullTitle(),
					duration: test.duration,
				})
			});

			runner.on('fail', function(test, err) {
				result.data.failures.push({
					title: test.title,
					fullTitle: test.fullTitle(),
					duration: test.duration,
					error: err.message
				});
			});

			runner.on('end', function() {
				socket.emit('done', result);
				window.close();
			});
		}

		mocha.reporter(BrowsermanReporter);
		mocha.run();

		socket.on('disconnect', function() {

		});

	});

}


function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}