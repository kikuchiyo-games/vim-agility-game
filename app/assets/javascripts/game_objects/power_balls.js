var PowerBall = function( id, power_ball_image ){
  $( "body" ).append( "<div id=\"power_ball" + id + "\" style = 'position:absolute;'></div>" );

  var power_ball_id = "#power_ball" + id;
  var that = $( power_ball_id );

  that.move = function(){
    var x_intercept = ( Math.abs( that.x - Players.kikuchiyo.x ) < 50 );
    var y_intercept = ( Math.abs( that.y - Players.kikuchiyo.y ) < 50 );
    if ( x_intercept && y_intercept ){
      GAME_OVER = true;
    }
    that.draw( that.x + 5, that.y);
  }

  that.power_ball_id = power_ball_id;
  that.x = null;
  that.y = null;

  that.draw = function( ){
    that.x = x;
    that.y = y;
    that[ 0 ].style.left = x + 'px'; 
    that[ 0 ].style.top = y + 'px'; 
  }; 
  
  that.image_width = 23;
  that.image_height = 23;
  that.power = 20;

  that.css({ 
    width:that.image_width + 'px', 
    height:that.image_height + 'px', 
    position:'absolute', 
    display:'block', 
    zIndex:'1000', 
    //background: 'url( /assets/blue_glossy_ball.png )' 
    background: 'url( /assets/spear_small.png )' 
  });

  that.destroy=function(){
    var remove_me = that.power_ball_id;
    $( 'div' ).remove( that.power_ball_id );
  };

  return that;
}
