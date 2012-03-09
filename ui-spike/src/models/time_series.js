App.TimeSeries = Backbone.Model.extend({
    initialize: function( chart_options, renderTo ){
      this.set({renderTo:renderTo}) ;
      this.set({chart_options:chart_options}) ;
      var chart = this.create_chart();
      this.set({chart:chart});

    }, drillDown: function () {

      var chart_options = App.chart.get('options');
		  if (chart_options.drill_down_url === null) { return }
		  App.view.showLoading();
		  var xIndex = $.inArray( this.category, chart_options.xaxis.labels );
		  var drill_down_url = chart_options.drill_down_url + "?x=" + xIndex;	
      App.controller.update_chart(drill_down_url);

	  }, create_chart: function () {

      var chart_options = this.get('chart_options');
		  var series_name = chart_options.legend.text;	
      this.set({series_name:series_name});
      var self = this;
		  return new Highcharts.Chart({
		  	chart: {
		  		height: 270,
		  		renderTo: self.get('renderTo') ? self.get('renderTo') : 'chart',
		  		type: 'column'

		  	}, title: {
		      text: ' '

		    }, legend: {

		  		floating: true,
		  		align: 'right',
		  		verticalAlign: 'top',
		  		x: 0, y: 0,
		  		borderWidth: 0

		  	}, tooltip: {
		  		formatter: function () {
		  			return this.point.tooltip;
		  		}

		  	}, xAxis: {
		  		id: 'xAxis',
		  		categories: chart_options.xaxis.labels,
		  		title: {
		  			text: chart_options.xaxis.name
		  		}

		  	}, yAxis: {
		  		id: 'yAxis',
		  		title: {
		  			text: chart_options.yaxis.name
		  		},
		  		max: chart_options.yaxis.max

		  	}, credits: {
		  		enabled: false

		  	}, series: [{
		  		id: series_name,
		  		name: series_name,
		  		data: chart_options.data,
		  		color: chart_options.legend.color,
		  		events: {
		  			legendItemClick: function (event) {
		  				return false;
		  			}
		  		},
		  		cursor: 'pointer',
		  		point: {
	          events: {
	            click: self.drillDown
	          }
	        }
		  	}]
		  });	
	  }
  });
