
App.ListAlertsView = App.ListView.extend({
	//events: { "click li.header button#newMessage":"newMessage" },
	initialize: function() {
		_.bindAll(this, 'render');
    this.collection = new App.AlertCollection({})
    // this.collection = new App.AlertCollection({})
		this.collection.bind('reset', this.render, this);
		this.collection.bind('remove', this.removed, this);
		this.collection.fetch();
    this.render();
	},
  render: function(){
    var alert_list = []
    this.collection.each(function(a){ alert_list.push( a.attributes['description'] ); });
    $( '#alerts_list' ).html("<li>" + alert_list.join("</li><li>") + "</li>")
  }
});
