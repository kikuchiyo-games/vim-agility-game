var Spear = function( options ){
  $( "#draw-target" ).append( "<div id=\"spear_" + options.player.name +
    "\" syle = 'z-index:999 !important;'>&nbsp;</div>" 
  );
  var that = $( '#spear_' + options.player.name );
  that.indicator = '#spear_' + options.player.name;
  that.player = options.player;
  //}

  that.thrust = function(){
    //that.x += 5;
    that[ 0 ].style.left = that.x + 'px'; 
    play_sound( 'spear-swing' );
    var x = Math.random(1);
    var angle = (90 * x);

    if ( BROWSER == 'fire_fox' ){
      $( that ).css("-moz-transform", "rotate(" + angle + "deg)");
    } else { $( that ).css("-webkit-transform", "rotate(" + angle + "deg)"); }

    that.draw( that.x, that.y);
    if ( that.indicator == '#spear_kikuchiyo' ){
      if ( typeof( cs_dogma ) != 'undefined' && that.kill( cs_dogma ) ){ 
        blood_x = cs_dogma.x;
        blood_y = cs_dogma.y;
        var name = cs_dogma.name;
        cs_dogma = null;
        delete cs_dogma;
        $('#' + name ).css( 'backgroundImage', 'url( "/assets/blood.png" )' );
        $('#' + name ).css( 'backgroundSize', '50%' );
        $('#' + name ).css( 'width', '90px' );
        $('#' + name ).css( 'height', '20px' );
        kikuchiyo.kills += 1;
        $('#kills').text(kikuchiyo.kills)
      }

      if ( typeof( cs_dogma_sprinter ) != 'undefined' && that.kill( cs_dogma_sprinter  ) ){
        blood_x = cs_dogma_sprinter.x;
        blood_y = cs_dogma_sprinter.y;
        var name = cs_dogma_sprinter.name;
        cs_dogma_sprinter = null;
        delete cs_dogma_sprinter;
        $('#' + name ).css( 'backgroundImage', 'url( "/assets/blood.png" )' );
        $('#' + name ).css( 'backgroundSize', '50%' );
        $('#' + name ).css( 'width', '90px' );
        $('#' + name ).css( 'height', '20px' );
        kikuchiyo.kills += 1;
        $('#kills').text(kikuchiyo.kills)
      }
    } else {
      if ( typeof( kikuchiyo ) != 'undefined' && that.kill( kikuchiyo ) ){ 
        blood_x = kikuchiyo.x;
        blood_y = kikuchiyo.y;
        var name = kikuchiyo.name;
        kiluchiyo = null;
        delete kikuchiyo;
        $('#' + name ).css( 'backgroundImage', 'url( "/assets/blood.png" )' );
        $('#' + name ).css( 'backgroundSize', '50%' );
        $('#' + name ).css( 'width', '90px' );
        $('#' + name ).css( 'height', '20px' );
        end_game( "Well, that's one way to die...", 'Respawn?' );
        // kikuchiyo.kills += 1;
        // $('#kills').text(kikuchiyo.kills)
      }
    }
  }

  that.kill = function( enemy ){

    if ( typeof( enemy ) == 'undefined' ){ return false }

    // console.log(  'cs_dogma.x = ' + enemy.x + ', cs_dogma.y = ' + enemy.y );
    // console.log(  'that.x = ' + that.x + ', that.y = ' + that.y );
    // var x_intercept = ( Math.abs( that.x - enemy.x - 82 ) < 10 );
    // var y_intercept = ( Math.abs( that.y - enemy.y - 80) < 50 );
    // console.log( 'x_intercept = ' + x_intercept );
    // console.log( 'y_intercept = ' + y_intercept );

    var kl = $( that.indicator ).offset().left;
    var kt = $( that.indicator ).offset().top;
    var matl = $( '#' + enemy.name ).offset().left;
    var matt = $( '#' + enemy.name  ).offset().top;

    var kb = $( that.indicator ).height() + kt;
    var matb = $( '#' + enemy.name  ).height() + matt;

    var kr = $( that.indicator ).width() + kl;
    var matr = $( '#' + enemy.name  ).width() + matl;

    var a =  ( kr < matl );
    var b =  ( kl > matr );
    var c =  ( kt > matt + 40 );
    var d =  ( kb < matb + 40 );

    //console.log( 'kl = ' + kl + ' matl' + b + ' ' + c + ' ' + d );

    if ( kr < matl ){
      // console.log( 'spear too far left' );
      return false;
    } else if ( kl > matr ){ 
      // console.log( 'kikuchiyo too far right' );
      return false;
    } else if ( kt > matt ){ 
      // console.log( 'spear too high' );
      return false;
    } else if ( kb < matb - 50 ){ 
      // console.log( 'spear too low' );
      return false;
    } else { 
      // console.log( 'collision!' );
      play_sound( 'blood-splat' );
      return true; 
    }
 
    // if ( !( x_intercept && y_intercept ) ){ return false }
    // return true;
  };

  that.x = null;
  that.y = null;

  that.draw = function(){
    that.x = that.player.x - 10;// + 140;
    that.y = that.player.y - 15;// + 90;
    that[ 0 ].style.left = that.x + 'px'; 
    that[ 0 ].style.top = that.y + 'px'; 
  }; 
  
  that.image_width = 80;
  that.image_height = 68;
  that.power = 20;

  that.css({ 
    width:that.image_width + 'px', 
    height:that.image_height + 'px', 
    position:'absolute', 
    display:'block', 
    zIndex:'900', 
    backgroundImage: 'url( /assets/spear_small.png )'
  });

  that.destroy = function(){ 
    $( 'div' ).remove( that.indicator ); 
  };

  return that;
}
