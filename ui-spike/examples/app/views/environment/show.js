$(document).ready(function(){
  "use strict";  
  window.EnvironmentView = Backbone.View.extend({

    prepEnvNumbers = function( number ){
      var wrapper = { open:"<em><strong><span>", close:"</span></strong></em>" };
      return wrapper['open'] + number.toString().split('').join("</span><span>") + wrapper['close'];
    
    }, showEnvironment = function( options ){
      var co2    = prepEnvNumbers( options.total.co2   );
      var trees  = prepEnvNumbers( options.total.trees );
      var offset = prepEnvNumbers( options.total.miles );
         
      $( "#env-co2" ).html( co2 );
      $( "#env-car" ).html( offset );
      $( "#env-tree" ).html( trees );
    
      toggleChartTypeTo( options.metric_type );
    
      $( "#env-car" ).show();
      $( "#env-co2" ).show();
      $( "#env-tree" ).show();

    }, update = function (data, options) {
      chart_options = options;

      toggleChartTypeTo( chart_options.metric_type );
      setDateRangeLabel( chart_options.range_label );
      setButtonsFor( 'period', chart_options.period );
      setButtonsFor( 'metric', chart_options.metric_type);
      setRangeBrowseButtons( chart_options.period, chart_options.at_start, chart_options.at_end);
    
      if ( chart_options.metric_type == 'environment' ){
        showEnvironment( options );
        return;
      }
    }
  });
});
