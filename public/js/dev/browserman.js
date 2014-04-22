var io = require('./lib/socket.io');
var browser = require('./lib/bowser').browser;

function Browserman(options) {
	var options= options||{};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.reporter = {
		'mocha': function(mocha, socket) {
			var result = {
				jobId: getURLParameter('jobId'),
				browser: {
					name: browser.name,
					version: browser.version
				},
				data: {
					passes: [],
					failures: []
				}
			};

			function Reporter(runner) {

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

			mocha.reporter(Reporter);
			mocha.run();
		}

	}

}



Browserman.prototype.init = function() {
	var jobId = getURLParameter('jobId');
	if (!jobId) {
		return;
	}
	var socket = io.connect('/tester');
	var self = this;
	socket.on('connect', function() {
		self.reporter[self.type](self.instance, socket);
	});
};

window.Browserman = Browserman;


function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}