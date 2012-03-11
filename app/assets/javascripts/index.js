
  function audio_div( id, file, container ){
    var audio_div_string = "<audio id=\"" + id + "\"  src=\"" + file + "\"> </audio>";
    $( container ).append( audio_div_string );
  }

  function play_sound(soundobj) {
    var thissound=document.getElementById( soundobj );
    thissound.play();
  }

  $(document).ready(function(){

    audio_div("theme", "/audios/kikuchiyo_title_page_the_one.wav", "#audio-container");
    audio_div("picked_up_gem", "/audios/gem_up.wav", "#audio-container");

    setInterval(function(){
      play_sound("theme");
    }, 10);

    partial_view = new App.PartialView( { el:'div#partial-body' } );
    partial_view.render( 'login' );

    $('#login').click(function(){
       partial_view.render( 'login' );
    });

    $('#register').click(function(){
       partial_view.render( 'register' );
    });

    $('#home').click(function(){
       partial_view.render( 'home' );
       $('#home-to-practice').click(function(){
        partial_view.render( 'practice' );
        vim_game = new App.GameView;
       });
    });

  });
