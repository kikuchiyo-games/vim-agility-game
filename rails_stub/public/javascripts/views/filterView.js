
App.FilterView = Backbone.View.extend({
	initialize: function( options ) {
    this.el = this.options.el;
    this.render();
	},
  render: function(){
    $( this.el ).html( _.template( $( '#' + 'filter_template' ).html() ) );
  }
});
