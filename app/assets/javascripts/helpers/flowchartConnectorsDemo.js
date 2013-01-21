$(document).ready(function(){
	
    jsPlumb.connect({ 
      source: 'walking_slow', 
      target: 'walking_fast',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'walking_fast', 
      target: 'running',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'running', 
      target: 'jumping_slow',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'jumping_slow', 
      target: 'jumping_fast',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'running', 
      target: 'hopping_around',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'hopping_around', 
      target: 'teleporting_slow',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'teleporting_slow', 
      target: 'teleporting_fast',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'teleporting_slow', 
      target: 'genius',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'teleporting_fast', 
      target: 'magic_slow',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'teleporting_fast', 
      target: 'monkey',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'genius', 
      target: 'wizard',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'genius', 
      target: 'magic_fast',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

    jsPlumb.connect({ 
      source: 'wizard', 
      target: 'dragon',
      anchors: ['BottomLeft', 'TopLeft'],
      paintStyle: { strokeStyle: "white", lineWidth: 1 },
      connector:[ "Bezier", { curviness:50 } ],
      endpoint:'Blank'
      //connector: ['FlowChart']
    });

});
