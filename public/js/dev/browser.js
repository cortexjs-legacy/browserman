var io = require('./lib/socket.io');
var browser = require('bowser').browser;

var socket = io.connect('/worker', {
	'max reconnection attempts ': 50,
	'reconnection delay': 1000
});

socket.on('connect', function() {
	console.log('connected');
	socket.emit('register', {
		name: browser.name,
		version: browser.version,
		os: getOS()
	});
});

socket.on('job', function(job) {
	console.log('job arrive');
	if (job.html) {
		testHtml(job);
	} else if (job.url) {
		testUrl(job);
	}
});


socket.on('disconnect', function() {

});

function testUrl(job) {
	var win = window.open(job.url);
	//close the tab in case of misoperation
	setTimeout(function() {
		win.close();
	}, 20000);
}

function testHtml(job) {
	var serverAddress=job.serverAddress;
	var win = window.open('');
	var doc = win.document;
	doc.write(html);
	var head = doc.getElementsByTagName('head')[0];
	var script = doc.createElement('script');
	script.id = 'browserman';
	script.type = 'text/javascript';
	script.setAttribute('data-server', serverAddress);
	script.setAttribute('data-jobid', job.jobId);
	script.src = 'http://' + serverAddress + '/public/js/build/browserman.js';
	head.appendChild(script);
}

// function insertAfter(referenceNode, newNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
}