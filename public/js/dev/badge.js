var angular = require('angular');
var app = angular.module('app', []);

app.controller("Controller", ["$scope", "$http", Controller]);

function Controller($scope, $http) {

	var appName = getURLParameter('appName');

	console.log(appName);

	$http.get('/api/app/' + appName)
		.success(function(data) {
			var result ={};

			data.result.forEach(function(test){
				var browser=test.browser;
				if(browser.name.indexOf('internet')!=-1){
					browser.name='ie';
				}
				if(!result[browser.name]){
					result[browser.name]=[];
				}
				if(test.data.failures.length==0){
					result[browser.name].push({
						version:browser.version,
						status:'pass'
					});
				}else{
					result[browser.name].push({
						version:browser.version,
						status:'fail'
					});

				}
				Object.keys(result).forEach(function(browser){
					result[browser].sort(function(a,b){
						return a.version < b.version
					})
				})

				$scope.result=result;
			})
		}).error(function(data) {

		})

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

}