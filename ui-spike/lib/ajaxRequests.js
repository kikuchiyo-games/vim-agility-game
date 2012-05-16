// Ajax Requests and Callbacks...
$(function(){
  get_alerts = function(){
    $.ajax( {
      "dataType": 'json', 
      "type": "GET", 
      "url": 'sources/alerts.json', 
      "success": function( data ){ 
        var alerts = json_parse( data );
        $('#alerts ul').html('<li>' + alerts.alerts.join('</li><li>') + '</li>'); 
      }, "error": function(error){dag = error;; alert( 'error in get_alerts'); }
    }) ;
  };
  get_alerts();
})
$(function(){
  get_tickets = function(){
    $.ajax( {
      "dataType": 'json', 
      "type": "GET", 
      "url": 'sources/tickets.json', 
      "success": function( data ){ 
        var alerts = json_parse( data );
        $('#tickets ul').html('<li>' + alerts.alerts.join('</li><li>') + '</li>'); 
      }, "error": function(error){dag = error; alert( 'error in get_tickets'); }
    }) ;
  };
  get_tickets();
})
$(function(){
  get_project_details = function(){
    $.ajax( {
      "dataType": 'json', 
      "type": "GET", 
      "url": 'sources/project_details.json', 
      "success": function( data ){ 
        var alerts = json_parse( data ); // JSON.parse( data );
        for (a in alerts.project_details){ $('#' + a).html( a + ':<span>' + alerts.project_details[a] + '</span>'); }
        //$('#tickets ul').html('<li><span>' + alerts.project_details.join('</span></li><li><span>') + '</span></li>'); 
      }, "error": function(error){dag = error; alert( 'error in get_project_details'); }
    }) ;
  };
  get_project_details();
})
function json_defined(){
  if ( typeof JSON == 'undefined' ){
    return( false );
  } else { return( true ); }
}
function json_parse( string_to_parse ){
  if ( typeof JSON == 'undefined' ){
    return( $.parseJSON( string_to_parse ) );
  } else { return( JSON.parse( string_to_parse ) ); }
}
