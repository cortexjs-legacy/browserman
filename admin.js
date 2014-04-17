var express = require('express');
var http = require('http');
var logger = require('./lib/logger');
var Worker = require('./lib/worker');
var Job = require('./lib/job');
var scheduler = require('./lib/scheduler');
var path = require('path');

var app = express();
app.configure(function() {
    app.use(express.bodyParser());  
    app.use('/public',express.static(path.join(__dirname, 'public/')));
    app.use(app.router);
});


var server = http.createServer(app);


exports.startServer=function(port){
    server.listen(port);
}