var fs = require('fs');
var path = require('path');

function makeTempDirIfNeeded() {
	var tempDir = path.join(__dirname, '../temp');
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir);
	}
}

makeTempDirIfNeeded();

module.exports.createFile = function(options,cb) {
	var urlPath = '/temp/' + options.name + '.html'
	var path = generatePath(urlPath);
	fs.writeFile(path, options.content,function(err){
		cb && cb(err,urlPath);
	});
}

module.exports.deleteFile = function(name,cb) {
	var path = generatePath('/temp/' + name + '.html');
	fs.unlink(path,function(err){
		cb && cb(err);
	});
}

function generatePath(urlPath) {
	return path.join(__dirname, '../', urlPath);
}