
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.AccordionView = Backbone.View.extend({
  initialize: function( options ){
    this.bellowViews = this.options.bellowViews;
  },

  render: function( ){
    var self = this;
    $( self.el ).append( self.bellowViews[ 0 ].render() );
    for ( var bellow in self.bellowViews ) {
      if ( typeof bellow != 'function' ){
        alert( bellow );
        $( self.el ).append( self.bellowViews[ bellow ].render() );
      }
    }
    $( this.el ).accordion();
  }
});
