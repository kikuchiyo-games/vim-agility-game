
App.TabDiagnosticsMonitoringDetailView = App.TabView.extend({
  initialize: function(){
    this.el = 'div#tabs-monitoring',
    this.id = 'tabs-monitoring',
    this.navId   = 'tabs-monitoring-navigation';
    this.tabHash   = { 'Production Graph':'placeholder', 'Initialization Layout':'initialization-layout' };
    this.generateNavigation();
    this.navTemplate = this.generateNavTemplate();
    this.render();
  }
});
