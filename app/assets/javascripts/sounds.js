function play_sound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}

$(document).ready(function(){
  // play_sound('thunder_clap');
  // play_sound("theme");
  //setInterval(function(){
  //  if (!GAME_OVER){
  //    play_sound("theme");
  //  } else {}
  //}, 10);
});