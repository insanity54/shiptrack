var Backbone = require('backbone');


// user model

var User = Backbone.Model.extend({
    // user methods
    register: function(a, b, c, d) {
        console.log('user registering with a='+a, ' b='+b, 'c='+c, 'd='+d);
    }
});

var Users = Backbone.Collection.extend({
  url: '/users'
});


var u = new User();
u.register();

