
App.TabDiagnosticsDetailView = App.TabView.extend({

  initialize: function(){
    this.el = 'div#tabs-detail';
    this.id = 'tabs-detail';
    this.navId = 'tabs-detail-navigation';
    this.tabHash = { 'Device Information':"device-information", 'Issues':"issues", 'Monitoring':"tabs-monitoring" };
    this.generateNavigation();
    this.navTemplate = this.generateNavTemplate();
    this.render();
  }

});
