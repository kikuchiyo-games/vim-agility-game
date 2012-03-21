
  $(document).ready(function(){ 
    partial_view = new App.PartialView( { el:'div#partial-body' } );
    function play_sound(soundobj) {
      var thissound=document.getElementById( soundobj );
      thissound.play();
    }
    setInterval(function(){ play_sound("theme"); }, 10);
  });


