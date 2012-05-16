(function(){
	"use strict";	
  var model; 
  var view;

  window.ChartController = Backbone.Router.extend({

    initialize: function( json ){
      this.render( json, null );

    }, update_chart: function( url ){
      var self = this;
      $.getJSON( 
        url,
        function ( results, url ) { self.render( results, url ); }
      ).error( function ( url ) { 
        // handle error here... alert( 'error ' + url ); 
      });

    }, render: function( results, url ){

      window.chart.reset( results.data, results, 'chart' ) ;
      window.chart.set_time_series_data( results.data );
      window.chart.setData( window.chart.get('time_series_data'), 'red' );
      window.view.update( results, results.data );
      this.last_menu_tab = results.data.metric_type;
      if ( url != null ){ 
        _gaq.push( [ '_trackPageview', url ] ); // '_trackEvent' is the pageview event, 
      }
    }
  })
})(jQuery);
