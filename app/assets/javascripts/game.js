var game = function( spec ){

  that = {};

  that.get_keycode = function( key, shift ){
    if ( !shift && key > 64 && key < 91 ){
      return ( parseInt( key, 10 ) + 32 ) + '';
    } else { return key; }
  };

  that.add_time_to_clock = function(){
    //
  };

  that.welcome_user = function(){
    //
  };

  that.make_rubies = function(){
    for ( var r=0; r < RUBIES; r++ ){

      if ( r % 2 == 0 ){

        var ruby_image = "/assets/images/rubies/ruby.png"

      } else { var ruby_image = "/assets/images/rubies/diamond.png" }

      var width = parseInt( $('#draw-target').width() );
      var height = parseInt( $('#draw-target').height() ) + parseInt( $('#draw-target').css( 'margin-top' ) );
      var offset_y = parseInt( $('#header-container').height() );
      var min = offset_y + parseInt( $('#draw-target').position().top ) + parseInt( $('#draw-target').css( 'margin-top' ) ); 

      page_rubies[ r ] = Rubies( r, ruby_image );
      page_rubies[ r ].draw(
        Math.floor( Math.max( $('#draw-target').position().left, Math.random(1) * width  ) ),
        Math.floor( Math.max( min, Math.random(1) * ( height + offset_y - parseInt($( '#draw-target' ).css('margin-bottom') ) - parseInt($( '#draw-target' ).css('padding-bottom') ) ) ) )
      );
      $( "#ruby" + r ).append( "<p class = 'ruby'>" + /* r + */ "</p>" );
    }
  };

  that.advance_to_next_level = function(){
    RUBIES++;
    that.make_rubies(); 
    that.welcome_user();
    that.add_time_to_clock();
  };

  that.player_won = function(){
    for ( var r in page_rubies ){
      if ( page_rubies[ r ] != undefined ){
        return false;
      }
    }
    return true;
  };

  that.end_game = function( state, link ){
    GAME_OVER = true; 

    $.ajax({ 
      type:'put',
      url: '/profiles/update.json',
      dataType: 'json',
      beforeSend: function(jqXHR, settings) {
        jqXHR.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      },
      data:{
        experience_points: $('#experience_points').text(),
        bravery_points: $('#bravery_points').text(),
        kills: $('#kills').text(),
        diamonds: $('#diamonds').text(),
        rubies: $('#rubies').text()
      }
    });

    var game_ending_text = "<p id = 'the_end' style = \"position:absolute; z-index:1000 !important; left:25%; top:25%; color:yellow; font-size:48px;\">";
    game_ending_text    += state;
    game_ending_text    += " &nbsp; <a href = \"/users/" + USER_ID + "\">" + link + "</a></p>";

    $('#countdown_dashboard').stopCountDown();
    $('body #draw-target').append(
        game_ending_text
    );
    if( typeof( kikuchiyo ) != 'undefined' ){
      kikuchiyo.destroy();
    }
  }
 
  return that;
};
