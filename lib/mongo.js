var MongoClient = require('mongodb').MongoClient;
var config=require('./config').load();

var db;

MongoClient.connect(config.mongouri, function(err, database) {
    if (err) throw err;
    db = database;
})

exports.collection = function(name) {
    return db.collection(name);
}