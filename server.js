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
    app.use('/public', express.static(path.join(__dirname, 'public/')));
    app.use(app.router);
});

app.get('/api/worker', function(req, res) {
    res.send(scheduler.getAllWorkers());
})

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.enable('browser client minification'); // send minified client
io.enable('browser client etag'); // apply etag caching logic based on version number
io.enable('browser client gzip'); // gzip the file
io.set('log level', 1); // reduce logging

io.set('transports', [
    'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
]);

// browser registry
io.of('/worker').on('connection', function(socket) {

    var worker;

    socket.on('register', function(options) {
        worker = new Worker(options);
        worker.on('job', function(job) {
            socket.emit('job', job);
        })
        scheduler.registerWorker(worker);

    });
    socket.on('disconnect', function() {
        scheduler.removeWorker(worker);
    });
});

// client who asks for a test
io.of('/client').on('connection', function(socket) {

    socket.on('query', function(requirement) {
        var workers=scheduler.findQualifiedWorkers(requirement);
        socket.emit('queryresult',workers);
    });

    socket.on('test', function(test) {
        var job = new Job(test);
        job.once('done', function(data) {
            socket.emit('done', data);
        });
        scheduler.scheduleJob(job)
    });

    socket.on('disconnect', function() {
        //console.log('disconnect')
    });
});

// page opened by browser
io.of('/tester').on('connection', function(socket) {

    socket.on('done', function(data) {
        scheduler.jobDone(data)
    });

    socket.on('disconnect', function() {

    });
});

exports.startServer = function(port) {
    server.listen(port);
}