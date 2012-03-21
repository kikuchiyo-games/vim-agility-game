
function make_rubies(){

  var ruby_image = "ruby.png"

  for (var r=0; r < RUBIES; r++) {

    page_rubies[r] = Rubies(r, ruby_image);

    page_rubies[r].draw(
      Math.floor(Math.random() * (window.innerWidth - 100 )),
      Math.floor(Math.random() * (window.innerHeight - 100 ))
    );

    $( "#ruby" + r ).append( "<p>" + r + "</p>" );

  }

}

player_won=function(){
  for (var r in page_rubies){ if (page_rubies[r] != undefined){ return false } }
  return true;
};

//
//long test, but passes all but last one.
//probably overlooking something small...
//

function get_all_rubies(){

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

}

test("simulate adding ruby to game each time player wins, until 100 rubies", function() {
  MAX_RUBIES = 200

  for (var r = 1; r <= MAX_RUBIES; r++){
    RUBIES = r;
    page_rubies=[RUBIES];

    make_rubies();
    get_all_rubies();

    ok ( player_won() );
  }
});
