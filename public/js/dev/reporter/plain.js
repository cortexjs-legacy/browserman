exports.run = function(options) {
	var doNothing = function() {};
	var pass = options.pass || doNothing;
	var fail = options.fail || doNothing;
	var end = options.end || doNothing;
	var window = options.instance;

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
	}, 5000);
}