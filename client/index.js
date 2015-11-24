var Backbone = require('backbone');
require('bootstrap');


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




//

var Sidebar = Backbone.Model.extend({
  promptColor: function() {
    var cssColor = prompt("Please enter a CSS color:");
    this.set({color: cssColor});
  }
});

window.sidebar = new Sidebar;

sidebar.on('change:color', function(model, color) {
  $('#sidebar').css({background: color});
});

sidebar.set({color: 'white'});

sidebar.promptColor();

