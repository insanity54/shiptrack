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
  console.log('responding');
  console.log(req.shiptrack.response);
  if (typeof(req.shiptrack) == 'undefined') return res.send(500, {message: 'req.shiptrack undefined'});
  if (req.shiptrack.err) return res.send(400, req.shiptrack.err);
  if (req.shiptrack.response) return res.send(200, req.shiptrack.response);
  res.send(200, req.params);
}

function createTrackingDetail(req, res, next) {
  console.log('creating new tracking ' + req);
  next();
}

function duck(req, res, next) {
  console.log('ducking');
  if (typeof (shiptrack) === 'undefined') {
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
  server.post('/trackings', duck, db.create, respond);
  
  // READ TRACKING DETAIL
  server.get('/trackings/:trackingId', duck, db.read, respond);
  
  // READ ALL TRACKING DETAILS
  server.get('/trackings', duck, db.read, respond);
  
  // UPDATE TRACKING DETAIL
  server.put('/trackings/:trackingId', duck, db.update, respond);
  
  // DELETE TRACKING DETAIL
  server.del('/trackings/:trackingId', duck, db.del, respond);
};






module.exports = api;