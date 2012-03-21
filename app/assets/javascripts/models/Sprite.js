App.Sprite = Backbone.Model.extend({
  url: '/sprites',

  sheets: {
    good:"../images/digital_kikuchiyo.png",
    evil:"../images/mega_man_evil.png"
  },
  distance:  100,
  speed: 20,
  image_width: 595,
  height: 72.25,
  width: 59.24,

  teleport_keys: [ "72", "48", "76", "77", "52" ],

  initialize: function( nature ){
    this.nature = nature;
  },

  movement: function( ){
    return {
      kikuchiyo:{
        '104':{ x:-this.speed,    y:0, z:null},
        '108':{ x:this.speed,     y:0, z:null},
  
        '107':{ x:0,     y:-this.speed, z:null},
        '106':{ x:0,     y: this.speed, z:null},
  
        '98': { x:-this.distance, y:0, z:null},
        '119':{ x: this.distance, y:0, z:null},
  
        '79': { x:0, y:-this.distance, z:null},
        '111':{ x:0, y: this.distance, z:null},
  
        '72': { x: -1, y:0, z:'teleport' },
        '48': { x:0 , y:-1, z:'teleport' },
  
        '76': { x: -1, y:window.innerHeight - 100, z:'teleport' },
        '77': { x:-1,  y:window.innerHeight/2,     z:'teleport' },
        '52': { x: window.innerWidth - 100, y:-1,  z:'teleport' }
      }
    };
  },

  clips: function(){
    return ({
      kikuchiyo:{
        run_up    : [ 3, 33, 7, 23, 43 ],
        run_down  : [ 2, 32, 6, 22, 42 ],
        run_left  : [ 0, 30, 4, 20, 40 ],
        run_right : [ 1, 31, 5, 21, 41 ],
        jump_up   : [ 17, 27, 37, 47 ],
        jump_left : [ 14, 24, 34, 44 ],
        jump_down : [ 16, 26, 36, 46 ],
        jump_right: [ 15, 25, 35, 45 ],
        //teleport  : [ 29, 30, 3, 4, 5, 6, 7, 8, 9 ]
        teleport  : [ 0, 1, 2, 3, 4, 5, 6, 7 ]
      }
    });
  },

  is_teleport_key_press: function( key ){
    //if (key != '108') { 
    //  alert( key );
    //  alert( [ 72, 48, 76, 77, 36 ].indexOf( key ) );
    //}
    if ( key == 36 ) { return(true); }
    return ( ([ "72", "48", "76", "77", "52"].indexOf(  key ) != -1) );
  },

  standard_sheet: function( nature ){
    return this.sheets[ nature ];
  },

  teleport_sheet: function( nature ) {
    return "../images/teleportation.png";
  }

});
