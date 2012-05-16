(function($){
  "use strict";  
  var model;
  var chart_options;

  window.ChartView = Backbone.View.extend({

    initialize: function(){

      this.model = window.chart;
      this.time_series = window.time_series;
	  	this.chart = window.time_series.get('chart');

    }, clear_chart: function(){

      this.chart.showLoading();

    }, setDateRangeLabel:function ( date ) {
      var date_range_action = new Array();

      date_range_action[true] = '';
      date_range_action[false] = date;

      $('.data-range').text( date_range_action[date === null]);

    }, setButtonsFor:function( type, klass )  {

      var klasses_for = {
        'period':[ '.1D', '.1W', '.1M', '.1Y', '.All' ],
        'metric':[ '.energy', '.value', '.environment' ]
      };
    
      $.each( klasses_for[ type ], function( i, button ) {
        $( button ).removeClass( 'active' );
        $( button + " a" ).blur();
      });
    
      $( "." + klass ).addClass( 'active' ).focus();

    }, setRangeBrowseButtons:function ( period, at_start, at_end ) {
      
      var toggleClassesToActive = function( klasses ){
        $.each( klasses, function( i, klass ){
          $( klass ).removeClass( 'inactive' );
          $( klass ).addClass( 'active' );
        });
      };
    
      var toggleClassesToInActive = function( klasses ){
        $.each( klasses, function( i, klass ){
          $( klass ).removeClass( 'active' );
          $( klass ).addClass( 'inactive' );
        });
      };
    
      toggleClassesToActive( [ '.prev', '.next', '.first', '.last' ] );
      if ( at_start        ) { toggleClassesToInActive( [ '.prev', '.first' ]                   ); }
      if ( at_end          ) { toggleClassesToInActive( [ '.next', '.last'  ]                   ); }
      if ( period == 'All' ) { toggleClassesToInActive( [ '.prev', '.next', '.first', '.last' ] ); }

    }, toggleChartTypeTo:function( type ) {

      if ( type != 'environment' ){ 

        $( "#environment-content" ).hide();
        $( "#chart" ).show();

      } else {

        $( "#chart" ).hide();
        $( "#environment-content" ).show();

      }

    }, showLoading:function(){ 

      this.chart.showLoading(); 

    }, hideLoading:function(){ 

      this.chart.hideLoading(); 

    }, 	update: function (data, options) {

      this.prepareShow( data, options);

      if ( data.metric_type == 'environment' ){

        this.showEnvironment( data, options );

      } else { 
        $('li li.chart-total b').html('&nbsp;');
        this.showTimeSeries( data, options) 
      }
      window.time_series.get('chart').hideLoading();

    }, prepareShow: function(data, options){

      this.clear_chart();
      this.toggleChartTypeTo( data.metric_type );
  		this.setDateRangeLabel( data.range_label );
      this.setButtonsFor( 'period', data.period );
      this.setButtonsFor( 'metric', data.metric_type);
  		this.setRangeBrowseButtons( data.period, data.at_start, data.at_end);

    }, showEnvironment: function( options ){

      var co2    = this.prepEnvNumbers( options.total.co2   );
      var trees  = this.prepEnvNumbers( options.total.trees );
      var offset = this.prepEnvNumbers( options.total.miles );
      $( "#env-co2" ).html( co2 );
      $( "#env-car" ).html( offset );
      $( "#env-tree" ).html( trees );
      // this.toggleChartTypeTo( options.metric_type );
      $( "#env-car" ).show();
      $( "#env-co2" ).show();
      $( "#env-tree" ).show();

    }, prepEnvNumbers: function( number ){

      var wrapper = { open:"<em><strong><span>", close:"</span></strong></em>" };
      return wrapper['open'] + number.toString().split('').join("</span><span>") + wrapper['close'];
    
    }, showTimeSeries: function( data, options ){

  		this.setTotal( data.total );
  		this.setYAxis( data.yaxis.max, data.yaxis.name);
  		this.setXAxis( data.xaxis.labels, data.xaxis.name);
  		this.setLegend( data.legend.text );
  		this.setData( options, data.legend.color);
  		this.redraw();

    }, 	setLegend: function (text) {		
		  var series = window.chart.get("series_name");
		  series.text = text;
		  // series.legendItem = series.legendItem.destroy();
		  this.chart.isDirtyLegend = true;

	  }, setData: function (data, color) {
		  var series = window.chart.get("series_name");

      window.chart.setData( data, false );
      if ( color === null ) { alert('color is null, let us see what is going on in data'); debugger; }
		  // series.color = color;

	  }, setXAxis: function (labels, name) {

		  var xAxis = this.chart.get('xAxis');
		  $(xAxis.axisTitle.element).text(name);	
		  xAxis.setCategories(labels, false);

	  }, setYAxis : function (max, name) {

		  var yAxis = this.chart.get('yAxis');
		  yAxis.setExtremes(0, max, false);	
		  $(yAxis.axisTitle.element).text(name);

	  }, redraw : function () {

	  	this.chart.redraw();

	  }, setTotal: function (total) {

		  $('li.active li.chart-total b').text(total);

	  }
  });
})(jQuery);
