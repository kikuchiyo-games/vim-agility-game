var Rubies = function( id, ruby_image ){
  $( "body" ).append( "<div id=\"ruby" + id + "\"></div>" );

  var ruby_id = "#ruby" + id;
  var that = $( ruby_id );

  that.ruby_id = ruby_id;
  that.x = null;
  that.y = null;

  that.draw = function( x, y ){
    that.x = x;
    that.y = y;
    that[ 0 ].style.left = x + 'px'; 
    that[ 0 ].style.top = y + 'px'; 
  }; 
  
  if ( ruby_image.indexOf( "diamond" ) == -1 ){
    that.image_width = 30;
    that.image_height = 30;
    that.points = 20;
    that.rubies = 1;
    that.diamonds = 0;

  } else { 
    that.image_width = 37; 
    that.image_height = 22;
    that.points = 10;
    that.rubies = 0;
    that.diamonds = 1;
  }

  that.css({ 
    width:that.image_width + 'px', 
    height:that.image_height + 'px', 
    position:'absolute', 
    backgroundImage: 'url(' + ruby_image + ')' 
  });

  that.destroy=function(){
    var remove_me = that.ruby_id;
    $( 'div' ).remove( that.ruby_id );
  };

  return that;
}
