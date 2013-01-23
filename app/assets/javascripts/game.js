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

      var width = $('#draw-target').width();
      var height = $('#draw-target').height();
      //alert( width );
      //alert( height );
      page_rubies[ r ] = Rubies( r, ruby_image );
      page_rubies[ r ].draw(
        Math.floor( Math.max( $('#draw-target').position().left, Math.random(1) * width  ) ),
        Math.floor( Math.max( $('#draw-target').position().top + 100, Math.random(1) * height ) )
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
