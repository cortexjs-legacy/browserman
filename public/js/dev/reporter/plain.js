exports.run = function(options) {
	var doNothing = function() {};
	var pass = options.pass || doNothing;
	var fail = options.fail || doNothing;
	var end = options.end || doNothing;
	var log = options.log || doNothing;
	var window = options.instance;

	require('./helper/console').takeOverConsole(log);

	window.onerror = function(error, url, line) {
		fail({
			title: error,
			fullTitle: error,
			duration: 0,
			err: {
				message: 'ERROR:' + error + ' LINE:' + line,
				stack: ''
			}
		})
	};

	setTimeout(function() {
		end();
	}, 8000);
}