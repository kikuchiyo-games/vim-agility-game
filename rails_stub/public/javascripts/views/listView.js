
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.ListView = Backbone.View.extend({

  // initialize: function( options ){
  //   this.source    = options.source;
  //   this.listId    = options.listId;
	// 	_.bindAll(this, 'render');
  //   // list view has no collection.  initialize is always overwritten by collection.
	// 	// this.collection.bind('reset', this.render, this);
	// 	// this.collection.bind('remove', this.removed, this);
  // },

  generateListTemplate: function(){
    var body = "<ul id = '" + this.listId + "'></ul>"
    return( body );
  },

  render: function(){
    var self = this;
    try { var tableRows = self.collection; } catch(e) { /*alert('error' + e);*/ return( false ); }
    // alert( _.pluck('details', tableRows.at(0).attributes['alert_list'][0] ) );
    // {
    //   "alert_list":[
    //     { "description":"this is an alert associated with the project you have selected." }
    //   ]
    // }
    // believe alert_list is beyond my control at moment.  must come back to this though to make sure...
    // but it will change depending on the list also...
    for ( var element in tableRows.at(0).attributes.alert_list ){ 
      var description = tableRows.at(0).attributes['alert_list'][element].description;
      if ( description != undefined ){ $( '#alerts_list' ).append( "<li>" + description + "</li>" ); }
    }
  }
});
