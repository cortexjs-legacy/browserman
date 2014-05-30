var phantom = require('phantom');
var token = require('./token');
var path = require('path');

exports.createImage = function(appName, cb) {
	phantom.create(function(ph) {
		ph.createPage(function(page) {
			page.open('http://localhost:9000/public/badge.html?appName=' + appName, function(status) {
				if(!status || status!='success'){
					return cb(new Error());
				}
				var clipRect = page.evaluate(function() {
					return document.querySelector('.badge').getBoundingClientRect();
				}, function(clipRect) {
					page.set('clipRect',{
						top: clipRect.top,
						left: clipRect.left,
						width: clipRect.width,
						height: clipRect.height
					});
					var imagePath = '/temp/' + token(10) + '.png';
					page.render(path.join(__dirname, '../', imagePath), function() {
						ph.exit();
						return cb(null, imagePath);
					});
				});
			});
		});
	});
}