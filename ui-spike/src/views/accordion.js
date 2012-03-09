
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
    this.bellows = this.options.bellows;
    this.bellowViews = []
    this.createBellows();
  },

  createBellows: function(){
    for( var b in this.bellows ){
      var bellow = this.bellows[b];
      this.bellowViews.push( 
        new App.BellowView({
          id: bellow.id,
          h3Id: bellow.h3Id,
          divId: bellow.divId,
          aClass: bellow.aClass,
          displayText: bellow.displayText,
          accordionId: bellow.accordionId
        })
      );
    }
  },

  renderBellowViewH3: function( bellowView ){
    $( this.el ).append( this.bellowViews[ bellowView ].h3Content );
  },

  renderBellowViewDiv: function( bellowView ){
    var bellow = this.bellowViews[ bellowView ];
    $( this.el ).append( bellow.divContent( bellow.divId ));
  }
});
