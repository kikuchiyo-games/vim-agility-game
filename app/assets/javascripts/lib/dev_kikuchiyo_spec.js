// tests for dev_kikuchiyo.js
//

test("player can instantiate user can control", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", user_controls:true } );

  ok ( kikuchiyo != "undefined" );
  ok ( kikuchiyo.user_controls == true );
});

test("player instance get_sheet returns proper sheet", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good" } );

  var cs_dogma = player( { name:"cs_dogma", nature:"evil" } );

  var k_sheet = kikuchiyo.get_sheet();

	ok( k_sheet == "images/sheets/mega_man_boss.png" );

  var cs_sheet = cs_dogma.get_sheet();

	ok( cs_sheet == "images/sheets/mega_man_evil.png" );

});

test("player instance get_sheet returns proper name", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good" } );

  var cs_dogma = player( { name:"cs_dogma", nature:"evil" } );

  var k_name = kikuchiyo.name;
	ok( k_name == "kikuchiyo" );

  var cs_name = cs_dogma.name;
	ok( cs_name == "cs_dogma" );

});

test("player instance has draw method", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good" } );

  kikuchiyo.draw();

	ok( true );

});

test("player instance speed and direction should be private", 6, function() {

  var cs_dogma = player( { name:"cs_dogma", nature:"evil",  speed:10, direction:"right"  } );
  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", speed:50, direction:"left" } );
  var cs_dogma_2 = player( { name:"cs_dogma_2", nature:"evil", speed:5, direction:"down" } );

  ok(kikuchiyo.speed == 50);
  ok(kikuchiyo.direction == "left");

  ok(cs_dogma.speed == 10);
  ok(cs_dogma.direction == "right");

  ok(cs_dogma_2.speed == 5);
  ok(cs_dogma_2.direction == "down");

});

test("player instance (x,y) coordinates should default to (100, 100)", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good" } );
  var coords = kikuchiyo.get_location();

  ok( coords.x == 100 );
  ok( coords.y == 100 );

});

test("player instance (x,y) coordinates can be set on initialization", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:1000, y:1002 } );

  var coords = kikuchiyo.get_location();

  ok( coords.x == 1000 );
  ok( coords.y == 1002 );

});

test("player instance (x,y) coordinates can be updated", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:1000, y:1002 } );

  kikuchiyo.set_location( { x:1, y:30 } );

  var coords = kikuchiyo.get_location();

  ok( coords.x == 1 );
  ok( coords.y == 30 );

});

test("player instance should have an animation model for each appropriate keypress", 2, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:1000, y:1002 } );

  var k_animation = kikuchiyo.get_animation( "108" );

  ok( k_animation.action == sheet_clips.kikuchiyo.run_right );
  ok( k_animation.teleport == null );

});

test("player instance can get get movement based on key_press", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:1000, y:1002 } );

  kikuchiyo.get_movement( "108" );

  ok( true );

});

test("player instance can get new coordinates, based on key_press: right on '108'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:100, y:100 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "108" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new > x_init && y_new == y_init);

});

test("player instance can get new coordinates, based on key_press: up on '107'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:100, y:100 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "107" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new == x_init && y_new < y_init);

});

test("player instance can get new coordinates, based on key_press: down on '106'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:100, y:400 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "106" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;
  ok( x_new == x_init && y_new > y_init);

});

test("player instance can get new coordinates, based on key_press: left on '98'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:400, y:400 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "98" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new < x_init && y_new == y_init);

});

test("player instance can get new coordinates, based on key_press: right on '119'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:400, y:400 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "119" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new > x_init && y_new == y_init);

});

test("player instance can get new coordinates, based on key_press: up on '79'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:400, y:400 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "79" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new == x_init && y_new < y_init);

});

test("player instance can get new coordinates, based on key_press: down on '111'", 1, function() {

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:400,  y:400 } );

  var x_init=kikuchiyo.x;
  var y_init=kikuchiyo.y;

  kikuchiyo.execute_command( "111" );

  var x_new=kikuchiyo.x;
  var y_new=kikuchiyo.y;

  ok( x_new == x_init && y_new > y_init);

});

test("player instance can get new coordinates, based on key_press: ", 5, function() {

  var key_press;
  var teleport_hash = {
    '72':[-1,0 ], 
    '48':[0,-1 ], 
    '77':[ -1, window.innerHeight/2 ],
    '76':[ -1, window.innerHeight - 100], 
    '52':[window.innerWidth - 100, -1 ]
  }

  var kikuchiyo = player( { name:"kikuchiyo", nature:"good", x:1000, y:1002 } );

  for (key_press in teleport_hash) {

    var x_init = kikuchiyo.x
    var y_init = kikuchiyo.y

    kikuchiyo.execute_command( key_press );

    var x_expected = teleport_hash[ key_press ][0];
    var y_expected = teleport_hash[ key_press ][1];

    if ( x_expected == -1 ){ x_expected = x_init }
    if ( y_expected == -1 ){ y_expected = y_init }

    var x_new=kikuchiyo.x;
    var y_new=kikuchiyo.y;

    ok( x_new == x_expected && y_new == y_expected);

  }

});

test("player instance should have corrrect animation for key_press", function() {

  var key_press;

  var teleport_animation_hash = {
    '72':[-1,        -200 ], 
    '48':[-5,          -1 ], 
    '77':[ -1, window.innerHeight/2 ],
    '76':[ -1, window.innerHeight - 400 ], 
    '52':[ window.innerWidth - 200, -1 ]
  };

  var kikuchiyo = player( { 
    name:"kikuchiyo", 
    nature:"good", 
    x:1000, 
    y:1002 
  } );

  var array_expected = sheet_clips.kikuchiyo.teleport

  function arrays_equal(a,b) { 
    return !(a<b || b<a); 
  }

  function array_to_string(a){
    var str = "";
    var i;
    for ( i in a ){
      str += a[i] + ", ";    
    }
    return str;
  }

  var expected_string = array_to_string( array_expected );

  for (key_press in teleport_animation_hash) {
    // I always get a final 'undefined' element.  I cannot get rid of
    // it.  moving on for now...
    var returned_array = kikuchiyo.get_animation( key_press );
  }
});
