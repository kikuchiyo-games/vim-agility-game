App.PartialView = Backbone.View.extend({

  initialize: function( ){ },

  render: function( template ){ 
    $( this.el ).html( _.template( $( '#' + template + '_template' ).html() ));
  }

});
