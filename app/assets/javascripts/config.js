config = function(){
  var browser = window.navigator.userAgent;

  if( browser.match(/safari|chrome/i) ){
    browser = 'safari_chrome';
  } else if ( browser.match(/fire/i) ){
    browser = 'fire_fox';
  } else { browser = 'who_cares'; }

  BROWSER = browser;
  ALL_ENEMIES_DEFEATED = -1
  KEY_PRESSES = 0;
  RUBIES = 1;
  POWER_BALLS = 1;
  page_rubies = [RUBIES];
  power_balls = [POWER_BALLS];
}();
