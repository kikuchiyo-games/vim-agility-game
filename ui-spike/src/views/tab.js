
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.TabView = Backbone.View.extend({
  initialize: function( options ){
    this.navId   = this.options.navId;
    this.tabHash   = this.options.tabHash;
    this.navTemplate = this.generateNavTemplate();
    this.generateNavigation();
  },

  generateNavTemplate: function(){
    return( "<ul id=\"" + this.navId + "\"><li></li></ul>" );
  },

  generateNavigation: function(){
    var navComponent = '';
    for ( var navC in this.tabHash ){
      navComponent += "<li><a href = \"" + this.tabHash[navC] + "\">" + navC + "</li>"
    }
    this.navTemplate = this.navTemplate.replace("<li></li>", navComponent );
  },

  render: function(){
    var oldHTML = this.el.innerHTML;
    this.el.innerHTML = this.navTemplate;
    this.el.innerHTML += oldHTML;
  },

  toTab: function( ){
    // Again this.el does not work and I must resort to jQuery...
    // this.el.tabs();
    $( '#' + this.id ).tabs();
  }

});
