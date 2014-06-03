var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('../lib/logger');
var Worker = require('../lib/worker');
var Job = require('../lib/job');
var scheduler = require('../lib/scheduler');
var db = require('../lib/mongo');
var badge = require('../lib/badge');
var fs = require('fs');

var app = express();
app.configure(function() {
    app.use(express.bodyParser());
    app.use('/public', express.static(path.join(__dirname, '/../public/')));
    app.use('/temp', express.static(path.join(__dirname, '/../temp/')));
    app.use(app.router);
});

app.get('/browser', function(req, res) {
    res.sendfile(path.join(__dirname, '/../public/browser.html'));
});

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, '/../public/admin.html'));
});

app.get('/api/worker', function(req, res) {
    res.send(scheduler.getAllWorkers());
});

app.get('/api/app/:name', function(req, res) {
    db.collection('test').find({
        appName: req.params.name
    }).toArray(function(err, result) {
        if (err) {
            res.send(500)
        } else {
            res.send(result[0]);
        }
    });
});

app.get('/api/app/:name/badge', function(req, res) {
    badge.createImage(req.params.name, function(err, imagePath) {
        if (err) {
            res.send(404);
        } else {
            var image = path.join(__dirname, '../', imagePath);
            res.sendfile(image);
            setTimeout(function() {
                fs.unlink(image, function(err) {});
            }, 1000)
        }
    })
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
        });
        worker.once('reload', function() {
            socket.emit('reload');
        })
        scheduler.registerWorker(worker);
    });

    socket.on('disconnect', function() {
        scheduler.removeWorker(worker);
    });
});

// client who asks for a test
io.of('/client').on('connection', function(socket) {

    socket.on('list', function() {
        socket.emit('list:result', scheduler.getAllWorkers());
    })

    socket.on('reload', function() {
        scheduler.reloadAllWorkers();
    })

    socket.on('test', function(test) {
        var job = new Job(test);

        job.on('done', function(data) {
            socket.emit('done', data);
        });

        job.once('complete', function() {
            socket.emit('complete');
        });
        scheduler.scheduleJob(job)
    });

    socket.on('disconnect', function() {
        //console.log('disconnect')
    });
});

// page opened by browser
io.of('/tester').on('connection', function(socket) {

    socket.once('done', function(data) {
        // console.log(data);
        scheduler.jobDone(data)
    });

    socket.on('disconnect', function() {

    });
});

exports.startOnPort = function(port) {
    server.listen(port);
}