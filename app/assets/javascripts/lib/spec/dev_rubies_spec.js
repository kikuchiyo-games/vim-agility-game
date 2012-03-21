
test("game should be able to place rubies on the page", function() {

  RUBIES = 200
  page_rubies=[RUBIES];

  var ruby_image = "ruby.png"

  for (var r=0; r < RUBIES; r++) {
    page_rubies[r] = Rubies(r, ruby_image);

    ok ( page_rubies[r] != undefined );

    page_rubies[r].draw(
      Math.floor(Math.random() * (window.innerWidth - 100 )),
      Math.floor(Math.random() * (window.innerHeight - 100 ))
    );
    $( "#ruby" + r ).append( "<p>" + r + "</p>" );
    ok( true );

  }
});

test("game should be able to place rubies on the page", function() {

  for (var r = 0; r < RUBIES; r++) {

    ruby_x = page_rubies[r].x;
    ruby_y = page_rubies[r].y;

    ok ( ruby_y != undefined );
    ok ( ruby_y != undefined );
    
    kikuchiyo.set_location({x:ruby_x, y:ruby_y}); 
    kikuchiyo.draw();
    ok (kikuchiyo.x == ruby_x && kikuchiyo.y == ruby_y );
    kikuchiyo.execute_command("105");

  }
});

test("game should be able to place rubies on the page", function() {

  RUBIES = 200
  page_rubies=[RUBIES];

  var ruby_image = "rubies/ruby.png"

  for (var r=0; r < RUBIES; r++) {
    page_rubies[r] = Rubies(r, ruby_image);

    ok ( page_rubies[r] != undefined );

    page_rubies[r].draw(
      Math.floor(Math.random() * (window.innerWidth - 100 )),
      Math.floor(Math.random() * (window.innerHeight - 100 ))
    );
    $( "#ruby" + r ).append( "<p>" + r + "</p>" );
    ok( true );

  }
});

test("game can detect when the game is won", function() {

  player_won=function(){

    for (var r in page_rubies){ if (page_rubies[r] != undefined){ return false } }

    return true;
  };

  for (var r = 0; r < RUBIES; r++) {
    ruby_x = page_rubies[r].x;
    ruby_y = page_rubies[r].y;
    kikuchiyo.set_location({x:ruby_x, y:ruby_y}); 
    kikuchiyo.draw();
    kikuchiyo.execute_command("105");
  }

  ok ( player_won() );
});

test("game should be able to place rubies on the page", function() {

  RUBIES = 200
  page_rubies=[RUBIES];

  var ruby_image = "rubies/ruby.png"

  for (var r=0; r < RUBIES; r++) {
    page_rubies[r] = Rubies(r, ruby_image);

    ok ( page_rubies[r] != undefined );

    page_rubies[r].draw(
      Math.floor(Math.random() * (window.innerWidth - 100 )),
      Math.floor(Math.random() * (window.innerHeight - 100 ))
    );
    $( "#ruby" + r ).append( "<p>" + r + "</p>" );
    ok( true );

  }
});

test("game can detect when the game is NOT won", function() {

  player_won=function(){

    for (var r in page_rubies){ if (page_rubies[r] != undefined){ return false } }

    return true;
  };

  for (var r = 0; r < RUBIES; r++) {
    ruby_x = page_rubies[r].x;
    ruby_y = page_rubies[r].y;
    kikuchiyo.set_location({x:ruby_x, y:ruby_y}); 
    kikuchiyo.draw();
    if ( r!= 3 ){ kikuchiyo.execute_command("105"); }
  }

  ok ( player_won() == false );
});
