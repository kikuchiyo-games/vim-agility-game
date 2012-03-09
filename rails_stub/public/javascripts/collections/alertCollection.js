App.AlertCollection = Backbone.Collection.extend({ 
  url: function(){
    return( '/alerts' );
  },
  model:App.Alert
});
