
App.TabView = Backbone.View.extend({
  initialize: function( options ){
    this.navId   = this.options.navId;
    this.tabHash   = this.options.tabHash;
    this.generateNavigation();
    this.navTemplate = this.generateNavTemplate();
  },

  generateNavTemplate: function(){
    return( "<ul id='" + this.navId + "'>" + this.navComponent + "</ul>" );
  },

  generateNavigation: function(){
    this.navComponent = '';
    for ( var navC in this.tabHash ){
      this.navComponent += "<li><a href = '#"+this.tabHash[navC]+"'>" + navC + "</a></li>"
    }
  },

  render: function(){
    $( this.el ).prepend( this.navTemplate );
    this.toTab();
  },

  toTab: function( ){
    $( this.el ).tabs();
  }

});
