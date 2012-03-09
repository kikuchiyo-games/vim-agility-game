(function($){
	"use strict";	
  window.Chart = Backbone.Model.extend({

    initialize: function( data, options, renderTo ){

      this.set( { json_undefined: typeof JSON == 'undefined' });
      this.set( { renderTo: 'chart' });
      this.set( { options:options })
      this.set( { data:data });
      this.create_time_series();
      this.set_series_name();

    }, reset: function( data, options, renderTo ){
      window.time_series.get('chart').showLoading();
      this.set( { json_undefined: typeof JSON == 'undefined' });
      this.set( { renderTo: 'chart' });
      this.set( { options:options })
      this.set( { data:data });
      this.set_series_name();

    }, create_time_series: function(){

      window.time_series = new TimeSeries( this.get('options'), this.get('renderTo'));

    }, set_series_name : function(){

		  this.set( { series_name: this.get('options').legend });

    }, set_time_series_data: function( time_series_json ){

      if ( this.get('json_undefined') ){
        var time_series = $.parseJSON( time_series_json );
        this.set({ time_series_data:time_series  }); 
      } else {
        var time_series = JSON.parse( JSON.stringify( time_series_json ) );
        this.set({ time_series_data: time_series });
      }

    }, setLegend:function (text) {		

		  var series = this.get('series_name');

      debugger;
	  	var chart = window.time_series.get('chart');
		  series.text = text;
		  series.legendItem = series.legendItem.destroy();
		  this.set({isDirtyLegend: true});
		  this.set({time_series: series});

	  }, setData:function ( data, color ) {

		  var series = window.time_series.get('series_name');

	  	var chart = window.time_series.get('chart');
      chart.get(series).setData(data, 'red');
      chart.get(series).chart.color = color;
      window.time_series.set({chart:chart});
    }
  });
})(jQuery);
