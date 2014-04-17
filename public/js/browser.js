var app = angular.module('app', []);

function Controller($scope, $http) {
	var socket = io.connect('http://localhost:9000/worker');

	socket.on('connect', function() {
		console.log('connected');

		var guid = Math.uuid(8, 16);
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
	}
}