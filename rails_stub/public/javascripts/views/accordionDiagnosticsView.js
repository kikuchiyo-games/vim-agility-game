
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.DiagnosticsAccordionView = App.AccordionView.extend({
  initialize: function( ){
    this.el = 'div#summary-accordion';
    this.bellowViews = [new App.BellowSpatialAnalysisView(), new App.BellowDataMiningView(), new App.BellowProjectAnalysisView() ];
    this.render();
  }
});
