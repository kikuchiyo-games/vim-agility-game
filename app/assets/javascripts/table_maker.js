function make_row( key ){
  var td_array = GUIDE[ key ];

  var td_string = "<tr>";
  td_string += "<td class=\"underlined\">" + key + "</td>";

  for ( t in td_array ){
    td_string += "<td>" + td_array[ t ] + "</td>";
  }

  td_string += "</tr>";

  document.write( td_string );
}

var pickups   = [  "",  "",  "",  "", "", "i" ];
var runs      = [ "j", "k", "h", "l", "",  "" ];
var jumps     = [ "o", "O", "w", "b", "",  "" ];
var teleports = [ "L", "H", "0", "R", "M", "" ];

var methods   = [ 
  "DOWN", "UP", "LEFT", 
  "RIGHT", "MIDDLE", "RUBY!" 
];

GUIDE={
  "Methods":methods,
  "Run":runs,
  "Jump":jumps,
  "Teleport":teleports,
  "PICK UP":pickups
}
