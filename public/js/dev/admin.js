var io = require('./lib/socket.io');
var angular=require('angular');

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
		var socket = io.connect('/client');

		socket.on('connect', function() {
			console.log('connected');

			socket.on('done', function(data) {
				alert(JSON.stringify(data.result));
			});

			socket.on('disconnect', function() {

			});

		});

		$scope.test = function(url) {
			console.log(url);
			// socket.emit('test', {
			// 	url: $scope.url[workerId],
			// 	requirement: {
			// 		workerId: workerId
			// 	}
			// });
		}

		$http.get('/api/worker').success(function(data) {
			$scope.workers = data;
		})

		$scope.showPanel = function(id) {
			$scope.showPanelStatus = {};
			$scope.showPanelStatus[id] = true;
		}

		$scope.hidePanel = function() {
			$scope.showPanelStatus = {};
		}

	}
]);