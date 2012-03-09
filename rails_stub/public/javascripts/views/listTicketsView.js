
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.ListTicketsView = App.ListView.extend({
	el: '#alert_list',
	events: { "click li.header button#newMessage":"newMessage" },
	initialize: function() {
		_.bindAll(this, 'render');
		this.collection.bind('reset', this.render, this);
		this.collection.bind('remove', this.removed, this);
		this.collection.fetch();
		// this.newMessageView = new App.CreateMessageView({collection: this.collection});		
		// this.editMessageView = new App.EditMessageView({collection: this.collection});
	},	

	newMessage: function() {
		this.render();
	},

	removed: function() {
		this.collection.fetch();
	},

	render: function() {
    var self = this;
		var container = $(this.el);		
		container.empty();				
		container.prepend('<ul><li class="header"><button id="newMessage">Submit New Posting</button></li></ul>');
		container = container.find('ul');
		alertListView = this;
		$( this.el ).html( _.template( $( '#' + 'alert_list_template' ).html(), self.collection ));
		return this;

    // this.collection.each(function(message) {													
    // 	var alertView = new App.alertRowView({ model: message });
    // 	container.append(alertView.render().el);
    // });

	}
});
