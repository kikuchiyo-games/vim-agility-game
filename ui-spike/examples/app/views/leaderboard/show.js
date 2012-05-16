$(document).ready(function(){
  window.LeaderboardView = Backbone.View.extend({
    initialize: function( url ){
      klass         = 'started';
      time_out      = 1000;
      game_clock    = 1;
      model         = new Leaderboard( {url:url} );
      title         =  'SunEdison Electricity Generated:';
      span_kwh      = '<span class="kwh"><b></b> kWh</span>';
      span_lbs      = '<span class="lbs">CO2 Offset: <b></b> lbs</span>';
      div_container = function(){ return( $('#leaderboard .generated')                ); };
      kwh_container = function(){ return( $('#leaderboard .generated').find(".kwh b") ); };
      lbs_container = function(){ return( $('#leaderboard .generated').find(".lbs b") ); };

    }, template: function(){ 
      return( title + span_kwh + span_lbs ); 

    }, setText: function(){
      if ( !model.valid_leaderboard_attributes() ) { return; }
      div_container()
        .addClass( klass )
        .html(this.template());
      this.calculateStatistics();
      window.setInterval( this.calculateStatistics, time_out );

    }, calculateStatistics: function() {
      var kwh = model.get( 'power' ) + ( model.get( 'persecond' ) * game_clock );
      var lbs = kwh * model.get( 'co2offset' );
      kwh_container().text( model.commify_statstic( kwh.toFixed(0) ) );
      lbs_container().text( model.commify_statstic( lbs.toFixed(0) ) );
      game_clock++;

    }
  },{});
});
