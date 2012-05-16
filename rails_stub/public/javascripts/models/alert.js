App.Alert = Backbone.Model.extend({
	initialize: function() {
		this.bind("remove", function() {
		  this.destroy();
		});
	}
});
