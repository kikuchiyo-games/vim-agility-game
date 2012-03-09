
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.TsChartView = Backbone.View.extend({
  initialize: function( options ){
    this.mode = this.mode;
    this.model = this.model;
    this.source = this.options.source;
    this.tsChartId = this.options.tsChartId;
    this.xAxisLable = this.options.xAxisLable;
  },
  render: function(){
    if ( navigator.appName.match( /Microsoft/i ) == null ){
      $.plot($( this.el ), [d], { xaxis: { mode: "time" } });
      $.plot($( this.el ), [ 
        { label: "alerts",  data: d}
      ], {
          xaxis: { mode: this.mode /*"time"*/, label: this.xAxisLabel /*"kwh"*/ },
          series: {
            lines: { show: true },
            points: { show: false }
          }, grid: { backgroundColor: { colors: ["#fff", "#eee"] } }
      });
      $( this.el ).width = '1000px';
    }
  }
});
