var io = require('socket.io-client');
var browser = require('bowser').browser;

var socket = io.connect('/worker', {
	'max reconnection attempts ': 50,
	'reconnection delay': 1000
});

socket.on('connect', function() {
	location.hash='connected';
	socket.emit('register', {
		name: browser.name,
		version: browser.version,
		os: getOS()
	});
});

socket.on('job', function(job) {
	location.hash='onjob';
	var win = window.open(job.url);
	//close the tab in case of misoperation
	setTimeout(function() {
		win.close();
	}, 20000);
});

socket.on('reload',function(){
	location.reload();
});

socket.on('disconnect', function() {
	//location.reload();
});

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
}	