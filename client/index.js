window.jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
require('bootstrap');




//
// MODEL user model
//
var User = Backbone.Model.extend({
    // user methods
//    register: function(a, b, c, d) {
//        console.log('user registering with a='+a, ' b='+b, 'c='+c, 'd='+d);
//    }
});

var u = new User();
//u.register();




//
// MODEL tracking detail model
//
var Tracking = Backbone.Model.extend({
  trackingNumber: '',
  carrier: '',
  notificationMethod: '',
  userId: ''
});
var tracking = new Tracking();





//
// COLLECTION users
//
var Users = Backbone.Collection.extend({
  url: '/users',
  model: User
});
var users = new Users();




//
// COLLECTION Trackings
//
var Trackings = Backbone.Collection.extend({
  url: '/trackings',
  model: Tracking
});
var trackings = new Trackings();
//trackings.on('add', function(e) {
//  console.log('trackings add');
//  this.sync("create", );
//});







//
// VIEW tracking number input box
//
//var ENTER_KEY = 13;
var InputView = Backbone.View.extend({

  collection: trackings,
  el: '#tracking',

  events: {
    "keydown": "keyAction",
    "submit form": "submitAction"
  },

  //render: function() { ... },

  submitAction: function(e) {
    console.log('Inputview event: submit. Adding model to collection');
    //console.log(this.collection)
    this.collection.create({trackingNumber: this.$("#trackingNumber").val()});
    //var t = new Tracking({  });
    //this.collection.add(t);
    //this.sync("create", t, )
    return false; // prevent default form submission
  },
  
  keyAction: function(e) {
    //console.log('inputview event: keydown');
//    if (e.which === ENTER_KEY) {
//      console.log('submitting');
//      this.collection.add({text: this.$el.val()});
//      return false;
//    }
  }
});
var inputView = new InputView();










//
// VIEW Large display of tracking number
//
var TrackingDisplay = Backbone.View.extend({
  el: '#trackingDisplay',
  events: {
    "change #tracking":     "render",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },
  
  initialize: function() {
    //this.listenTo(this.model, "change", this.render);
    this.listenTo(tracking, 'change', this.render);
  },
  
  template: _.template("<p><b>test<%- trackingNumber %></b></p>"),

  render: function() {
    console.log('rendering tracking display');
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var trackingDisplay = new TrackingDisplay();


//
//
////
//// 
////
//var Sidebar = Backbone.Model.extend({
//  promptColor: function() {
//    var cssColor = prompt("Please enter a CSS color:");
//    this.set({color: cssColor});
//  }
//});
//
//window.sidebar = new Sidebar;
//
//sidebar.on('change:color', function(model, color) {
//  $('#sidebar').css({background: color});
//});
//
//sidebar.set({color: 'white'});
//
//sidebar.promptColor();


//console.log('im alive');
