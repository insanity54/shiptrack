window.jQuery = require('jquery');
var $ = window.jQuery;
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;



$(document).ready(function () {



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
  // VIEW display of a single tracking item
  //
  var TrackingDisplay = Backbone.View.extend({
    //el: '#trackingDisplay',
    tagName: 'li',

    events: {
      "change #tracking": "render",
      "click .button.edit": "openEditDialog",
      "click a.close": "deleteTracking",
      "click a.trackingItem": "showDetail"
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    template: _.template($('#tracking-template').html()),

    deleteTracking: function() {
      console.log('deleting tracking no');
      this.model.destroy();
      console.log(trackings);
    },
    
    // show complete detail of this tracking item
    showDetail: function() {
      //console.log('tdisplay event))');
      //console.log(appView);
      //appView.trigger('showDetail', this.model);
    },
    
    render: function () {
      console.log('rendering tracking item');
      console.log(this.model.attributes);
      //this.$el.html(this.template(this.model.attributes));
      this.$el.html(this.template(this.model.attributes));
      //console.log(this.$el.html());
      return this;
    }
  });

  
  

  //
  // VIEW appView - top level view
  //
  var AppView = Backbone.View.extend({
    el: '#app',
    
    events: {
      'itemClick': "showDetail"
    },
    
    initialize: function () {
      console.log('appview init');
      this.listenTo(trackings, 'add', this.addTracking);
      //this.listenTo(trackings, 'click')
      trackings.fetch(); // @proc READ
    },
    
    
    addTracking: function (tracking) {
      console.log('adding one');
      var view = new TrackingDisplay({
        model: trackings.last()
      });
      console.log(view.$el.html('tiesti'));
      this.$("#trackingDisplay").append(view.render().el);
      // listen to the item in case it is clicked
      //this.listenTo(view, 'click', this.showDetail);
    },
    
    
    showDetail: function(tracking) {
      console.log('showing tracking detail (appView)');
      console.log(tracking);
      this.detail = new TrackingDetail({model: tracking});
    }
  });

  
  
  
  //
  // VIEW tracking detail
  //
  var TrackingDetail = Backbone.View.extend({
    el: '#trackingDisplay',
    
    template: _.template($('#tracking-detail-template').html()),
    
    render: function () {
      console.log('rendering tracking detail');
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
    
  });
  
  

  //
  // VIEW tracking number input box.
  //
  //var ENTER_KEY = 13;
  var InputView = Backbone.View.extend({

    el: '#tracking',

    events: {
      "keydown": "keyAction",
      "submit form": "submitAction"
    },

    initialize: function () {
      console.log('inputview init');
      this.input = $("#trackingNumber");

      //this.listenTo(this.collection, 'add', this.addOne);
      // @todo maybe do listenTo(Trackings, all, this.render)
    },

    //    addOne: function (tracking) {
    //      console.log('adding one');
    //      var view = new TrackingDisplay({
    //        model: trackings.last()
    //      });
    //      console.log(view.$el.html('tiesti'));
    //      $("#trackingDisplay").append(view.render().el);
    //    },

    submitAction: function (e) {
      console.log('Inputview event: submit. Adding model to collection');
      //console.log(this.collection)
      this.collection.create({
        trackingNumber: this.input.val()
      });
      //var t = new Tracking({  });
      //this.collection.add(t);
      //this.sync("create", t, )
      return false; // prevent default form submission
    },

    keyAction: function (e) {
      //console.log('inputview event: keydown');
      //    if (e.which === ENTER_KEY) {
      //      console.log('submitting');
      //      this.collection.add({text: this.$el.val()});
      //      return false;
      //    }
    }
  });


  var inputView = new InputView({
    collection: trackings
  });

  var appView = new AppView(); // kick off app




});


