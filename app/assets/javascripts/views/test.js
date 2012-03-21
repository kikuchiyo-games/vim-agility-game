App.KikuchiyoView = Backbone.View.extend({
  initialize: function( spec ){
    var self = this;
    this.current_image_index = 0;
    this.last_sheet = null;
    this.div_id = spec.div_id;
    this.nature = spec.nature;
    this.name = spec.name;

    this.bravery_points = 0;
    this.diamonds = 0;
    this.rubies = 0;
    this.points = 0;

    this.user_controls = spec.user_controls || false;
    this.command_time = new Date();
    this.math_floor = Math.floor;

    this.image_width = 595;
    this.height = 72.25; 
    this.width = 59.24;
    this.x = spec.x || 100;
    this.y = spec.y || 100;

    this.last_key_press = spec.last_key_press || "108"
    this.direction = spec.direction || "right";
    this.distance = spec.distance || 100;
    this.speed= spec.speed|| 20;

    this.sheets = {
      good:"../images/digital_kikuchiyo.png",
      evil:"../images/mega_man_evil.png"
    };

    this.set_sheet();
    this.make_cell_on_page();
  },

  set_sheet: function(){
    try {
      this.sheet = this.sheets[ this.nature ];
      this.teleportation_sheet = "../images/teleportation.png";
    } catch (e) {
      alert( this.nature + "has no associated sheet. Cannot animate." );
    }
  },

  get_sheet: function(){
    return this.sheet;
  },

  ask: function( question ){
    return prompt( question, "" );
  },

  state: function( statement ){
    alert( statement );
  },

  get_nature: function(){
    return this.nature;
  },

  get_location: function(){
    return { x:this.x, y:this.y };
  }, 

  set_location: function( spec ){
    this.x = spec.x;
    this.y = spec.y;
  }, 

  get_movement: function( key_press ){
    try {
      return movement( this.speed, this.distance ).kikuchiyo[ key_press ];
    } catch ( e ) { return null } //user simply hit a key we do not map to an action
  },

  is_teleport_key_press: function( key_press ){
    return ( ["72", "48", "76", "77", "52"].indexOf( key_press ) != -1)
  },

  get_animation: function( key_press ){
    try {
      if ( this.is_teleport_key_press( key_press ) ){
        return sheet_clips.kikuchiyo.teleport;
      } else { return animation.kikuchiyo[ key_press ] }
    } catch ( e ) { return null } //user simply hit a key we do not map to an action
  },

  point_is_on_screen: function( key_press ){
    var x = this.x;
    var y = this.y;
    var new_movement = this.get_movement(key_press); 
    if (new_movement.z == 'teleport') {
      this.element.css({ backgroundImage: 'url(' + this.teleportation_sheet + ')' });
      this.draw();
      if ( new_movement.x != -1 ) { this.x = new_movement.x }
      if ( new_movement.y != -1 ) { this.y = new_movement.y }
    } else {
      if (0 <= ( x + new_movement.x ) && ( x + new_movement.x ) <=  window.innerWidth  ) { this.x += new_movement.x }
      if (0 <= ( y + new_movement.y ) && ( y + new_movement.y ) <=  window.innerHeight ) { this.y += new_movement.y }
    }
  },

  execute_command: function( key_press ){
    this.command_time = new Date();
    if ( key_press == '16' ){ return true }
    if ( key_press == '59' ){ this.ask( "State your query below: " ); return true }
    if ( key_press == '105' ){ this.got_ruby(); }
    var new_animation = this.get_animation( key_press );
    if ( new_animation == null ){ return }
    this.last_sheet = this.active_sheet;
    this.last_key_press = key_press;
    this.point_is_on_screen( key_press );
    this.draw();
  },

  draw: function(){
    this.style.left = this.x + 'px'; 
    this.style.top  = this.y + 'px'; 
  },

  make_cell_on_page: function(){
    var self = this;
    var div_style = "style=\"overflow:hidden; width:" + self.width + "px; height:" + self.height + "px; position:absolute;\"";
    self.element = $("#draw-target").append( '<div id = \'kikuchiyo\' ' + div_style + '></div>' ).find( ':last' );
    self.style = this.element[ 0 ].style;
    self.element.css({ 
      width:self.width, 
      height:self.height, 
      height:self.height, 
      padding:0,
      margin:0,
      backgroundImage: 'url(' + self.sheet + ')',
      overflow:'hidden'
    });
    self.draw();
  },

  change_image: function(){
    var self = this;
    var index = self.current_image;
    index *= self.width;
    var height = self.height;
    var math_floor = self.math_floor; 
    var image_width = self.image_width;
    var hOffset = -index % image_width;
    var vOffset = -math_floor( index / image_width ) * height;
    self.style.backgroundPosition = hOffset + 'px ' + vOffset + 'px';
  },

  idle_user: function(){
    var self = this;
    var now = new Date();
    return ( now.getTime() - self.command_time.getTime() ) / 1000 > 0.5; 
  },

  user_rapid_tapping: function(){
    var self = this;
    var now = new Date();
    return ( now.getTime() - self.command_time.getTime() ) / 1000 > 0.5; 
  },

  animate: function(){
    var self = this; 
    if ( self.idle_user() ) { setTimeout( self.animate, 140 ); return }
    var sheet_to_animate = self.get_animation( self.last_key_press );


    if ( sheet_to_animate.teleport == null ) {
      self.element.css({ backgroundImage: 'url(' + self.sheet + ')' });
      self.draw();
      var sheet_range = sheet_to_animate.action;
    }

    self.active_sheet = sheet_range;

    if ( self.active_sheet != self.last_sheet ) { self.current_image_index = -1; }

    ( self.current_image_index )++

    if ( self.current_image_index < sheet_range.length ) {

      self.current_image = sheet_range[ self.current_image_index ];

    } else { 

      self.current_image_index = 0;
      self.current_image = sheet_range[ 0 ];

    }
   
    self.change_image();
    self.set_location( { x:self.x, y:self.y } );
    setTimeout( self.animate, 140 );
  }, 

  got_ruby: function(){
    var self = this;
    for ( r in page_rubies ){
      var this_ruby = page_rubies[ r ];
      if ( this_ruby == undefined ){ continue }
      var x_diff = Math.abs(this_ruby.x - self.x );
      var y_diff = Math.abs(this_ruby.y - self.y );
      var x_interception = ( 30 <= x_diff && x_diff <= 60 );
      var y_interception = ( 10 <= y_diff && y_diff <= 60 );

      if ( x_interception && y_interception ) {
        self.rubies += this_ruby.rubies;
        self.points += this_ruby.points;
        self.diamonds += this_ruby.diamonds;
        $("li.score-points").html("Experience Points:" + self.points);
        $("li.score-rubies").html("Rubies:" + self.rubies);
        $("li.score-diamonds").html("Diamonds:" + self.diamonds);
        this_ruby.destroy();
        play_sound( 'picked_up_gem' );
        page_rubies[ r ] = undefined;
      }
    }
  }

});
