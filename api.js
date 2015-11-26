//
// require
//
var path = require('path');
var nconf = require('nconf');
var assert = require('chai').assert;
var ups = require('shipping-ups');
var db = require(path.join(__dirname, 'db'));


//
// get funky
//


function respond(req, res, next) {
  console.log('api is responding');
  //if (!typeof(req.shiptrack.err == 'undefined')) return res.send(403);
  res.send(200, req.params);
}

function createTrackingDetail(req, res, next) {
  console.log('creating new tracking ' + req);
  next();
}

function duck(req, res, next) {
  console.log('ducking');
  if (typeof (shiptrack) === 'unefined') {
    req.shiptrack = {
      err: false
    };
  }
  next();
}



//
// init
//



//
// run
//
var api = function api(server) {
  server.get('/users/:name', duck, respond);

  // CREATE TRACKING DETAIL
  server.post('/trackings', db.create, respond);
};






module.exports = api;