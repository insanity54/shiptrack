//
// require
//
var path = require('path');
var nconf = require('nconf');
var assert = require('chai').assert;
var redis = require('redis');
var ups = require('shipping-ups');



//
// get funky
//
function respond(req, res, next) {
  console.log('api is responding');
  if (req.shiptrack.err) return res.send(403);
  res.send('hello ' + req.params.name);
}

function createTrackingDetail(req, res, next) {
  console.log('creating new tracking ' + req);
  next();
}

function duck(req, res, next) {
  if (typeof(shiptrack) === 'unefined') {
    req.shiptrack = {
      err: false
    };
  }
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
  server.get('/users/:name', duck, respond);
  
  // CREATE TRACKING DETAIL
  server.post('/trackings', duck, createTrackingDetail, respond);
};






module.exports = api;