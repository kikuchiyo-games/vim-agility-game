$(document).ready(function(){
  window.Leaderboard = Backbone.Model.extend({
    initialize: function( url ){
      this.set( {url:url} );
      this.get_leaderboard_json();

    }, get_leaderboard_json: function(){
      that = this;
      $.ajax({
        url: that.get('url').url,
        async:false,
        type: 'GET',
        dataType: 'text',
        success: function (data, textStatus) {
          that.parse_leaderboard_json( jQuery.parseJSON( data ) );
        }, failure: function(){ that.failure_callback(); }
      });

    }, parse_leaderboard_json: function( leaderboard_json ){
      this.set({'power':leaderboard_json['power']});
      this.set({'co2offset':leaderboard_json['co2offset']});
      this.set({'persecond':leaderboard_json['persecond']});

    }, valid_leaderboard_attributes: function(){
      var attributes = ['power', 'co2offset', 'persecond']
      for (var attrib in attributes ){ 
        if ( this.get(attributes[attrib]) == undefined ) { return false; }
      }
      return true;

    }, commify_statstic: function( stat ){
      stat += '';
      var stat_deci = '';
      var stat_split = stat.split('.');
      var commify    = /(\d+)(\d{3})/;
      var stat_int   = stat_split[0];
      if ( stat_split.length > 1 ) { stat_deci = '.' + stat_split[1] }
      while ( commify.test( stat_int ) ) { stat_int = stat_int.replace( commify, '$1' + ',' + '$2' ); }
      return( stat_int + stat_deci );

    }, get_json_failure_callback: function(){ /* todo: on failure */ }
  });
});
