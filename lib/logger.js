var winston = require('winston');

var config = {
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
		success: 4,
		failure: 5,
	},
	colors: {
		debug: 'blue',
		info: 'blue',
		warn: 'yellow',
		error: 'red',
		success: 'green',
		failure: 'red'
	}
};

winston.addColors(config.colors);

var logger = new(winston.Logger)({
	levels: config.levels,
	transports: [
		new(winston.transports.Console)({
			level: 'debug',
			timestamp: false,
			colorize: true,
		})
	]
});

module.exports = logger;