var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var jsdom = require('jsdom');
var logger = require('../lib/logger');

var app = express();
app.configure(function() {
    app.use(function handleInjection(req, res, next) {
        if (req.query.browserman_jobid) {
            logger.debug('[proxy] injection: %s',req.url);
            inject(req.url, function(err,html) {
                return res.send(html);
            });
        } else {
            next();
        }
    });
    app.use(function handelProxy(req, res, next) {
        logger.debug('[proxy] normal: %s',req.url);
        req.pipe(request(req.url)).pipe(res)
    });
});

var server = http.createServer(app);

function inject(url, cb) {
    jsdom.env({
        url: url,
        done: function(errors, window) {
            if (errors) {
                console.log(errors);
                return cb(new Error('parsing error'))
            }
            var document=window.document;
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://localhost:9000/public/js/build/browserman.js';
            // Fire the loading
            head.appendChild(script);
            var html='<html>'+document.documentElement.innerHTML+'</html>'
            return cb(null,html);
        }
    });
}

exports.startOnPort = function(port) {
    server.listen(port);
}