var io = require('./lib/socket.io');
var browser = require('bowser').browser;
var querystring = require('querystring');

function Browserman(options) {
	var options = options || {};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.server = options.server || 'localhost:9000';
	this.reporter = {
		'mocha': require('./reporter/mocha'),
		'plain': require('./reporter/plain')
	}
}

Browserman.prototype.init = function() {
	var jobId = querystring.parse(location.search.replace('?', '')).jobId;
	if (!jobId) {
		return;
	}
	var self=this;
	var socket = io.connect('http://' + this.server + '/tester');
	socket.on('connect', function() {
		var result = {
			jobId: jobId,
			browser: {
				name: browser.name,
				version: browser.version
			},
			data: {
				passes: [],
				failures: []
			}
		};

		self.reporter[self.type]({
			pass:function(data){
				result.data.passes.push(data);
			},
			fail:function(data){
				result.data.failures.push(data);
			},
			end:function(){
				socket.emit('done', result);
				window.close()
			},
			instance:self.instance
		});

	})
};

window.Browserman = Browserman;