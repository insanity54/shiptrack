//
// require
//
var redis = require('redis');
var nconf = require('nconf');
var assert = require('chai').assert;

//
// get funky
//

var create = function create(req, res, next) {
  console.log('creating');
  // increment index of tracking detail
  red.INCR('shiptrack:trackingDetailCounter', function (err, number) {
    if (err) throw err;
    console.log('number is '+number);
    
    // convert tracking detail json to something redis friendly
    var detail = JSON.stringify(req.params);
    
    red.SET('shiptrack:tracking:'+number, detail, function(err, ok) {
      if (err) throw err;
      if (!ok) throw new Error('not ok when creating tracking detail in redis');
      next();
    });    
  });
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



module.exports = {
  create: create,
  //  read: read,
  //  update: update,
  //  delete: del
}