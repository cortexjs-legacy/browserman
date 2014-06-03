var angular = require('angular');
var app = angular.module('app', []);

app.controller("Controller", ["$scope", "$http", Controller]);

function Controller($scope, $http) {

	var appName = getURLParameter('appName');

	$http.get('/api/app/' + appName)
		.success(function(data) {
			var result = {};

			data.result.forEach(function(test) {
				var browser = test.browser;
				if (browser.name.indexOf('internet') != -1) {
					browser.name = 'f*** ie';
				}
				if (!result[browser.name]) {
					result[browser.name] = [];
				}

				var os=browser.os.indexOf('windows')!=-1?'win':browser.os

				if (test.data.failures.length == 0) {
					result[browser.name].push({
						version: browser.version,
						os: os,
						status: 'pass'
					});
				} else {
					result[browser.name].push({
						version: browser.version,
						os: os,
						status: 'fail'
					});

				}
				Object.keys(result).forEach(function(browser) {
					result[browser].sort(function(a, b) {
						return a.version < b.version
					});
				});


				$scope.result = result;
			})
		}).error(function(data) {

		})

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

}