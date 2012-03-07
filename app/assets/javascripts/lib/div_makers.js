function time_div( unit ){

  var time_div_string = "";

  style = "style = \"display:none;\"";

  if ( unit == "minutes" || unit == "seconds" ){ style = ""; }

  time_div_string += "<div class='dash " + unit + "_dash'>";
  time_div_string += "	<span class='dash_title'>" + unit + "</span>";
  time_div_string += "	<div class='digit' " + style + ">0</div>";
  time_div_string += "	<div class='digit' " + style + ">0</div>";
  time_div_string += "</div>";
  document.write( time_div_string );
}

function audio_div( id, file ){
  var audio_div_string = "";

  audio_div_string += "<audio ";
  audio_div_string += "  id=\"" + id + "\"";
  audio_div_string += "  src=\"" + file + "\" ";
  //audio_div_string += "  src=\"../sounds/" + file + "\" ";
  audio_div_string += "> </audio>";
  document.write( audio_div_string );
}
