var Spear = function(){
  $( "body" ).append( "<div id=\"spear\">&nbsp;</div>" );
  var that = $( '#spear' );

  that.thrust = function(){
    that.x += 5;
    that[ 0 ].style.left = that.x + 'px'; 

    var x = Math.random(1);
    var angle = (90 * x);

    //alert('asdfadsf');
    if ( BROWSER == 'firefox' ){
      $( that ).css("-moz-transform", "rotate(" + angle + "deg)");
    } else { $( that ).css("-webkit-transform", "rotate(" + angle + "deg)"); }

    that.draw( that.x, that.y);

    if ( typeof( cs_dogma ) != 'undefined' && kill( cs_dogma ) ){ 
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

    if ( typeof( cs_dogma_sprinter ) != 'undefined' && kill( cs_dogma_sprinter  ) ){
      blood_x = cs_dogma_sprinter.x;
      blood_y = cs_dogma_sprinter.y;
      var name = cs_dogma_sprinter.name;
      cs_dogma_sprinter = null;
      delete cs_dogma_sprinter;
      $('#' + name ).css( 'backgroundImage', 'url( "/assets/blood.png" )' );
      $('#' + name ).css( 'backgroundSize', '50%' );
      $('#' + name ).css( 'width', '90px' );
      $('#' + name ).css( 'height', '20px' );
    }
  }

  kill = function( enemy ){
    if ( typeof( enemy ) == 'undefined' ){ return false }
    // console.log(  'cs_dogma.x = ' + enemy.x + ', cs_dogma.y = ' + enemy.y );
    // console.log(  'that.x = ' + that.x + ', that.y = ' + that.y );
    
    var x_intercept = ( Math.abs( that.x - enemy.x - 150 ) < 50 );
    var y_intercept = ( Math.abs( that.y - enemy.y ) < 50 );
    // console.log( 'x_intercept = ' + x_intercept );
    // console.log( 'y_intercept = ' + y_intercept );
    
    if ( !( x_intercept && y_intercept ) ){ return false }
    return true;

  };

  that.x = null;
  that.y = null;

  that.draw = function(){
    that.x = kikuchiyo.x + 145;
    that.y = kikuchiyo.y - 15;
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
    $( 'div' ).remove( '#spear' ); 
  };

  return that;
}
