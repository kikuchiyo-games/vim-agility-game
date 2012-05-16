
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.BellowProjectAnalysisView = App.BellowView.extend({
  initialize: function(){
    this.template = 'project_analysis_bellow_template';
  }
});
