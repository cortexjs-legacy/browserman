var fs = require('fs');
var path = require('path');

function makeTempDirIfNeeded() {
	var tempDir = path.join(__dirname, '../temp');
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir);
	}
}

module.exports.createFile = function(jobId, html) {
	makeTempDirIfNeeded();
	var urlPath = '/temp/' + jobId + '.html'
	var path = generatePath(urlPath);
	fs.writeFileSync(path, html);
	return urlPath;
}

module.exports.deleteFile = function(jobId) {
	var path = generatePath('/temp/' + jobId + '.html');
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
}

function generatePath(urlPath) {
	return path.join(__dirname, '../', urlPath);
}