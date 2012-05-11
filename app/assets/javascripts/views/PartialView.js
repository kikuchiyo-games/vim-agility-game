App.PartialView = Backbone.View.extend({

  initialize: function(){
    //this.render('login');
    //this.construct_sound_station();
    //$('#login').click(function(){ partial_view.render( 'login' ); });
    //$('#register').click(function(){ partial_view.render( 'register' ); });
    var that = this;
    //$('#home').click(function(){
      //that.render( 'home' );
      //$('#home-to-practice').click(function(){
        that.render( 'practice' );
        that.game  = new App.GameView();
      //});
    //});
  },

  //audio_div: function( id, file, container ){
  //  if( $('#' + id).html() != null ){return(false);}
  //  var audio_div_string = "<audio id=\"" + id + "\"  src=\"" + file + "\"> </audio>";
  //  $( container ).append( audio_div_string );
  //},

  //construct_sound_station: function(){
  //  this.audio_div("theme", "/audios/kikuchiyo_title_page_the_one.wav", "#audio-container");
  //  this.audio_div("teleport",      "/audios/teleport.wav", "#audio-container");
  //  this.audio_div("picked_up_gem", "/audios/gem_up.wav",   "#audio-container");
  //},

  render: function( template ){ 
    $( this.el ).html( _.template( $( '#' + template + '_template' ).html() ));
  }

});
