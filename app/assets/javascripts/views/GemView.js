App.GemView = Backbone.View.extend({

  initialize: function( options ){
    this.id = this.options.id;
    this.ruby_id = "ruby" + this.id
    this.divContent = "<div id = '" + this.ruby_id + "'></div>";
    this.ruby_image = this.options.ruby_image;
    this.x = null;
    this.y = null;
    this.render();
    this.el = 'div#ruby' + this.id
    return this;
  },

  getPositions: function( elem ) {
    var pos, width, height;
    pos = $( elem ).position();
    width = $( elem ).width();
    height = $( elem ).height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
  },

  comparePositions: function(pos1, pos2){
    var x_overlap = false;
    var y_overlap = false;

    var x = {
      ruby_left_overlap:  ( pos1[0][0] >= pos2[0][0] &&  pos1[0][0] <= pos2[0][1] + 30),
      ruby_right_overlap: ( pos1[0][1] >= pos2[0][0] &&  pos1[0][1] <= pos2[0][1] + 30),
      ruby_contained_in_overlap: ( pos1[0][0] >= pos2[0][0] &&  pos1[0][1] <= pos2[0][1] )
    };

    var y = {
      ruby_left_overlap:  ( pos1[1][0] >= pos2[1][0] &&  pos1[1][0] <= pos2[1][1] ),
      ruby_right_overlap: ( pos1[1][1] >= pos2[1][0] &&  pos1[1][1] <= pos2[1][1] ),
      ruby_contained_in_overlap: ( pos1[1][0] >= pos2[1][0] &&  pos1[1][1] <= pos2[1][1] )
    };

    for (var ix in x){ if (x[ix] == true){ x_overlap = true; } }
    for (var iy in y){ if (y[iy] == true){ y_overlap = true; } }
    return( x_overlap && y_overlap)
  },

  earned_by_player: function( player ){
    var pos1 = this.getPositions( 'div#' + this.ruby_id ),
        pos2 = this.getPositions( 'div#kikuchiyo' );

    if ( this.comparePositions( pos1, pos2 ) ) {
      this.destroy();
      return (true)
    } else { return(false) }
  },

  destroy: function(){
    $( '#' + this.ruby_id ).remove();
  },

  render: function(){

    var that = this;
    $('body').append( this.divContent );
    
    if ( this.ruby_image.indexOf( "diamond" ) == -1 ){

      this.image_width = 30;
      this.image_height = 30;
      this.points = 20;
      this.rubies = 1;
      this.diamonds = 0;
  
    } else { 

      this.image_width = 37; 
      this.image_height = 22;
      this.points = 10;
      this.rubies = 0;
      this.diamonds = 1;

    }

    $( '#' + this.ruby_id ).css({ 
      position:'absolute', 
      width:that.image_width   + 'px', 
      height:that.image_height + 'px', 
      backgroundImage: 'url(' + that.ruby_image + ')',
      top:  Math.floor( Math.random() * ( window.innerHeight - 200 ) )  + 'px',
      left: Math.floor( Math.random() * ( window.innerWidth - 200 ) ) + 'px',
      margin:0,
      padding:0
    });
    return this;
  }
});

