$(document).ready(function() {
  // "use strict";
  // var ChartController;
  var fifteen_minutes;
  var force_page_reload;
  fifteen_minutes = 900000;
  force_page_reload = true;

  new LeaderboardView('/homeowners/leaderboard').setText(); 
  if ( typeof JSON == 'undefined' ){
    time_series_data = $.parseJSON( time_series_json );
  } else { time_series_data = JSON.parse( time_series_json ) }

  window.chart = new window.Chart( time_series_data.data, time_series_data );
  window.view = new window.ChartView();
  window.controller = new window.ChartController( time_series_data );

  $('.lastupdate span').text(new Date().toLocaleTimeString());
  
  setTimeout(function () {
    window.location.reload(force_page_reload);
  
  }, fifteen_minutes);
  
  $('.menu.tabs li').click(function(event) {
    event.preventDefault();
    var menu_tabs = ['energy', 'value', 'environment'];
    for ( tab in menu_tabs ){
      if ($(this).hasClass(menu_tabs[tab])){ return }
    }
    $.each(['.1D', '.1W', '.1M', '.1Y', '.All'], function(i, button) { $(button).removeClass('active'); });
    $(this).addClass('active');
    window.controller.update_chart( $(this).children('a').attr('href') + ".json" );
  });
  
  $('.menu.tabs.vertical li').click(function(event) {
    event.preventDefault();
    $.each(['.energy', '.value', '.environment'], function(i, button) {
      $(button).removeClass('active');
    });      
    $(this).addClass('active');
    window.controller.update_chart( $(this).children('a').attr('href') + ".json" );

  });
  
  $('.selector a').click(function(event) {
    event.preventDefault();
    window.controller.update_chart( $(this).attr('href') + ".json" );
  });

  $('.popup').find('.close').click(function(){
    $('.popup').fadeOut();  
    return false;
  });
});
