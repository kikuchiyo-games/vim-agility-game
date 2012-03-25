App.KikuchiyoView = Backbone.View.extend({

  initialize: function( options ){
    this.game = this.options.game;
    this.nature = "good";
    this.name = "kikuchiyo";
    this.el = 'div#kikuchiyo'

    this.user_controls = true;

    this.model = new App.Sprite( this.nature);

    _.bindAll(this, 'keydown');
    //$( document ).bind('keypress', this.keydown);
    $( document ).bind('keydown', this.keydown);

    this.last_sheet = null;
    this.current_image_index = 0;
    this.x = 100;
    this.y = 100;
    this.direction = "right";
    this.last_key_press =  "108"

    this.sheet = this.model.standard_sheet( this.nature );
    this.teleport_sheet = this.model.teleport_sheet( this.nature );

    this.render();
    this.execute_command( "108" );
    var that = this;
    setInterval(function(){that.animate_sprite()}, 100);
  },

  /* Interaction with Treasure Object */
    reach_for_ruby: function(){ 
      if ( this.game.rubies( this ) ){ this.make_sound('picked_up_gem') };
    },

  /* controller */
    is_teleport_key: function( key_code ){
      for (var key in this.model.teleport_keys){ 
        if (key_code == this.model.teleport_keys[key] ){ 
          return( true );
        } 
      }
    },

    keydown: function( event ){
      if ( event.keyCode == 16 ){ return; }
      var key_code = this.get_keycode( event.keyCode, event.shiftKey);
      this.execute_command( key_code );
    },

    get_keycode: function( key, shift ){
      if ( !shift && key > 64 && key < 91 ){
        return ( parseInt( key, 10 ) + 32 ) + '';
      } else { return key; }
    },

    execute_command: function( key_press ){
      if ( key_press == '16' ) { return true }
      if ( key_press == '105' ){ this.reach_for_ruby(); }
      var new_animation = this.get_animation( key_press );
      if ( new_animation == null ){ return }
      this.last_sheet = this.active_sheet;
      this.last_key_press = key_press;
      this.refrain_to_screen( key_press );
      this.re_render();
    },

  /* rendering */
    get_animation: function( key_press ){
      try {
        if ( this.model.is_teleport_key_press( key_press ) ){
          return this.model.clips.kikuchiyo.teleport;
        } else { return animation.kikuchiyo[ key_press ] }
      } catch ( e ) { return null }
    },

    refrain_to_screen: function( key_press ){
      var new_movement = this.model.movement( ).kikuchiyo[ key_press ];
      if (new_movement.z == 'teleport') {
        this.teleport( new_movement );
        if ( this.is_teleport_key( key_press ) ){ this.make_sound("teleport"); }
      } else { this.standard_movement( new_movement ); }
    },

    teleport: function( new_movement ){
      this.element.css({ backgroundImage: 'url(' + this.teleport_sheet + ')' });
      this.re_render();
      if ( new_movement.x != -1 ) { this.x = new_movement.x; }
      if ( new_movement.y != -1 ) { this.y = new_movement.y; }
    },

    standard_movement: function( new_movement ){
      this.element.css({ backgroundImage: 'url(' + this.sheet + ')' });
      if (0 <= ( this.x + new_movement.x ) && ( this.x + new_movement.x ) <=  window.innerWidth  ) { this.x += new_movement.x }
      if (0 <= ( this.y + new_movement.y ) && ( this.y + new_movement.y ) <=  window.innerHeight ) { this.y += new_movement.y }
    },

    re_render: function(){
      this.style.left = this.x + 'px';
      this.style.top  = this.y + 'px';
    },

    render: function(){
      var div_style = "style=\"overflow:hidden; width:" + this.width + "px; height:" + this.height + "px; position:absolute;\"";
      this.element = $("#draw-target").append( '<div id = \'kikuchiyo\' ' + div_style + '></div>' ).find( ':last' );
      this.style = this.element[ 0 ].style;
      this.element.css({
        width:this.model.width,
        height:this.model.height,
        padding:0, margin:0,
        position:'ablsolute',
        overflow:'hidden'
      });
      this.re_render();
    },

  /* sprite image to render */
    change_image: function( ){
      var index = this.current_image;
      index *= this.model.width;
      var height = this.model.height;
      var image_width = this.model.image_width;
      var hOffset = -index % image_width;
      var vOffset = -Math.floor( index / image_width ) * height;
      this.style.backgroundPosition = hOffset + 'px ' + vOffset + 'px';
    },

    animate_sprite: function(){
      var sheet_to_animate = this.get_animation( this.last_key_press );
      this.active_sheet = sheet_to_animate.action;
      this.handle_possible_teleportation( sheet_to_animate );
      this.update_current_image_index();
      this.update_current_image();
      this.change_image();
    },

    handle_possible_teleportation: function( sheet_to_animate ){
      if ( !sheet_to_animate.teleport == null ) { this.make_sound("teleport"); } 
    },

    update_current_image_index: function(){
      if ( this.active_sheet != this.last_sheet ) { this.current_image_index = -1; }
      ( this.current_image_index )++
    },

    update_current_image: function(){
      if ( this.current_image_index < this.active_sheet.length ) {
        this.current_image = this.active_sheet[ this.current_image_index ];
      } else { this.current_image_index = 0; this.current_image = this.active_sheet[ 0 ]; }
    },

  /* command sound view to make a sound */
    make_sound: function(soundobj) {
      var thissound=document.getElementById( soundobj );
      thissound.play();
    }
});
