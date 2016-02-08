//
// SCHEMA
//

// shiptrack:trackingDetailCounter - counter for creating tracking items
// shiptrack:tracking:$n - tracking item info. stringified json of backbone model.
// shiptrack:tracking:all - set containing all existing trackingIds


//
// require
//
var redis = require('redis');
var nconf = require('nconf');
var assert = require('chai').assert;
var _ = require('underscore');


//
// get funky
//
var create = function create(req, res, next) {
  console.log('creating');
  // increment index of tracking detail
  red.INCR('shiptrack:trackingDetailCounter', function (err, number) {
    if (err) throw err;
    console.log('number is '+number);
    
    // add an id to the tracking info
    var detail = req.params;
    detail.id = number;
    
    // convert tracking detail json to something redis friendly
    detail = JSON.stringify(detail);
    
    // add this trackingId to index of all tracking ids
    red.SADD('shiptrack:tracking:all', number, function(err, ok) {
      if (err) throw err;
      if (!ok) throw new Error('not ok when adding this tracking id to index of all');
    
      // create the redis entry
      red.SET('shiptrack:tracking:'+number, detail, function(err, ok) {
        if (err) throw err;
        if (!ok) throw new Error('not ok when creating tracking detail in redis');
        next();
        
      });
    });
  });
}


var read = function read(req, res, next) {
  
  
  
  function readAll(cb) {
    console.log('reading all trackings');
    
    // get list of all
    red.SMEMBERS('shiptrack:tracking:all', function(err, members) {
      //console.log('all tracking ids: ' + members);
      console.log('got members');
      console.log(members);
      
      var m = _.map(members, function(member) {return 'shiptrack:tracking:'+member});
      
      console.log('mapped members: ' + m);
      console.log(m);
      
      red.MGET(m, function(err, all) {
        if (err) throw err;
        
        console.log('getAll');
        console.log(all);

        // go through each result and de-stringify
        all = _.map(all, function(el) {
          
          var j;
          try {
            j = JSON.parse(el);
          }
          catch (e) {
            console.error('problem parsing ' + el + ' err- ' + e);
            return null;
          }
          return j;
        });
            
        //all = JSON.stringify(all);
        console.log('converted all ' + all);
        console.log(all);
        
        return cb(null, all);
      });
      
      
    });
  }
  
  
  // get one
  function readOne(number, detail) {
    console.log('reading ' + number); 
    
    red.GET('shiptrack:tracking:' + number, function(err, detail) {
      if (err) throw err;
      if (!detail) throw new Error('couldnt get detail when reading one.');
      return cb(null, detail);
    });
  }
  
  
  // find if we're reading the whole collection or just one item
  if (typeof(req.params.trackingId) == 'undefined') {
    
    readAll(function(err, all) {
      if (err) throw new Error('problem when reading all- ' + err);
      req.shiptrack.response = all;
      next();
    });
    
  } else {
    
    readOne(req.params.trackingId, function(err, one) {
      if (err) throw new Error('problem when reading one- ' + err);
      next();
    });
  }
  
  
  //next();
}


var update = function update(req, res, next) {
  console.log('updating ' + req.params.trackingId);
  console.log(req.params);
  next();
}

var del = function del(req, res, next) {
  var number = req.params.trackingId;
  console.log('deleting ' + number);
  //console.log(req.params);
  
  // remove tracking id of index of all tracking ids
  red.SREM('shiptrack:tracking:all', number, function(err, ok) {
    if (err) throw err;
      if (!ok) throw new Error('not ok when removing number '+number+' from index of all');

    // @todo add logic to only allow deletion of your own tracking details
    red.DEL('shiptrack:tracking:' + number, function(err, ok) {
      if (err) throw err;
      if (!ok)throw new Error('not ok when deleting tracking detail in redis');
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
  read: read,
  update: update,
  del: del
}