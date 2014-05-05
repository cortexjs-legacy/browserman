var io = require('./lib/socket.io');
var browser = require('bowser').browser;

var socket = io.connect('/worker', {
	'max reconnection attempts ':50,
	'reconnection delay':1000,
});

socket.on('connect', function() {
	console.log('connected');
	socket.emit('register', {
		name: browser.name,
		version: browser.version,
		os:getOS()
	});
});

socket.on('job', function(job) {
	console.log('job arrive')
	w=window.open(job.url);

	//close the tab in case of misoperation
	setTimeout(function(){
		w.close();
	},20000);
});

socket.on('disconnect', function() {

});

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
} 