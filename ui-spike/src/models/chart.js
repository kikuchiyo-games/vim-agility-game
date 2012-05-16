	App.Chart = Backbone.Model.extend({
		currentPeriod: function() { return this.get('period'); },
		currentRange: function() { return this.get('range'); },
		currentMetric: function() { return this.get('metric'); },
		url: function() {
			return "/foobar";
		}
	});
