App.GameView = Backbone.View.extend({

  initialize: function(){
    this.el = 'document';
    this.over = false;
    var that = this;
    this.treasure = new App.TreasureView();
    this.kikuchiyo = new App.KikuchiyoView({game:this});
    var that = this;
    setInterval(function(){ if ( !that.over ){ that.check_game_state();} }, 1000);
  },
  
  rubies: function( player ){
    return( this.treasure.got_ruby( player ) );
  },

  check_game_state: function(){
    var that = this;
    if (that.treasure.no_more_treasure()){
      this.over = true;
      alert('you win!');
      $( that.el ).remove();
    }
  }

});
