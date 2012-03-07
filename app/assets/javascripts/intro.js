$(document).ready(function(){
  // intro specific
  PICTURES = [
    "dead_forest.png",
    "banished.png",
    "sent_to_land_of_cs_dogmas.png",
    "introducing_the_cs_dogmas.png",
    "offer_to_help_code_in_exchange_for_help.png"
  ];
  place_pictures_on_page = function( width, dom_element ){

    var start_list = ""; 
    var end_list = "";

    if ( width == 55 ){
      var start_list = "<li>"; 
      var end_list = "</li>"
    }

    for ( var p in PICTURES ) {
      var pic = PICTURES[ p ];
      var href = "#";

      string =  start_list + "<a href=\"" + href + "\" target=\"_blank\">";
      string += "  <img ";
      string += "    width=\"" + width  + "\" ";
      string += "    alt=\"1144953 3 2x\" ";
      string += "    src=\"images/kikuchiyo_introduction/" + pic + "\" ";
      string += "  > ";
      string += "</a> " + end_list;

      $(dom_element).append( string );

    }
  };

  place_pictures_on_page( 856, ".slides_container" );

  $(function(){
  	$('#products').slides({
  		preload: true,
  		preloadImage: 'images/images/loading.gif',
  		effect: 'slide, fade',
  		crossfade: true,
  		slideSpeed: 450,
  		fadeSpeed: 500,
  		generateNextPrev: true,
  		generatePagination: false
  	});
  });
});
