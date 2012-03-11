// --------------------------------------------------
// player:
// --------------------------------------------------
//   Object
//     Can ask() questions
//     Can move()
//     Is  bound_to_screen()
//     Has sprite_sheet()
//     Can animate()
//     Is  destroyable()
//     Is either good_or_evil()
// Test specs: dev_kikuchiyo_spec.js
// Requires animation.js, sheets_clips.js, movement.js


// --------------------------------------------------
// QUNIT = false in production...
// --------------------------------------------------
//
// For testing, the more liberal
// < 30 requirement fails, becasue we pick up multiple
// rubies with one swipe, occasionally, if placed in
// such a convenient manner for the user.  luck you!
// to test, we ensure the == 0 condition.  Otherwise
// rubies are missing, and the test fails...

QUNIT = false;

var player = function( spec ){

  var that = {};
  that.last_sheet = null;
  that.current_image_index = 0;
  that.name = spec.name;
  that.div_id = spec.div_id;
  that.nature = spec.nature;
  that.rubies = 0;
  that.points = 0;
  that.diamonds = 0;
  that.bravery_points = 0;
  that.command_time = new Date();

  that.user_controls = spec.user_controls || false;

  that.math_floor = Math.floor;
  //that.image_width = 594;
  //that.height = 64;
  //that.width = 59;
  that.image_width = 595;
  // good with no_transport
  that.height = 72.25; 
  that.width = 59.24;

  // fair, but not good enough 
  //  that.height = 69.8; 
  //  that.width = 59.24;

  // that.height = 60;
  // that.width = 50;

  that.x = spec.x || 100;
  that.y = spec.y || 100;

  that.speed= spec.speed|| 20;
  that.distance = spec.distance || 100;
  that.direction = spec.direction || "right";

  that.last_key_press = spec.last_key_press || "108"

  that.sheets = {
    //good:"../images/kikuchiyo_sprite_sheet_try_3.png", //good:"images/kikuchiyo_sprite_sheet_alpha.png",
    //good:"../images/no_transport.png",
    good:"../images/digital_kikuchiyo.png",
    
    evil:"../images/mega_man_evil.png"
  }; 

  that.set_sheet = function(){
    try {
      that.sheet = that.sheets[ that.nature ];
      that.teleportation_sheet = "../images/teleportation.png";
    } catch (e) {
      alert( that.nature + "has no associated sheet. Cannot animate." );
    }
  };

  that.set_sheet();

  that.get_sheet = function(){
    return that.sheet;
  };

  //how to test? test response
  that.ask = function( question ){
    return prompt( question, "" );
  };

  //how to test?
  that.state = function( statement ){
    alert( statement );
  };

  that.get_nature=function(){
    return that.nature;
  }; 

  that.get_location=function(){
    return { x:that.x, y:that.y };
  }; 

  that.set_location=function( spec ){
    that.x = spec.x;
    that.y = spec.y;
  }; 

  that.get_movement = function( key_press ){
    try {
      return movement( that.speed, that.distance ).kikuchiyo[ key_press ];
    } catch ( e ) { return null } //user simply hit a key we do not map to an action
  };

  that.is_teleport_key_press = function( key_press ){
    return ( ["72", "48", "76", "77", "52"].indexOf( key_press ) != -1)
  };

  that.get_animation = function( key_press ){
    try {
      if ( that.is_teleport_key_press( key_press ) ){
        return sheet_clips.kikuchiyo.teleport;
      } else { return animation.kikuchiyo[ key_press ] }
    } catch ( e ) { return null } //user simply hit a key we do not map to an action
  };

  that.point_is_on_screen = function( key_press ){

    var x = that.x;
    var y = that.y;

    var new_movement = that.get_movement(key_press); 

    if (new_movement.z == 'teleport') {
      that.element.css({ backgroundImage: 'url(' + that.teleportation_sheet + ')' });
      that.draw();
      if ( new_movement.x != -1 ) { that.x = new_movement.x }
      if ( new_movement.y != -1 ) { that.y = new_movement.y }

    } else {

      if (0 <= ( x + new_movement.x ) && ( x + new_movement.x ) <=  window.innerWidth  ) { 
        that.x += new_movement.x 
      }

      if (0 <= ( y + new_movement.y ) && ( y + new_movement.y ) <=  window.innerHeight ) { 
        that.y += new_movement.y 
      }

    }

  }

  that.execute_command = function( key_press ){

    that.command_time = new Date();

    if ( key_press == '16' ){ return true }

    if ( key_press == '59' ){ 
      that.ask( "State your query below: " );
      return true 
    }

    if ( key_press == '105' ){
      that.got_ruby();
    }

    var new_animation = that.get_animation( key_press );

    if ( new_animation == null ){ return }
    that.last_sheet = that.active_sheet;
    that.last_key_press = key_press;
    that.point_is_on_screen( key_press );
    that.draw();
  };

  that.draw=function(){

    // that.style.left = that.x + 'px'; 
    // that.style.top  = that.y + 'px'; 
     
    that.style.left = that.x + 'px'; 
    that.style.top  = that.y + 'px'; 
  };

  that.make_cell_on_page=function(){

    var div_style = "style=\"overflow:hidden; width:" + that.width + "px; height:" + that.height + "px; position:absolute;\"";
    that.element = $("#draw-target").append( '<div id = \'kikuchiyo\' ' + div_style + '></div>' ).find( ':last' );
    that.style = that.element[ 0 ].style;
    that.element.css({ 
      width:that.width, 
      height:that.height, 
      height:that.height, 
      padding:0,
      margin:0,
      backgroundImage: 'url(' + that.sheet + ')',
      overflow:'hidden'
    });

    that.draw();

  }; that.make_cell_on_page();

  that.change_image = function(){

    var index = that.current_image;

    index *= that.width;

    var height = that.height;
    var math_floor = that.math_floor; 
    var image_width = that.image_width;
    var hOffset = -index % image_width;
    var vOffset = -math_floor( index / image_width ) * height;

    that.style.backgroundPosition = hOffset + 'px ' + vOffset + 'px';

  };

  that.idle_user=function(){
    var now = new Date();
    return ( now.getTime() - that.command_time.getTime() ) / 1000 > 0.5; 
  }

  that.user_rapid_tapping=function(){
    var now = new Date();
    return ( now.getTime() - that.command_time.getTime() ) / 1000 > 0.5; 
  }

  that.animate=function(){
     
    if ( that.idle_user() ) { setTimeout( that.animate, 140 ); return }

    var sheet_to_animate = that.get_animation( that.last_key_press );


    if ( sheet_to_animate.teleport == null ) {
      that.element.css({ backgroundImage: 'url(' + that.sheet + ')' });
      that.draw();
      var sheet_range = sheet_to_animate.action;
    } else { 
      alert('yo!');
      that.element.css({ backgroundImage: 'url(' + that.teleportaion_sheet + ')' });
      that.draw();
      var sheet_range = sheet_to_animate 
    }

    that.active_sheet = sheet_range;

    if ( that.active_sheet != that.last_sheet ) { that.current_image_index = -1; }

    ( that.current_image_index )++

    if ( that.current_image_index < sheet_range.length ) {

      that.current_image = sheet_range[ that.current_image_index ];

    } else { 

      that.current_image_index = 0;
      that.current_image = sheet_range[ 0 ];

    }
   
    that.change_image();
    that.set_location( { x:that.x, y:that.y } );
    setTimeout( that.animate, 140 );
  }; 

  that.got_ruby = function(){
    for ( r in page_rubies ){
      var this_ruby = page_rubies[ r ];
      if ( this_ruby == undefined ){ continue }

      var x_diff = Math.abs(this_ruby.x - that.x );
      var y_diff = Math.abs(this_ruby.y - that.y );

      var x_interception = ( 30 <= x_diff && x_diff <= 60 );
      var y_interception = ( 10 <= y_diff && y_diff <= 60 );

      if ( x_interception && y_interception ) {
        that.rubies += this_ruby.rubies;
        that.points += this_ruby.points;
        that.diamonds += this_ruby.diamonds;

        $("li.score-points").html("Experience Points:" + that.points);
        $("li.score-rubies").html("Rubies:" + that.rubies);
        $("li.score-diamonds").html("Diamonds:" + that.diamonds);

        this_ruby.destroy();
        play_sound( 'picked_up_gem' );
        page_rubies[ r ] = undefined;
      }
    }
  };
  return that;
};
