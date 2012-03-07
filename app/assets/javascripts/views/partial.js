App.PartialView = Backbone.View.extend({

  initialize: function( ){ },

  LogInTemplate: function(){
    return( 
      "<form>" + 
        "<ul>" + 
          "<li id = 'prompt' class = 'spacer' > <h3> &nbsp; Log In:</h3> </li>" + 
          "<li> &nbsp; username <input class = 'input'></input> </li>" + 
          "<li> &nbsp; password <input class = 'input' type = 'password'></input> </li>" + 
        "</ul>" +
      "</form>"
    );
  }, 

  RegisterTemplate: function(){
    return( 
      "<form>" + 
        "<ul>" + 
          "<li id = 'prompt' class = 'spacer' > <h3> &nbsp; Register:</h3> </li>" + 
          "<li> &nbsp; username <input class = 'input'></input> </li>" + 
          "<li> &nbsp; password <input class = 'input' type = 'password'></input> </li>" + 
        "</ul>" +
      "</form>"
    );  }, 

  HomeTemplate: function(){
        

    return( 
      "<div id = 'home-partial'>" + 
        "<h3>Welcome Home!</h3>" + 
        "<ul>" + 
          "<li><button id = 'home-to-practice'>Practice Your Vim Skills</button></li>" + 
        "</ul>" + 

      "<div>"
    );
  }, 

  PracticeTemplate: function(){
    return( 
      "<div id = 'practice-partial'>" + 
        "<h3>Practice!</h3>" + 
        "<div id='draw-target'>" + 
          "<div id='ruby_count' style = 'position:absolute; top:110%; left:0%;'>" + 
          "</div>" + 
        "</div>" +
      "</div>"
    );
  }, 

  render_action: function( template ){
    return(
      { 'register': this.RegisterTemplate(),
        'practice': this.PracticeTemplate(),
        'login':    this.LogInTemplate(),
        'home':     this.HomeTemplate()
      }[ template ]);
  },

  render: function( template ){
    this.el.innerHTML = this.render_action( template );

  }

});
