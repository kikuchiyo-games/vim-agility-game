App.TreasureView = Backbone.View.extend({

  initialize: function(){
    this.el = 'body';
    this.treasures = 10;
    this.page_treasures = [];
    this.make_rubies();
  },

  make_rubies: function(){
    for ( var r=0; r < this.treasures; r++ ){
      if ( r % 2 == 0 ){
        var ruby_image = "../images/ruby.png"
      } else { var ruby_image = "../images/diamond.png" }
      this.page_treasures[ r ] = new App.GemView( {id:r, ruby_image:ruby_image} );
    }
  },

  create_rubies: function(){
    this.treasures++;
    this.make_treasure();
  },

  no_more_treasure: function(){
    for ( var r in this.page_treasures ){
      if ( this.page_treasures[ r ] != undefined ){
        return false;
      }
    } return true;
  },

  got_ruby: function( player ){
    for ( r in this.page_treasures ){
      if ( this.page_treasures[ r ].earned_by_player( player ) ){ 
        //this.page_treasures[ r ] = undefined;
        this.page_treasures.splice(r, 1);
        return( true ); 
      }
    }
    return( false );
  }
});
