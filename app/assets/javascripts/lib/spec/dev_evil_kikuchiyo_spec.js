test("player can instantiate user can control", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );
  ok ( evil_kikuchiyo.user_controls == false );
});

test("ai player can be animated", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );
  evil_kikuchiyo.animate()
  ok ( true );

});

test("ai player can be moved via run right", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );
  evil_kikuchiyo.animate()
  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "108" );
  }
  ok ( true )
});

test("ai player can be moved via run up", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "104" );
  }

  ok ( true )

});

test("ai player can be moved via run up", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "107" );
  }

  ok ( true )
});

test("ai player can be moved via run down", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "106" );
  }

  ok ( true )
});

test("ai player can be moved via jump right", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "119" );
  }

  ok ( true )
});

test("ai player can be moved via jump left", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "98" );
  }

  ok ( true )
});

test("ai player can be moved via jump up", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "79" );
  }

  ok ( true )
});

test("ai player can be moved via jump down", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  for(var i = 0; i < 10; i++){
    evil_kikuchiyo.execute_command( "111" );
  }

  ok ( true )
});

test("ai player can be moved via teleport right", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  evil_kikuchiyo.execute_command( "111" );
  evil_kikuchiyo.execute_command( "52" );

  ok ( true )
});

test("ai player can be moved via teleport left", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  evil_kikuchiyo.execute_command( "111" );
  evil_kikuchiyo.execute_command( "48" );

  ok ( true )
});

test("ai player can be moved via teleport up", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  evil_kikuchiyo.execute_command( "119" );
  evil_kikuchiyo.execute_command( "72" );

  ok ( true )
});

test("ai player can be moved via teleport down", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  evil_kikuchiyo.execute_command( "119" );
  evil_kikuchiyo.execute_command( "76" );

  ok ( true )
});

test("ai player can be moved via teleport middle", 2, function() {

  var evil_kikuchiyo = player( { name:"evil_kikuchiyo", nature:"evil", user_controls:false } );

  ok ( evil_kikuchiyo != "undefined" );

  evil_kikuchiyo.animate()

  evil_kikuchiyo.execute_command( "119" );
  evil_kikuchiyo.execute_command( "77" );

  ok ( true )
});
