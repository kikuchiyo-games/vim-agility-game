$( document ).ready( function(){

  var which_program = window.location;

  GUARDS    = 0;
  USER_NEEDS_A_CHALLENGE = false;
  USER_BEING_CHALLENED = false;
  game      = game();
  game.make_rubies();
  kikuchiyo = player( { name:"kikuchiyo", nature:"good", user_controls:true  } );
  kikuchiyo.animate();
  kikuchiyo.execute_command( "108" );
  capture_kikuchiyo = function(evil_player){

    if (GAME_OVER){ return }; 

    var ek = evil_player;

    if ( ek[ 'x' ] < kikuchiyo[ 'x' ] ){ ek.execute_command("108"); }
    if ( ek[ 'x' ] > kikuchiyo[ 'x' ] ){ ek.execute_command("104"); }
    if ( ek[ 'y' ] < kikuchiyo[ 'y' ] ){ ek.execute_command("106"); }
    if ( ek[ 'y' ] > kikuchiyo[ 'y' ] ){ ek.execute_command("107"); }

    var y_distance = Math.abs( ek[ 'y' ] - kikuchiyo[ 'y' ] );
    var x_distance = Math.abs( ek[ 'x' ] - kikuchiyo[ 'x' ] );

    if ( y_distance < 5 && x_distance < 5 ){ 

      GAME_OVER = true; 

      var game_ending_text = "<a href = \"game_introduction.html\"><h1 style = \"position:absolute; left:25%; top:50%; color:red;\">";
      if ( TRAINING ){
        game_ending_text    += "  GOOD TEST! FEEL FREE TO HELP ME HOME WHEN YOU ARE COMFORTABLE.";
      } else {
        game_ending_text    += "  GAME OVER!";
      }
      game_ending_text    += "</h1>";

      $('#countdown_dashboard').stopCountDown();
      $('body #draw-target').html(
          game_ending_text
      );
      kikuchiyo.destroy();

    } else { 

      if (x_distance + y_distance){
        if (!GAME_OVER){
          kikuchiyo.bravery_points += 1 / ( x_distance + y_distance ); 
          $("li.score-bravery-points").html( "Bravery Points : " + Math.round(kikuchiyo.bravery_points * 100)/100 );
        }
      }
    }
    
    setTimeout(evil_player.capture_kikuchiyo, 60);

  };   

  if (!TRAINING) {

    cs_dogma = player( { name:"cs_dogma",  nature:"evil", user_controls:false } );
    cs_dogma_sprinter = player( { name:"cs_dogma_sprinter",  nature:"evil", user_controls:false } );
    cs_dogma.speed = 5;
    cs_dogma_sprinter.speed = 7;


    cs_dogma.capture_kikuchiyo = function(){capture_kikuchiyo(cs_dogma)};
    cs_dogma_sprinter.capture_kikuchiyo = function(){capture_kikuchiyo(cs_dogma_sprinter)};
    cs_dogma.animate();
    cs_dogma_sprinter.animate();
    cs_dogma.execute_command( "76" );
    cs_dogma_sprinter.execute_command( "52" );
    cs_dogma.capture_kikuchiyo();
    cs_dogma_sprinter.capture_kikuchiyo();
    cs_guards = []; 
  }

  teleport_keys = [ "72", "48", "76", "77", "52" ];

  $( document ).keydown( function( event ){

    if (GAME_OVER){ return }; 

    if ( game.player_won() ){ game.advance_to_next_level(); }

    if ( TRAINING && !USER_NEEDS_A_CHALLENGE ){
      seconds = "";
      $(".seconds_dash").children("div").each(function(){
        seconds += $(this).text().substring(0,1);
        if (seconds == "00"){
          var timer_message = "The timer was just a test.  Good test! :)";
          timer_message += "Watch out for the CS Dogmas. They only do what their masters tell them, ";
          timer_message += "and their masters are afraid to teach them how to jump and teleport, so ";
          timer_message += "have an advantage over them!";

          $("#ruby_count").html(timer_message);

          USER_NEEDS_A_CHALLENGE = true;

        }
      });
    }

    var key_code = game.get_keycode(
      event.keyCode,
      event.shiftKey
    );

    kikuchiyo.execute_command( key_code );

    for (var key in teleport_keys){
      if (key_code == teleport_keys[key] ){ play_sound("teleport_sound"); }
    }

    if ( /* TRAINING && USER_NEEDS_A_CHALLENGE && */ !USER_BEING_CHALLENED ){
      
      cs_dogma = player( { name:"cs_dogma",  nature:"evil", user_controls:false } );
      cs_dogma_sprinter = player( { name:"cs_dogma_sprinter",  nature:"evil", user_controls:false } );
      cs_dogma.speed = 1;
      cs_dogma_sprinter.speed = 1;

      cs_dogma.capture_kikuchiyo = function(){capture_kikuchiyo(cs_dogma)};
      cs_dogma_sprinter.capture_kikuchiyo = function(){capture_kikuchiyo(cs_dogma_sprinter)};
      cs_dogma.animate();
      cs_dogma_sprinter.animate();
      cs_dogma.execute_command( "76" );
      cs_dogma_sprinter.execute_command( "52" );
      cs_dogma.capture_kikuchiyo();
      cs_dogma_sprinter.capture_kikuchiyo();
      cs_guards = [];
      USER_BEING_CHALLENED = true;
      TRAINING = true;

    }

    if ( TRAINING ){ return }

    if ( GUARDS >= Math.floor( kikuchiyo.bravery_points -  ( 2 * GUARDS ) ) ){return}

    var guard = player( {
      name:"cs_dogma_guard" + GUARDS,  
        nature:"evil", 
        user_controls:false 
    } );

    guard.capture_kikuchiyo = function(){ capture_kikuchiyo( guard ) };
    guard.speed = ( (GUARDS + 1) / 2);
    guard.animate();
    guard.execute_command( "52" );
    guard.capture_kikuchiyo();

    GUARDS++;

  });
});
