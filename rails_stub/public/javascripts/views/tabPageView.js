
App.TabPageView = App.TabView.extend({

  initialize: function(){
    this.id = 'tabs';
    this.el = 'div#tabs';
    this.navId = 'navigation-list';
    this.tabHash = {'Diagnostics':'diagnostics'};
    this.templateId = 'tab-navigation-toolbar',

    this.generateNavigation();
    this.navTemplate = this.generateNavTemplate();
    this.render();
  }

});
