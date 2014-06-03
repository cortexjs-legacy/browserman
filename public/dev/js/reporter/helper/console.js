exports.takeOverConsole=function(cb) {
	if (!window.console) {
		window.console = {
			log: function(msg) {
				cb(msg);
			},
			warn:function(msg) {
				cb(msg);
			},
			error:function(msg){
				cb(msg);
			}
		}
		return;
	}

	var console = window.console;

	function intercept(method) {
		var original = console[method]
		console[method] = function() {
			// do sneaky stuff
			if (original.apply) {
				// Do this for normal browsers
				original.apply(console, arguments);
				cb(arguments[0]);
			} else {
				// Do this for IE
				var message = Array.prototype.slice.apply(arguments).join(' ')
				original(message);
				cb(arguments[0]);
			}
		}
	}
	var methods = ['log', 'warn', 'error']
	for (var i = 0; i < methods.length; i++) {
		intercept(methods[i]);
	}
}