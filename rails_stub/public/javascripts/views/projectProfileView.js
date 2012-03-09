

App.ProjectProfileView = Backbone.View.extend({
	//events: { "click li.header button#newMessage":"newMessage" },
	initialize: function() {
    this.render();
	},
  render: function(){
    $( '#profile' ).html( _.template( $( '#' + 'project_profile_template' ).html() ) );
  }
});
      
