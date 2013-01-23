var movement = function(speed, distance){
  y = $('#draw-target').position().top + $('#draw-target').height() - 40;
  x = $('#draw-target').width() - 40;
  return {
    kikuchiyo:{
      '104':{ x:-speed,    y:0, z:null}, // "h" => left 
      '108':{ x:speed,     y:0, z:null}, // "l" => right

      '107':{ x:0,     y:-speed, z:null}, // "k" =>  up
      '106':{ x:0,     y: speed, z:null}, // "j" => down

      '98': { x:-distance, y:0, z:null},
      '119':{ x: distance, y:0, z:null},

      '79': { x:0, y:-distance, z:null},
      '111':{ x:0, y: distance, z:null},

      '72': { x: -1, y:0, z:'teleport' },
      '48': { x:0 , y:-1, z:'teleport' },

      '76': { x:-1,  y:y, z:'teleport' },
      '77': { x:-1,  y:y/2,     z:'teleport' },
      '52': { x: x, y:-1,  z:'teleport' }
    }
  };
};
