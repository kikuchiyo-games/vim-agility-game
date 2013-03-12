
var player = function( spec ){
  var that = {};

  // to => initialization
  that.last_sheet = null;
  that.current_image_index = 0;
  that.name = spec.name;
  that.div_id = spec.div_id;
  that.nature = spec.nature;
  that.rubies = 0;
  that.points = 0;
  that.diamonds = 0;
  that.bravery_points = 0;
  that.kills = 0;
  that.command_time = new Date();
  that.diamond_quota = 20;
  that.user_controls = spec.user_controls || false;
  that.health = 2;

  var spear = new Spear( { player: that } );

  that.spear = spear;
  that.spear.draw();

  that.math_floor = Math.floor;
  that.image_width = 596;
  that.height = 68;
  that.width = 59.5;

  that.x = spec.x || 100;
  that.y = spec.y || 100;

  that.speed= spec.speed|| 20;
  that.distance = spec.distance || 100;
  that.direction = spec.direction || "right";

  that.last_key_press = spec.last_key_press || "108"

  // to => sheets object?
  that.sheets = {
    good:"/assets/sheets/mega_man_boss.png",
    evil:"/assets/sheets/mega_man_evil.png"
  }; 

  that.set_sheet = function(){
    try {
      that.sheet = that.sheets[ that.nature ];
    } catch (e) {
      alert( that.nature + "has no associated sheet. Cannot animate." );
    }
  };

  that.to_death = function(){
    $('#' + that.name ).css( 'backgroundImage', 'url( "/assets/blood.png" )' );
    $('#' + that.name ).css( 'backgroundSize', '50%' );
    $('#' + that.name ).css( 'width', '90px' );
    $('#' + that.name ).css( 'height', '20px' );
  };


  that.set_sheet();

  that.get_sheet = function(){
    return that.sheet;
  };

  // to => talk module?
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

  // to => location module?
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

    //var teleport_keys = sheet_clips.kikuchiyo.teleport;
    //   return teleport_keys.indexOf( key_press ) != -1;

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

      if ( new_movement.x != -1 ) { that.x = new_movement.x }
      if ( new_movement.y != -1 ) { that.y = new_movement.y }

    } else {

      var kl = $( '#' + that.name ).offset().left;
      var kt = $( '#' + that.name ).offset().top;
      var matl = $( '#draw-target'  ).offset().left;
      var matt = $( '#draw-target'  ).offset().top;

      var kb = $( '#' + that.name ).height() + kt;
      var matb = $( '#draw-target'  ).height() + matt;

      var kr = $( '#' + that.name ).width() + kl;
      var matr = $( '#draw-target'  ).width() + matl;

      if ( kl < matl ){
        that.x += 10;
        return;
      } else if ( kt < matt ){
        that.y += 10;
        return;
      } else if ( kb > matb ){
        that.y -= 10;
        return;
      } else if ( kr > matr ){
        that.x -= 10;
        return;
      }

      that.y += new_movement.y 
      that.x += new_movement.x 
      return;

      if ( that.name.match( /cs_dogma/ ) ){
        that.y += new_movement.y 
        that.x += new_movement.x 
        return;
      }

      if ( -100 <= ( x + new_movement.x ) && ( x + new_movement.x ) <=  window.innerWidth -200 ) { 
        that.x += new_movement.x 
      }

      if ( -75 <= ( y + new_movement.y ) && ( y + new_movement.y ) <=  window.innerHeight - 200 ) { 
        that.y += new_movement.y 
      }

    }

  }

  // to => game object?
  that.beat_level = function(){

    var x_escape_route = parseInt( $('#escape_route').position().left );
    var x_kikuchiyo = parseInt( $('#kikuchiyo').position().left )
    var y_kikuchiyo = parseInt( $('#kikuchiyo').position().top ) - $('#kikuchiyo').height();
    var y_escape_route = parseInt( $('#escape_route').position().top ) - 
      parseInt( $('#escape_route').height() );

    var x_interception = ( 
      Math.abs( Math.abs( x_kikuchiyo ) - x_escape_route ) < 50 
    );

    var y_interception = ( 
      Math.abs( y_escape_route + y_kikuchiyo ) < 50 
    );

    if ( !x_interception || !y_interception ){ return true; }

    game.end_game('Success! Level 2 coming soon...', 'Home?');

    if( typeof( Players.kikuchiyo ) != 'undefined' ){
      console.log( typeof( Players.kikuchiyo ) );
      Players.kikuchiyo.destroy();
    }
  }

  // to => stays here?
  that.execute_command = function( key_press ){

    that.command_time = new Date();
    if ( key_press == '118' ){ 
    //   $( '#draw-target' ).append(
    //     '<div id = "visual_mode" style = "top:' + Players.kikuchiyo.y + 
    //       'px; left: ' + Players.kikuchiyo.x + 'px;"><div>'
    //   )
    }
    if ( key_press == '16' ){ return true }
    if ( key_press == '97' && $('#escape_route').css('display') != 'none'){ 
      that.beat_level();
      return true 
    }

    if ( key_press == '59' ){ 
      that.ask( "State your query below: " );
      return true 
    }

    if ( key_press == '120' ){
      if ( typeof( that.spear ) != 'undefined' ){
        if ( that.spear.x <=  that.x + 145 ){
          that.spear.thrust();
        }
      }
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

    that.style.left = that.x + 'px'; 
    that.style.top  = that.y + 'px'; 
    if ( typeof( that.spear ) != 'undefined' ){
      that.spear.draw();
    }
     
  };

  that.make_cell_on_page=function(){

    var div_style = "style=\"width:" + that.width + "px; height:" + that.height + "px; position:absolute; z-index:901;\"";
    that.element = $("#draw-target").append( '<div id = "' + that.name + '" ' + div_style + '></div>' ).find( ':last' );

    that.style = that.element[ 0 ].style;
    
    that.element.css({ 
      width:that.width, 
      height:that.height, 
      height:that.height, 
      position:'absolute',
      backgroundImage: 'url(' + that.sheet + ')' 
    });

    that.draw();

  }; that.make_cell_on_page();

  that.change_image = function(){

    var index = that.current_image;

    index *= that.width;

    var image_width = that.image_width;
    var height = that.height;
    var math_floor = that.math_floor; 
    var hOffset = -index % image_width;
    var vOffset = -math_floor( index / image_width ) * height;

    that.style.backgroundPosition = hOffset + 'px ' + vOffset + 'px';

  };

  // to => location module?
  that.idle_user=function(){
    var now = new Date();
    return ( now.getTime() - that.command_time.getTime() ) / 1000 > 0.5; 
  }

  that.user_rapid_tapping=function(){
    var now = new Date();
    return ( now.getTime() - that.command_time.getTime() ) / 1000 > 0.5; 
  }

  that.animate=function(){
    if( typeof( that.idle_user ) != 'function' ) { return }
    if ( that.idle_user() ) { setTimeout( that.animate, 140 ); return }

    var sheet_to_animate = that.get_animation( that.last_key_press );

    if ( sheet_to_animate.teleport == null ) {

      var sheet_range = sheet_to_animate.action;

    } else { 

      var sheet_range = sheet_to_animate 
    }

    that.active_sheet = sheet_range;

    if ( that.active_sheet != that.last_sheet ) {
      that.current_image_index = -1;
    }

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

  that.hit_by_fireball = function(){
    power_ball.draw( 0, that.y );
  }

  that.offset_x = function( this_ruby ){
    var floor_left = $( '#draw-target' ).position().left;
    var floor_margin_left = $( '#draw-target' ).css( 'margin-left' );
    var floor_offset = parseInt( floor_left ) + parseInt( floor_margin_left );
    var kikuchiyo_offset = parseInt( $( '#kikuchiyo' ).width() ) - 
      parseInt( $( this_ruby ).width() ); 
    var x_offset = floor_offset - kikuchiyo_offset;
    return x_offset;
  },

  that.offset_y = function( this_ruby ){
    var floor_top = $( '#draw-target' ).position().top;
    var floor_margin_top = $( '#draw-target' ).css( 'margin-top' );
    var floor_offset = parseInt( floor_top ) + parseInt( floor_margin_top );
    var kikuchiyo_offset = parseInt( $( '#kikuchiyo' ).height() ) - 
      parseInt( $( this_ruby ).height() ) - 
      parseInt( $( '#header-container').height() )
    ; 
    var y_offset = floor_offset - kikuchiyo_offset;
    return y_offset;
  },

  that.got_ruby = function(){
    for ( r in page_rubies ){

      var this_ruby = page_rubies[ r ];

      if ( this_ruby == undefined ){ continue }
  
      var x_interception = ( Math.abs(this_ruby.x - that.x - that.offset_x(this_ruby) ) < 50 );
      var y_interception = ( Math.abs(this_ruby.y - that.y - that.offset_y(this_ruby)  ) < 50 );

      if ( x_interception && y_interception ) {
        that.rubies += this_ruby.rubies;
        that.points += this_ruby.points;
        that.diamonds += this_ruby.diamonds;
        $( "#experience_points" ).text( that.points );
        $( "#rubies" ).text( that.rubies );
        $( "#diamonds" ).text( that.diamonds );
        $( "#payoff_count" ).text( that.diamonds + '/20');
        this_ruby.destroy();
        play_sound( 'picked_up_gem' );
        page_rubies[ r ] = undefined;

        if ( that.diamonds == that.diamond_quota ){
          alert('Guard has been bribed.  Now flee out the Eastern gate! Press `a` to exit when near the gate.')
          $('#escape_route').show();
        }
      }
    }
  };

  // to => bad guy class inheriting from player class?
  that.capture_kikuchiyo = function(){
    if ( that.dead == true ){
      for (var o in that) if (isNaN(parseInt(o))) delete that[o] ;
      delete that;
      return false;
    }

    if (GAME_OVER){ return }; 

    var ek = that;

    if ( typeof( Players.kikuchiyo ) == 'undefined' ){ return }

    if ( ek[ 'x' ] < Players.kikuchiyo[ 'x' ] ){ ek.execute_command("108"); }
    if ( ek[ 'x' ] > Players.kikuchiyo[ 'x' ] ){ ek.execute_command("104"); }
    if ( ek[ 'y' ] < Players.kikuchiyo[ 'y' ] ){ ek.execute_command("106"); }
    if ( ek[ 'y' ] > Players.kikuchiyo[ 'y' ] ){ ek.execute_command("107"); }
    if ( Math.random() > 0.975 ){ ek.execute_command("120") }

    if ( typeof( Players.kikuchiyo ) == 'undefined' ){ return }
    var y_distance = Math.abs( ek[ 'y' ] - Players.kikuchiyo[ 'y' ] );
    var x_distance = Math.abs( ek[ 'x' ] - Players.kikuchiyo[ 'x' ] );

    if ( y_distance < 5 && x_distance < 5 ){ 
      game.end_game( 'Captured!', 'Respawn?' );

    } else { 

      if (x_distance + y_distance){
        if (!GAME_OVER){
          Players.kikuchiyo.bravery_points += 1 / ( x_distance + y_distance ); 
          points = Math.round( Players.kikuchiyo.bravery_points * 100 ) / 100;
          $("#bravery_points").text( points );
        }
      }
    }
    setTimeout(that.capture_kikuchiyo, 140);
  };

  return that;
};
