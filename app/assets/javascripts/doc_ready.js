$( document ).ready( function(){
  cs_dogmas = [];
  var which_program = window.location;

  game = game();
  game.make_rubies();

  kikuchiyo = player( { name:"kikuchiyo", nature:"good", user_controls:true  } );
  kikuchiyo.animate();
  kikuchiyo.execute_command( "108" );


  teleport_keys = [ "72", "48", "76", "77", "52" ];

  $( document ).keydown( function( event ){
    if (GAME_OVER){ return }; 
    if ( game.player_won() ){ game.advance_to_next_level(); }

    var key_code = game.get_keycode( event.keyCode, event.shiftKey);
    kikuchiyo.execute_command( key_code );

    for (var key in teleport_keys){
      if (key_code == teleport_keys[key] ){ play_sound("teleport_sound"); }
    }


    if ( cs_dogmas.length == 0 ){ regenerate_cs_dogmas(); }
  });

  regenerate_cs_dogmas = function(){
    ALL_ENEMIES_DEFEATED += 1

    for( var i = 0; i < ALL_ENEMIES_DEFEATED; i++ ){
      if ( i % 2 == 0 ){
        var prefix = 'cs_dogma';
        var x = 1000 - ( 20 * i );
        var y = 150;
      } else { 
        var prefix = 'cs_dogma_sprinter'; 
        var x = 100 + ( 20 * i );
        var y = 10;
      }

      cs_dogmas.push( 
        player({ 
          name: prefix + i + '-' + ALL_ENEMIES_DEFEATED,  
          nature:"evil", 
          user_controls:false,
          speed: 1 + ALL_ENEMIES_DEFEATED,
          x: x,
          y: y
        })
      );
      cs_dogmas[ cs_dogmas.length - 1 ].animate();
      cs_dogmas[ cs_dogmas.length - 1 ].execute_command( "76" )
      cs_dogmas[ cs_dogmas.length - 1 ].capture_kikuchiyo();
    }
  }

});
