//--[00]--//
//
//  When we have a world, look here... 
//    http://that-guy.net/articles/3/Javascript-tile-engine-player-and-movement/
RUBIES=20;
GAME_OVER=false;
var viewportwidth;
var viewportheight;

//--[01]--//
//
//  The more standards compliant browsers 
//    (mozilla/netscape/opera/IE7) use 
//    window.innerWidth and 
//    window.innerHeight
//    and i do not care about ie users
 
if (typeof window.innerWidth != 'undefined') {
 viewportwidth = window.innerWidth,
 viewportheight = window.innerHeight
} 

//--[02]--//
//
//  Default look of our sprite

sprite_index = 0;
sprite_speed = 20;
sprite_height = 68;
current_image = 21;
sprite_jump_distance = 70;

//--[03]--//
//
//  Default coordinates of our sprite

sprite_x = 350;
sprite_y = 350;

//--[04]--//
//
//  Default direction our sprite will face

key_code = '108';

//--[05]--//
//
//  Specify frames associated 
//    with each sprite motion

run_up = new     Array(13, 17, 33, 23);
run_left = new   Array(10, 14, 30, 20);
run_down = new   Array(12, 16, 32, 22);
run_right = new  Array(11, 15, 31, 21);

jump_up = new    Array(17, 27, 37, 47);
jump_left = new  Array(14, 24, 34, 44);
jump_down = new  Array(16, 26, 36, 46);
jump_right = new Array(15, 25, 35, 45);

teleport_up = Array(-1,10)
teleport_down = Array(-1,viewportheight-60)
teleport_middle = Array(-1,viewportheight/2)

teleport_left = Array(10,-1)
teleport_right = Array(viewportwidth-60,-1)

teleport = new Array(29, 30, 3, 4, 5, 6, 7, 8, 9);

//--[06]--//
//
//  Sprite constructor

var Rubies = function(id, ruby_image){
  $("body").append("<div id=\"ruby"+id+"\"></div>");
  var ruby_id="#ruby"+id;
  var that=$(ruby_id);
  that.ruby_id=ruby_id;
  that.x=null;
  that.y=null;
  that.draw = function(x,y){
    that.x=x;
    that.y=y;
    that[0].style.left = x+'px'; 
    that[0].style.top = y+'px'; 
  }; 
  that.css({ 
    width:'30px', 
    height:'30px', 
    position:'absolute', 
    backgroundImage: 'url('+ruby_image+')' 
  });

  that.destroy=function(){
    var remove_me=that.ruby_id;
    $('div').remove(that.ruby_id);
  };

  return that
}
var DHTMLSprites = function(params){

  var width = params.width,
    height = params.height,
    mathFloor = Math.floor,
    imagesWidth = params.imagesWidth;

  var $element = params.$drawTarget.append('<div/>').find(':last'),
    elemStyle = $element[0].style;

  $element.css({ 
    position:'absolute', 
    width:width, 
    height:height, 
    backgroundImage: 'url('+params.images+')' 
  });

  var that = {
    rubies:0,
    draw: function(x,y){ 
      elemStyle.left = x+'px'; 
      elemStyle.top = y+'px'; 
    }, 
    changeImage: function(index){
      index*=width;
      var hOffset = -index%imagesWidth;
      var vOffset = -mathFloor(index/imagesWidth)*height;
      elemStyle.backgroundPosition = hOffset+'px '+vOffset+'px';
    }, 
    show:function(){ 
      elemStyle.display = 'block';
    },
    hide:function(){ 
      elemStyle.display = 'none';
    }, 
    destroy:function(){ 
      $element.remove();
    },
    increment_sprite_rubies:function(){
      if (that.rubies){
        var ruby_text=" rubies!";
      } else {var ruby_text=" ruby!";}
      play_sound("picked_up_gem");
      that.rubies++;
      $("#ruby_count").html("You have " + that.rubies + ruby_text);
    }
  };
  return that;
};

//--[07]--//
//
//  To clean code, use associative 
//    array of responses to user input

sprite_movement_controller = {
  '108':{ 'x':sprite_speed,  'y':0,  'action':run_right, 'teleport':null },
  '104':{ 'x':-sprite_speed, 'y':0,  'action':run_left,  'teleport':null },
  '107':{ 'x':0,  'y':-sprite_speed, 'action':run_up,    'teleport':null },
  '106':{ 'x':0,  'y':sprite_speed,  'action':run_down,  'teleport':null },
  '98': { 'x':-sprite_jump_distance,  'y':0,  'action':jump_left,  'teleport':null },
  '119':{ 'x':sprite_jump_distance,   'y':0,  'action':jump_right, 'teleport':null },
  '111':{ 'x':0, 'y':sprite_jump_distance,   'action':jump_down,'teleport':null },
  '79': { 'x':0, 'y':-sprite_jump_distance,   'action':jump_up, 'teleport':null },
  '72': { 'x':0, 'y':0,   'action':teleport, 'teleport':teleport_up },
  '52': { 'x':0, 'y':0,   'action':teleport, 'teleport':teleport_right },
  '48': { 'x':0, 'y':0,   'action':teleport, 'teleport':teleport_left },
  '76': { 'x':0, 'y':0,   'action':teleport, 'teleport':teleport_down },
  '77': { 'x':0, 'y':0,   'action':teleport, 'teleport':teleport_middle }
};

//--[08]--//
//
//  We may begin animating and 
//    allowing user to interact now

$(document).ready(function(){

  //--[09]--//
  //
  //  Default parameters to pass 
  //    to sprite constructor

  var params = {
    width:59.5,
    imagesWidth:595,
    height:sprite_height,
    $drawTarget: $('#draw-target'),
    images: "../images/mega_man_boss.png"
  };
  //--[10]--//
  //
  //  We make our sprite

  sprite = DHTMLSprites(params);
  sprite.draw(sprite_x, sprite_y);
  sprite.changeImage(current_image);

  //--[11]--//
  //
  //  We move our sprite

  function move_sprite(mco){
    current_image = mco['action'][sprite_index];
    if (mco['teleport']==null){
      sprite_x+=mco['x'];
      sprite_y+=mco['y'];

    } else {
      if (mco['teleport'][0]>0){
        sprite_x = mco['teleport'][0];
      }

      if (mco['teleport'][1]>0){
        sprite_y = mco['teleport'][1];
      }
    }

    sprite.draw(sprite_x, sprite_y);
    if (++sprite_index > mco['action'].length){
      sprite_index = 0;
    }
  }

  //--[12]--//
  //
  //  We animate our sprite
  //    I do not care about ie users
  var got_ruby = function(){
    //alert("reached");
    for (r in page_rubies){
      this_ruby=page_rubies[r];
      if (this_ruby == undefined){continue;}

      x_interception=(Math.abs(this_ruby.x - sprite_x) < 30);
      y_interception=(Math.abs(this_ruby.y - sprite_y) < 30);

      if ( x_interception && y_interception) {
        this_ruby.destroy();
        sprite.increment_sprite_rubies();
        page_rubies[r]=undefined;
      }

    }
  };

  var animate = function(){
    if (typeof window.innerWidth != 'undefined') {
     viewportwidth = window.innerWidth,
     viewportheight = window.innerHeight
    }

    if (sprite_movement_controller.hasOwnProperty(key_code)){
      current_image = sprite_movement_controller[key_code]['action'][sprite_index]
      sprite.changeImage(current_image);

      if (++sprite_index > sprite_movement_controller[key_code]['action'].length){
        sprite_index = 0;
      }
    }
    setTimeout(animate, 120);
  }; animate();

  //--[13]--//
  //  we interpret meaningful user input
  var ruby_image = "../images/ruby.png";
  page_rubies=[RUBIES];
  for (var r=0; r < RUBIES; r++) {
    page_rubies[r] = Rubies(r, ruby_image);
    page_rubies[r].draw(
      Math.floor(Math.random() * (viewportwidth - 200 )),
      Math.floor(Math.random() * (viewportheight - 200 ))
    );
  }

  player_won=function(){
    for (var r in page_rubies){
      if (page_rubies[r] != undefined){ return true }
    }
    GAME_OVER=true;
    play_sound("thunder_clap");
    $('#countdown_dashboard').stopCountDown();
    $("#ruby_count").html("You have all " + RUBIES + " rubies! Good job!")
    alert("Good job, you got all the rubies!");
    //setTimeout(player_won, 120);
  };

  $(document).keydown(function(event){
    var seconds=""
    $(".seconds_dash").children("div").each(function(){
      seconds+=$(this).text().substring(0,1);
      if (seconds == "00"){
        $("#ruby_count").html("You didn't capture all the rubies. :(  But you did get " + sprite.rubies+ " rubies.  Good practice.");
        GAME_OVER=true
      }
    });

    if (GAME_OVER){
      prompt("The CS Dogma is out for the day.  You'll have to catch him tomorrow.")
      window.location="gate_keeper.html";
      return true
      //direct_user_to_next_lesson();
    }

    if (event.keyCode=='16'){return true}
    if (event.keyCode=='73'){

      got_ruby();
    }


    if (!event.shiftKey && event.keyCode > 64 && event.keyCode < 91){
      key_code = (parseInt(event.keyCode, 10)+32)+'';

    } else { key_code = event.keyCode; }

    if (sprite_movement_controller.hasOwnProperty(key_code)){
      sprite_direction_x = sprite_movement_controller[key_code]['x'];
      sprite_direction_y = sprite_movement_controller[key_code]['y'];
      move_sprite(sprite_movement_controller[key_code]);
    }
    player_won();
  });
});
