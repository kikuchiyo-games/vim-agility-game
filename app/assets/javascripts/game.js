var game = function( spec ){

  that = {};

  that.get_keycode = function( key, shift ){
    if ( !shift && key > 64 && key < 91 ){
      return ( parseInt( key, 10 ) + 32 ) + '';
    } else { return key; }
  };

  that.add_time_to_clock = function(){
    //
  };

  that.welcome_user = function(){
    //
  };

  that.make_rubies = function(){
    for ( var r=0; r < RUBIES; r++ ){

      if ( r % 2 == 0 ){

        var ruby_image = "/images/rubies/ruby.png"

      } else { var ruby_image = "/images/rubies/diamond.png" }

      page_rubies[ r ] = Rubies( r, ruby_image );
      page_rubies[ r ].draw(
        Math.floor( Math.random() * ( window.innerWidth - 100 ) ),
        Math.floor( Math.random() * ( window.innerHeight - 100 ) )
      );
      $( "#ruby" + r ).append( "<p>" + /* r + */ "</p>" );
    }
  };

  that.advance_to_next_level = function(){
    RUBIES++;
    that.make_rubies(); 
    that.welcome_user();
    that.add_time_to_clock();
  };

  that.player_won = function(){
    for ( var r in page_rubies ){
      if ( page_rubies[ r ] != undefined ){
        return false;
      }
    }
    return true;
  };
  
  return that;
};
