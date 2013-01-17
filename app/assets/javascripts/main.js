/*--Createdy by John Jimenez @ Fri Aug 19 23:11:58 PDT 2011--*/
KIKUCHIYO_HEIGHT=68;
GAME_OVER=false;
GAME_OVER_MSG="<div id=\"draw-target\" style=\"color:red; top:110%; left:0%; position:absolute;\">";
GAME_OVER_MSG+="You have been trapped by the CS Dogma!<br /><br />"
GAME_OVER_MSG+="\"Study requires calm; talent requires study; "
GAME_OVER_MSG+="without calm there is no way to accomplish study. ";
GAME_OVER_MSG+="Without study there is no way to expand talent.\" - Kong Ming<br /><br />";
GAME_OVER_MSG+="<a href=training_lesson_01.html>Want to Study?</a>";
GAME_OVER_MSG+="</div>";

/*--creates an object to store our data--*/
function show_header(title){
  var header="";
  //header+="<a href=\"http://dogdevim.com\">";
  header+="  <div id=\"centerheader\" style=\"background-color:black\">";
  header+="    <div id=\"logo01\">";
  header+="      <img ";
  header+="        style=\"height:380px;width:680px;\" ";
  header+="        id=\"vimlogo\" ";
  header+="        src=\"kikuchiyo.jpg\"";
  header+="      ></img>";
  header+="    </div>";
  header+="    <div id=\"logo02\">";
  header+="      <h1>Kikuchiyo</h1>";
  header+="    </div>";
  header+="    <div id=\"logo03\">";
  header+="      <h1>"+title+"</h1>";
  header+="    </div>";
  header+="    <div id=\"our_sprite\">";
  header+="    </div>";
  header+="  </div>";
  document.write(header);
}

game_over=function(){
  GAME_OVER=true;
  $("#draw-target").html(GAME_OVER_MSG);
};
