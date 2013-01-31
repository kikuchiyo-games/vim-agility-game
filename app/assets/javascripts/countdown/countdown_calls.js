jQuery(document).ready(function() {
  $('#countdown_dashboard').countDown({
    targetOffset: {
      'day':      0,
      'month':    0,
      'year':     2012,
      'hour':     0,
      'min':      0,
      'sec':      0
    }
  });
  set_by_offset();
});

// Set by specific date/time
function set_by_date() {
  $('#countdown_dashboard').stopCountDown();
  $('#countdown_dashboard').setCountDown({
    targetDate: {
      'day':      04,
      'month':    11,
      'year':     2011,
      'hour':     10,
      'min':      10,
      'sec':      30
    }
  });
  $('#countdown_dashboard').startCountDown();
}

// Set by date/time offset
function set_by_offset() {
  //alert("Pres 'i' to pick up the rubies.  Go!");

  var minutes = 5;
  var seconds = 0;

  if ( TRAINING ){ 
    minutes = 0; 
    seconds = 30;
  }

  $('#countdown_dashboard').stopCountDown();
  $('#countdown_dashboard').setCountDown({
    targetOffset: {
      'day':      0,
      'month':    0,
      'year':     0,
      'hour':     0,
      'min':      minutes,
      'sec':      seconds
    }
  });
  $('#countdown_dashboard').startCountDown();
}
