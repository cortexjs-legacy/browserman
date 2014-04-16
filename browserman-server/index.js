var express = require('express');
var http = require('http');
var logger = require('./lib/logger');
var Worker = require('./lib/worker');
var scheduler = require('./lib/scheduler');
var path = require('path');

var app = express();
app.configure(function() {
    app.use('/public',express.static(path.join(__dirname, 'public/')));
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.enable('browser client minification'); // send minified client
io.enable('browser client etag'); // apply etag caching logic based on version number
io.enable('browser client gzip'); // gzip the file
io.set('log level', 1); // reduce logging

io.set('transports', [
    'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
]);

// browser that standby to handle a test
io.of('/worker').on('connection', function(socket) {

    var worker;

    socket.on('register', function(options) {
        worker = new Worker(options);
        worker.on('job',function(job){
            socket.emit('job',job);
        })
        scheduler.registerWorker(worker);

    });
    socket.on('disconnect', function() {
        scheduler.removeWorker(worker);
    });
});

// who asks for a test
io.of('/asker').on('connection', function(socket) {

    socket.on('test', function(test) {
        var job = new Job(test);
        job.on('done', function(data) {
            socket.emit('done',data);
        });
        scheduler.scheduleJob(job)
    });

    socket.on('disconnect', function() {

    });
});

// test page opened by browser
io.of('/tester').on('connection', function(socket) {

    socket.on('done', function(data) {
        scheduler.jobDone(data)
    });

    socket.on('disconnect', function() {

    });
});

server.listen(3000);