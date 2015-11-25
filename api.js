//
// require
//
var path = require('path');
var nconf = require('nconf');
var assert = require('chai').assert;
var redis = require('redis');
var 


//
// get funky
//
function respond(req, res, next) {
  console.log('api is responding');
  res.send('hello ' + req.params.name);
  next();
}

function create(req, res, next) {
  console.log('creating new tracking ' + req.body);
  next();
}


//
// init
//
nconf.env(['REDIS_ADDRESS']);
var redisAddress = nconf.get('REDIS_ADDRESS');
assert.isDefined(redisAddress, 'REDIS_ADDRESS environment varirable is not defined');

var redisOptions = {
  host: redisAddress
};
var red = redis.createClient(redisOptions);



//
// run
//
var api = function api(server) {
  server.get('/users/:name', respond);
  
  // CREATE TRACKING DETAIL
  server.post('/trackings', respond);
};






module.exports = api;