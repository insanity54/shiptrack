//
// require
//
var path = require('path');
var nconf = require('nconf');
var assert = require('chai').assert;
var redis = require('redis');



//
// get funky
//
function respond(req, res, next) {
    console.log('api is responding');
  res.send('hello ' + req.params.name);
  next();
}



//
// init
//
nconf.env(['REDIS_ADDRESS']);
var redisAddress = nconf.get('REDIS_ADDRESS');
assert.isDefined(redisAddress, 'REDIS_ADDRESS environment varirable is not defined');

var redisOptions = { host: redisAddress };
var red = redis.createClient(redisOptions);



//
// run
//
var api = function api(server) {
    server.get('/users/:name', respond);
};




module.exports = api;


//var restify = require('restify');


//
//server.get('/hello/:name', respond);
//server.head('/hello/:name', respond);
//
//server.listen(8080, function() {
//  console.log('%s listening at %s', server.name, server.url);
//});
