$(document).ready(function(){
  "use strict";  
  window.HighChartView = Backbone.View.extend({
    
    setXAxis = function (labels, name) {
      var xAxis = chart.get('xAxis');
      $(xAxis.axisTitle.element).text(name);  
      xAxis.setCategories(labels, false);

    }, setYAxis = function (max, name) {
      var yAxis = chart.get('yAxis');
      yAxis.setExtremes(0, max, false);  
      $(yAxis.axisTitle.element).text(name);

    }, drillDown = function () {
      if (chart_options.drill_down_url === null) { return; }
      chart.showLoading();
      
      var xIndex = $.inArray( this.category, chart_options.xaxis.labels );
      var drill_down_url = chart_options.drill_down_url + "?x=" + xIndex;  
      
      $.getJSON( drill_down_url, function ( results ) {
        update( results.data, results );
        chart.hideLoading();
    
      }).error( function ( xhr, status, error ) { chart.hideLoading(); } ); //ToDo Handle error here

    }, clearTotal = function(){ 

      $('li li.chart-total b').html('&nbsp;');

    }, setTotal = function(total){

      $('li.active li.chart-total b').text(total)

    }, update = function (data, options) {

      chart_options = options;
      toggleChartTypeTo( chart_options.metric_type );
      setDateRangeLabel( chart_options.range_label );
      setButtonsFor( 'period', chart_options.period );
      setButtonsFor( 'metric', chart_options.metric_type);
      setRangeBrowseButtons( chart_options.period, chart_options.at_start, chart_options.at_end);
      setTotal( chart_options.total );
      setYAxis( chart_options.yaxis.max, chart_options.yaxis.name);
      setXAxis( chart_options.xaxis.labels, chart_options.xaxis.name);
      setLegend( chart_options.legend.text );
      setData( data, chart_options.legend.color);
      redraw();
    }
  });
});
