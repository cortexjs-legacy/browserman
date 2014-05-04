var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var jsdom = require('jsdom');
var logger = require('../lib/logger');
var config=require('../lib/config');

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
        req.pipe(request(req.url)).on( 'error', function(err){
            logger.error(err,req.url);
            res.end(err.toString());
        }).pipe(res);
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
            var serverAddress=config.getMainServerAddress();
            var document=window.document;
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.id='browserman';
            script.type = 'text/javascript';
            script.setAttribute('data-server',serverAddress);
            script.src = 'http://'+serverAddress+'/public/js/build/browserman.js';
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