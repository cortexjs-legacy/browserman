var app = angular.module('app', []);

function Controller($scope, $http) {

	var socket = io.connect('/worker');

	socket.on('connect', function() {
		console.log('connected');

		var guid = token(8);
		socket.emit('register', {
			workerId: guid,
			browser: {
				name: bowser.name,
				version: bowser.version
			}
		});

		socket.on('job', function(job) {
			window.open(job.url);
		});

		socket.on('disconnect', function() {

		});

	})

	function injectScript(doc, url) {
		var script = doc.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		var container = doc.getElementsByTagName('head')[0];
		container.appendChild(script);
	};

	function token(n) {
		var salt = 'ABCDEFGHIJKLMNOPQRSTUVWQYZ0123456789',
			key = '',
			len = n || 6,
			length = salt.length,
			i = 0;
		if (length < len) {
			while (salt.length < len) {
				salt += salt;
			}
			length = salt.length;
		}
		for (; i < len; key += salt.charAt(Math.floor(Math.random() * length)), i++);
		return key;
	}

	
}