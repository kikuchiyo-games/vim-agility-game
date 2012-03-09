
App.TabDiagnosticsIssueDetailView = App.TabView.extend({
  initialize: function(){
    this.el = 'div#tabs-alert-details';
    this.id = 'tabs-alert-details';
    this.navId  = 'tabs-alert-details-navigation';
    this.tabHash = { 'Tickets':'tickets', 'Alerts':'alerts' };
    this.generateNavigation();
    this.navTemplate = this.generateNavTemplate();
    this.render();
  }
});
