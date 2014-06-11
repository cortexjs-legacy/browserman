var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var logger = require('../lib/logger');
var config = require('../lib/config');
var cheerio = require('cheerio');

var app = express();
app.configure(function() {
    app.use(function handleInjection(req, res, next) {
        if (req.query.browserman_jobid) {
            logger.silly('[proxy] injection: %s', req.url);
            inject(req.url, {
                'data-server': config.getMainServerAddress(),
                'data-jobid': req.query.browserman_jobid,
                'data-screenshot': req.query.browserman_screenshot
            }, function(err, html) {
                return res.send(html);
            });
        } else {
            next();
        }
    });
    app.use(function handelProxy(req, res, next) {
        logger.silly('[proxy] %s: %s', req.method, req.url);
        var r;
        if (req.method === 'POST') {
            r = request.post({
                uri: req.url,
                json: req.body,
                headers: req.headers
            });
        } else {
            r = request(req.url);
        }
        req.pipe(r).on('error', function(err) {
            logger.error(err, req.url);
            res.end(err.toString());
        }).pipe(res);
    });
});

var server = http.createServer(app);

function inject(url, dataAttrs, cb) {
    request(url, function(error, response, body) {
        console.log(response.statusCode);
        if (error || response.statusCode !== 200) {
            return cb(new Error());
        }
        $ = cheerio.load(body);
        var serverAddress = config.getMainServerAddress();
        var script = $('<script/>');
        script.attr('id', 'browserman');
        script.attr('type', 'text/javascript');
        script.attr('src', 'http://' + serverAddress + '/public/js/browserman.js');
        for (var key in dataAttrs) {
            script.attr(key, dataAttrs[key]);
        }
        $('head').append(script);
        console.log($.html)
        return cb(null, $.html());
    });
}



exports.startOnPort = function(port) {
    server.listen(port);
}