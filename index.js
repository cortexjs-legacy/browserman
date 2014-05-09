var config = require('./lib/config');
var fs = require('fs');

config.set(JSON.parse(fs.readFileSync('./config.json')));

var configOptions = config.load();

require('./server/main').startOnPort(configOptions.server.main.port);
require('./server/proxy').startOnPort(configOptions.server.proxy.port);
