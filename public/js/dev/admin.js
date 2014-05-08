var angular = require('angular');
var sf=require('string-format');
var io = require('socket.io-client');

var app = angular.module('app', []);

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});

app.controller("Controller", ["$scope", "$http",
	function($scope, $http) {

		$scope.screenshots={}

		var socket = io.connect('/client');

		socket.on('connect', function() {
			console.log('connected');

			socket.on('done', function(data) {
				var title='{name}({version}-{os})'.format(data.browser);
				openScreenshot(title,data.screenshot);
			});


			socket.on('complete', function(data) {

			})
			socket.on('disconnect', function() {

			});

		});

		$scope.test = function(url) {
			if(url==='reload'){
				socket.emit('reload');
				return;
			}
			if (!isValidUrl(url)) {
				alert('invalid url');
				return;
			}
			console.log(url);
			socket.emit('test', {
				url: url,
				requirement: {
					name: '',
					version: '*',
					screenshot: true
				}
			});
		}

		$http.get('/api/worker').success(function(data) {
			$scope.workers = data;
		})

		function openScreenshot(title,screenshot){
			var doc=window.open('_blank').document;
			var html='<html><body>'+screenshot+'</body></html>';
			doc.write(html);
			doc.title=title;
		}

		function isValidUrl(url) {
			return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
		}

	}
]);