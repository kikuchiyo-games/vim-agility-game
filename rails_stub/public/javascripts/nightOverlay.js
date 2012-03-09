// OUR NIGHT OVERLAY...
// JS 0: INITIALIZE_MAP_OPTIONS.js
//
$(document).ready(function(){
  window.language = 'en';
  var l10n = {
    'by_click': "Click anywhere on the map to add a marker at that location.",
    'address': "Address",
    'city': "City",
    'state': "State/Province",
    'zip': "ZIP",
    'us_only': "USA only",
    'lat': "Latitude",
    'lon': "Longitude",
    'n': "N",
    's': "S",
    'e': "E",
    'w': "W",
    'cancel': "Cancel",
    'delete': "Delete",
    'marker': "Marker",
    'local_time': "Local Time",
    'sunrise': "Sunrise",
    'sunset': "Sunset",
    'ago': "ago",
    'from_now': "from now",
    'length_day': "Length of Day",
    'length_night': "Length of Night",
    'move': "Move",
    'rename': "Rename",
    'no_gmaps_msg': "Sorry, Google maps are not compatible with this browser.",
    'addr_msg_1': "Please enter at least one address value.",
    'addr_msg_2': "There was a problem finding your address",
    'no_latlon_msg': "Please enter values for latitude and longitude.",
    'bad_latlon_msg': "Please enter numeric values for both latitude and longitude.",
    'no_hemi_msg': "Please select hemispheres (north/south and east/west).",
    'max_msg': "This map only supports 10 markers.",
    'delete_msg': "Are you sure you want to delete",
    'no_cookie_msg': "Markers cannot be saved because your browser has cookies disabled. Check cookie settings in your browser options and try again.",
    'move_msg': "Use your mouse to drag the marker and drop it at a new location."
  };
  // JS 1: ELABEL.js
  // Version 0.2      the .copy() parameters were wrong
  // version 1.0      added .show() .hide() .setContents() .setPoint() .setOpacity() .overlap
  function ELabel(point,html,classname,pixelOffset,percentOpacity,overlap){
  // Mandatory parameters
  this.point=point;
  this.html=html;
  // Optional parameters
  this.classname=classname||"";
  this.pixelOffset=pixelOffset||new GSize(0,0);
  if(percentOpacity){
  if(percentOpacity<0){percentOpacity=0;}
  if(percentOpacity>100){percentOpacity=100;}
  }
  this.percentOpacity=percentOpacity;
  this.overlap=overlap||false;
  }
  ELabel.prototype=new GOverlay();
  ELabel.prototype.initialize=function(map){
  var div=document.createElement("div");
  div.style.position="absolute";
  div.innerHTML='<div class="'+this.classname+'">'+this.html+'</div>';
  map.getPane(G_MAP_FLOAT_SHADOW_PANE).appendChild(div);
  this.map_=map;
  this.div_=div;
  if(this.percentOpacity){
    setOpacity(div, this.percentOpacity);
  //if(typeof(div.style.filter)=='string'){div.style.filter='alpha(opacity:'+this.percentOpacity+')';}
  //if(typeof(div.style.KHTMLOpacity)=='string'){div.style.KHTMLOpacity=this.percentOpacity/100;}
  //if(typeof(div.style.MozOpacity)=='string'){div.style.MozOpacity=this.percentOpacity/100;}
  //if(typeof(div.style.opacity)=='string'){div.style.opacity=this.percentOpacity/100;}
  }
  if(this.overlap){
  var z=GOverlay.getZIndex(this.point.lat());
  this.div_.style.zIndex=z;
  }
  }
  ELabel.prototype.remove=function(){
  this.div_.parentNode.removeChild(this.div_);
  }
  ELabel.prototype.copy=function(){
  return new ELabel(this.point,this.html,this.classname,this.pixelOffset,this.percentOpacity,this.overlap);
  }
  ELabel.prototype.redraw=function(force){
  var p=this.map_.fromLatLngToDivPixel(this.point);
  this.div_.style.left=(p.x+this.pixelOffset.width)+"px";
  this.div_.style.top=(p.y+this.pixelOffset.height)+"px";
  //var h=parseInt(this.div_.clientHeight);
  //this.div_.style.left=(p.x+this.pixelOffset.width)+"px";
  //this.div_.style.top=(p.y+this.pixelOffset.height-h)+"px";
  }
  ELabel.prototype.show=function(){
  this.div_.style.display="";
  }
  ELabel.prototype.hide=function(){
  this.div_.style.display="none";
  }
  ELabel.prototype.setContents=function(html){
  this.html=html;
  this.div_.innerHTML='<div class="'+this.classname+'">'+this.html+'</div>';
  this.redraw(true);
  }
  ELabel.prototype.setPoint=function(point){
  this.point=point;
  if(this.overlap){
  var z=GOverlay.getZIndex(this.point.lat());
  this.div_.style.zIndex=z;
  }
  this.redraw(true);
  }
  ELabel.prototype.setOpacity=function(percentOpacity){
  if(percentOpacity){
  if(percentOpacity<0){percentOpacity=0;}
  if(percentOpacity>100){percentOpacity=100;}
  }
  this.percentOpacity=percentOpacity;
  if(this.percentOpacity){
  if(typeof(this.div_.style.filter)=='string'){this.div_.style.filter='alpha(opacity:'+this.percentOpacity+')';}
  if(typeof(this.div_.style.KHTMLOpacity)=='string'){this.div_.style.KHTMLOpacity=this.percentOpacity/100;}
  if(typeof(this.div_.style.MozOpacity)=='string'){this.div_.style.MozOpacity=this.percentOpacity/100;}
  if(typeof(this.div_.style.opacity)=='string'){this.div_.style.opacity=this.percentOpacity/100;}
  }
  }
  // JS 2: COMMON.js
  //<![CDATA[
  /*
      common.js
  
      Common routines useful throughout my JavaScript code base.
  */
  
  function documentPath()
  {
    // Returns the "path" section of the document's URL. Examples:
    //  URL = http://www.domain.com/file.ext            =>  documentPath = /
    //  URL = http://www.domain.com/dir1/dir2/file.ext  =>  documentPath = /dir1/dir2/
  
    var path = window.location.pathname;
  
    // Find the last forward-slash, separating the source file name from its dir path
    return path.slice(0, path.search(/\/[^\/]*$/) + 1);
  };
  //alert(document.URL + '\n' + window.location.host + '  ' + documentPath());
  
  function xmlRequestor()
  {
    try
    {
      if (typeof ActiveXObject != "undefined")
      {
        return new ActiveXObject("Microsoft.XMLHTTP")
      }
      else if (window.XMLHttpRequest)
      {
        return new XMLHttpRequest()
      }
    }
    catch(a)
    {
    }
    return null
  };
  var newRequestor = function()
  {
    request = new xmlRequestor;
  };
  var request;
  newRequestor();
  
  function importXML(xmlText)
  {
    // Cross-browser function to get a DOM objectfrom an XML string
  
    if (typeof ActiveXObject != "undefined" &&
        typeof GetObject != "undefined")
    {
      var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
      xmlDom.loadXML(xmlText);
      return xmlDom;
    }
    
    if (typeof DOMParser != "undefined")
    {
      return(new DOMParser).parseFromString(xmlText, "text/xml");
    }
    
    return null;
  }
  
  if (!Array.prototype.indexOf)
  {
    Array.prototype.indexOf = function(target)
    {
      // A useful extension to the built-in JS Array type: find the index of the
      // given element. Reurns -1 if not found.
    
      for (var n = 0; n < this.length; n++)
        if (this[n] == target)
          return n;
    
      return -1;
    }
  };
  
  if (!Array.prototype.forEach)
  {
    Array.prototype.forEach = function(fun /*, thisp*/)
    {
      var len = this.length;
      if (typeof fun != "function")
        throw new TypeError();
  
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
        if (i in this)
          fun.call(thisp, this[i], i, this);
      }
    };
  };
  
  if (!Array.prototype.filter)
  {
    Array.prototype.filter = function(fun /*, thisp*/)
    {
      var len = this.length;
      if (typeof fun != "function")
        throw new TypeError();
  
      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
        if (i in this)
        {
          var val = this[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, this))
            res.push(val);
        }
      }
  
      return res;
    };
  };
  
  if (!Array.prototype.merge)
  {
    Array.prototype.merge = function (otherArray)
    {
      for (var n = 0; n < otherArray.length; n++)
        this.push(otherArray[n]);
    };
  };
  
  
  if (!String.prototype.trim)
  {
    String.prototype.trim = function()
    {
      return this.replace(/^ +/, '').replace(/ +$/, '');
    };
  };
  if (!String.prototype.pack)
  {
    String.prototype.pack = function()
    {
      return this.replace(/\s+/g, ' ');
    };
  };
  if (!String.prototype.htmlEntities)
  {
    String.prototype.htmlEntities = function () 
    {
      return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
  };
  if (!String.prototype.capitalize)
  {
    String.prototype.capitalize = function () 
    {
      return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
    };
  };
  if (!String.prototype.capitalizeAll)
  {
    String.prototype.capitalizeAll = function () 
    {
      var words = this.split(' ');
    
      var result =  words[0].capitalize();
      for (var w = 1; w < words.length; w++) 
        result += ' ' + words[w].capitalize();
    
      return result;
    };
  };
  
  function propertyCount(object)
  {
    var result = 0;
    for (var property in object)
      result++;
  
    return result;
  };
  
  function limit(a, lower, upper)
  {
    // Handy little function to limit a number (a) to be within specified bounds
    //
    //  Example:
    //    lat = limit(lat, -90, 90);
    
    if (lower != null)
      a = Math.max(a, lower);
  
    if (upper != null)
      a = Math.min(a, upper);
      
    return a;
  };
  
  function addEventHandler(element, event, func, phase)
  {
    /* A generic, cross-browser technique for adding an event handler to a DOM element
       without disturbing any other handlers that have been tied to it, by any means.
       
       Parms:
       
        element - the DOM element to attach to. Either the node itself (including "window") or a 
                  string containing the ID of the element.
                  
        event - the event name as a string, either as "load", "onload", or "onLoad" (case-insensitive)
        
        func - the function to assign to the event. Can be a closure.
        
        phase - string, 'capturing' or 'bubbling'. Optional, defaults to 'capturing'. Not
                applicable to IE<7 and some older browsers.
                
       Examples:
        addEventHandler(window, 'load', init);
        addEventHandler(window, 'unload', GUnload);
        addEventHandler(listName, 'onClick', function() {renamePoint(id, 'list')});
    */
    
    // Normalize parms
  
    if ((typeof element) == 'string')
      element = document.getElementById(element);
    if (!element ||
        (element == undefined))
      return;
  
    event = event.toLowerCase();
    if (event.substr(0, 2) == 'on')
    {
      var longEvent  = event;
      var shortEvent = event.substr(2);
    }
    else
    {
      var longEvent  = 'on' + event;
      var shortEvent = event;
    }
  
    var useCapture = (phase == 'bubbling');
    
    // Attach the event
    
    if ((event != 'click') &&
        element.addEventListener)
      // W3C DOM Level 2 compliant
      element.addEventListener(shortEvent, func, useCapture);
      
    else if ((event != 'click') &&
             element.attachEvent)
      // Most versions of IE
      element.attachEvent(longEvent, func);
      
    else
    {
      // Older browsers
      //  - Note that the handler does not get an event object parm - not sure if this is an issue
      //    with the browser versions that will see this code block or not.
      var oldHandler = eval('element.' + longEvent);
  
      if ((typeof oldHandler) == 'function') 
        eval('element.' + longEvent + ' = function() {return (oldHandler() && func());}');
      else 
        eval('element.' + longEvent + ' = function() {return func();}');
    }
  };
  
  function removeEventHandler(element, event, func, phase)
  {
    
    // Normalize parms
  
    if ((typeof element) == 'string')
      element = document.getElementById(element);
    if (!element ||
        (element == undefined))
      return;
  
    event = event.toLowerCase();
    if (event.substr(0, 2) == 'on')
    {
      var longEvent  = event;
      var shortEvent = event.substr(2);
    }
    else
    {
      var longEvent  = 'on' + event;
      var shortEvent = event;
    }
  
    var useCapture = (phase == 'bubbling');
    
    // Attach the event
    
    if (element.removeEventListener)
      // W3C DOM Level 2 compliant
      element.removeEventListener(shortEvent, func, useCapture);
      
    else if (element.detachEvent)
      // IE 5 & 6
      element.detachEvent(longEvent, func);
      
    else
    {
      // Older browsers
      //  - Note that this just removes ALL handlers from the event. Not ideal, but what's the alternative?
      eval('element.' + longEvent + ' = null');
    }
  };
  
  var _mSecPerDay = 1000 * 60 * 60 * 24;
  var yesterday = new Date() - _mSecPerDay;
  
  function isPast(date)
  {
    // Utility function called to disable past dates in the popup calendar
    return (date < yesterday);
  };
  
  var arVersion = navigator.appVersion.split("MSIE");
  var ieVersion = parseFloat(arVersion[1]);
  function fixPNG(myImage) 
  {
    /* Work around IE5/6's inability to natively display alpha-channel PNGs
  
        To use, call with the image element as a parameter.
    
        titleDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/title.png', sizingMethod='scale')";
        
    */
    if ((ieVersion >= 5.5) && 
        (ieVersion < 7) && 
        (document.body.filters)) 
    {
      var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
      var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : "";
      var imgTitle = (myImage.title) ? 
  	                "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' ";
      var imgStyle = "display:inline-block;" + myImage.style.cssText;
      var strNewHTML = "<span " + imgID + imgClass + imgTitle
                     + " style=\"" + "width:" + myImage.width 
                     + "px; height:" + myImage.height 
                     + "px;" + imgStyle + ";"
                     + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                     + "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>";
      myImage.outerHTML = strNewHTML;
    }
  };
  function getTarget(event)
  {
    // A cross-browser-compatible function to return the target of an event
    if (event.target)
      // Mozilla
      return event.target;
    else if (event.srcElement)
      // IE
      return event.srcElement;
    else
      return null;
  };
  
  function cloneObject(what) {
      for (i in what) {
          this[i] = what[i];
      }
  };
  
  function getText(xmlNode)
  {
    // A cross-browser-compatible function to return the inner text of the given
    // XML node. For example, if the node was "<foo>bar</foo>", would return "bar".
  
    if (xmlNode.text)
      return xmlNode.text;
      
    if (xmlNode.data)
      return xmlNode.data;
      
    else if (xmlNode.innerText)
      return xmlNode.innerText;
  
    else if (xmlNode.textContent)
      return xmlNode.textContent;
  
    else if (xmlNode.firstChild)
      return getText(xmlNode.firstChild);
  
    else if (xmlNode.length > 0)
      return getText(xmlNode[0]);
  
    else
      return '';
  };
  
  function getChildNodeByName(xmlNode, target)
  {
    for (var m = 0; m < xmlNode.childNodes.length; m++)
      if (xmlNode.childNodes[m].nodeName == target)
        return xmlNode.childNodes[m];
    
    return null;
  };
  
  function getURLParm(name)
  {
    // thanks to http://www.netlobo.com/url_query_string_javascript.html
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
  };
  
  function getCookie(name) 
  {
    // thanks to http://www.quirksmode.org/js/cookies.html
  	var nameEQ = name + "=";
  	var ca = document.cookie.split(';');
  	for (var i = 0; i < ca.length; i++) 
  	{
  		var c = ca[i];
  		while (c.charAt(0) == ' ') 
  		  c = c.substring(1, c.length);
  
  		if (c.indexOf(nameEQ) == 0)
  		  return c.substring(nameEQ.length, c.length);
  	}
  	return null;
  }
  
  function rad2deg(rad)
  {
    return rad * 180 / Math.PI;
  };
  
  function deg2rad(deg)
  {
    return deg * Math.PI / 180;
  };
  
  function roundTo(number, places)
  {
    // Rounds the given number to the specifed number of decimal places.
    //  Note that this is similar to the JS numer.toFixed(), but will accept a negative places parm,
    //  which some browsers will not for toFixed().
    //
    //  Examples: roundTo(3.1415926535, 4)  = 3.1416
    //            roundTo(314159.26535, -4) = 310000
    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
  };
  
  function sign(number)
  {
    if (number > 0)
      return 1;
    else
      return -1;
  };
  
  function zeroPad(number, len)
  {
    // Left-pad the given number with zeros into a string of the given length.
    //
    //  Notes:  - Input must be >= 0.
    //          - Length is to the left of the deciml, so zeroPad(2.17, 3) => 002.17
  
    var padding = '00000000000000000000000000000000000000000000000000000000000000000000';
    
    if (number <= 0)
      return padding.substring(0, len);
    else
      return padding.substring(0, len - (Math.floor(Math.log(number)/Math.log(10)) + 1)) + String(number);
  };
  
  function numberFormat(number, places)
  {
    // Format the given number as a string with the supplied number of decimal places
    //
    //  Example:  numberFormat(45.3, 2) => '45.30'
    
    if (places == undefined)
      places = 2;
  
    return number.toFixed(places);// Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
  }
  
  function cookieDate(date)
  {
    // Return a date/time string in the format expected by document.cookie: Wdy, DD-Mon-YY HH:MM:SS GMT
    switch (date.getUTCDay())
    {
      case 0: {result = 'Sun'; break;}
      case 1: {result = 'Mon'; break;}
      case 2: {result = 'Tue'; break;}
      case 3: {result = 'Wed'; break;}
      case 4: {result = 'Thu'; break;}
      case 5: {result = 'Fri'; break;}
      case 6: {result = 'Sat'; break;}
    } 
    
    result += ', ' + zeroPad(date.getUTCDate(), 2);
  
    switch (date.getUTCMonth())
    {
      case 0:  {result += '-Jan-'; break;}
      case 1:  {result += '-Feb-'; break;}
      case 2:  {result += '-Mar-'; break;}
      case 3:  {result += '-Apr-'; break;}
      case 4:  {result += '-May-'; break;}
      case 5:  {result += '-Jun-'; break;}
      case 6:  {result += '-Jul-'; break;}
      case 7:  {result += '-Aug-'; break;}
      case 8:  {result += '-Sep-'; break;}
      case 9:  {result += '-Oct-'; break;}
      case 10: {result += '-Nov-'; break;}
      case 11: {result += '-Dec-'; break;}
    } 
  
    result += String(date.getUTCFullYear()).substr(2, 2) + ' ' +
              zeroPad(date.getUTCHours(), 2) + ':' +
              zeroPad(date.getUTCMinutes(), 2) + ':' +
              zeroPad(date.getUTCSeconds(), 2) + ' GMT';
              
    return result;
  };
  
  function formatDate(date, options)
  {
    // Convert a date as a string with format "YYYY/MM/DD".
    // Options:
    //  delimiter - string, default '/'. Supply as '' to suppress.
    //  offset    - minutes offset from GMT. Integer, defaults to machine local time offset.
  
    if (typeof(options) == 'string')
    {
      // Backwards-compatibility
      var delimiter = options;
      options = new Array();
      options.delimiter = delimiter;
    }
    else if (!options)
      options = new Array();
  
    if (options.delimiter == undefined)
      options.delimiter = '/';  // default delimiter
      
    if (options.offset != undefined)
      date = new Date(Number(date) + (date.getTimezoneOffset() - options.offset) * 60 * 1000);
      
    // Year is easy.
    var result = String(date.getFullYear()) + options.delimiter;
  
    // Month and day are a bit more hassle, just because I need to pad it with 0.
  
    // Months are funny because JS treats them as 0-based
    result += zeroPad(date.getMonth() + 1, 2) + options.delimiter;
  
    // Days are, more intuitively, 1-based
    result += zeroPad(date.getDate(), 2);
  
    return result;
  };
  
  function formatTime(date, options)
  {
    // Convert a date to a string with format "HH:MM[:SS]"
    // Options:
    //  delimiter - string, default ':'. Supply as '' to suppress.
    //  offset    - minutes offset from GMT. Integer, defaults to machine local time offset.
    //  seconds   - whether to include the seconds field. Boolean, default true.
    //  military  - true (default) => '22:37', false => '10:37 PM'
    //  padHours  - true => '03:42', false => '3:42'. Default is equal to 'military' option.
  
    if (typeof(options) == 'string')
    {
      // Backwards-compatibility
      var delimiter = options;
      options = new Array();
      options.delimiter = delimiter;
    }
    else if (!options)
      options = new Array();
    
    if (options.delimiter == undefined)
      options.delimiter = ':';  // default delimiter
  
    if (options.offset != undefined)
      date = new Date(Number(date) + (date.getTimezoneOffset() - options.offset) * 60 * 1000);
  
    if (options.seconds == false)
      // Add 29.999 seconds to round to the nearest minute
      date = new Date(Number(date) + 29999);
  
    // Hours
    if (options.military == false)
    {
      if (date.getHours() == 0)
        var hour = 12;
      else if (date.getHours() <= 12)
        var hour = date.getHours();
      else
        var hour = date.getHours() - 12;
  
      if (options.padHours == true)
        result = zeroPad(hour, 2);
      else
        result = hour;
    } 
    else
    {
      if (options.padHours == false)
        result = date.getHours();
      else
        result = zeroPad(date.getHours(), 2);
    }
     
    // Minutes
    result += options.delimiter + zeroPad(date.getMinutes(), 2);
  
    // Seconds
    if (options.seconds != false)
      result += options.delimiter + zeroPad(date.getSeconds(), 2);
  
  
    if (options.military == false)
    {
      if (date.getHours() < 12)
        result += ' AM';
      else
        result += ' PM';
    }
  
    return result;
  };
  
  function formatDelta(milliseconds)
  {
    // Generate a string describing the amount of time between two timestamps
    // 
    //  Typically called as formatDelta(time2 - time1)
  
    var minutes = Math.round(Math.abs(milliseconds) / (60 * 1000));
    
    if (minutes == 1)
    {
      var result = '1 minute';
    }
    else if (minutes <= 60)
    {
      var result = minutes + ' minutes';
    }
    else
    {
      var hours = Math.floor(minutes / 60);
      minutes = (minutes % 60);
      
      if (hours < 24)
        var result = hours + 'h, ' + minutes + 'm';
      else
        var result = Math.floor(hours / 24) + 'd, ' + (hours % 24) + 'h, ' + minutes + 'm';
    }
    
    return result;
  };
  
  function validEMail(test)
  {
    var regExp = new RegExp('[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+' +
                            '@' +
                            '[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.' +
                            '[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+');
    return (test.search(regExp) > -1);
  };
  
  function getTop(element)
  {
    if (element.offsetParent)
      return element.offsetTop + getTop(element.offsetParent);
    else
      return element.offsetTop;
  };
  
  function getLeft(element)
  {
    if (element.offsetParent)
      return element.offsetLeft + getLeft(element.offsetParent);
    else
      return element.offsetLeft;
  };
  
  // Two generic routines to return the value of a form field
  
  function valueOfField(element, form)
  {
    var n;
  
    if (!element)
      return null;
  
    if (!form)
    {
      for (n = 0; n < document.forms.length; n++)
        if (element == document.forms[n].elements[element.name])
        {
          form = document.forms[n];
          break;
        }
    }
    if (!form)
      return null;
    
    var type = element.type;
    
    if (!type &&
        (element.length > 0))
    {
      for (n = 0; n < element.length; n++)
        if (element[n].checked)
          return element[n].value;
    }
    else
    switch (type)
    {
      case 'button':
      case 'file':
      case 'hidden':
      case 'password':
      case 'reset':
      case 'submit':
      case 'text':
      case 'textarea':
        return element.value;
  
      case 'checkbox':
        if (element.checked)
          return element.value;
        else
          return null;
  
      case 'radio':
      {
        var radios = document.getElementsByName(element.name);
        for (n = 0; n < radios.length; n++)
          if (radios[n].checked)
            return radios[n].value;
  
        return null;
      }
  
      case 'select':
      case 'select-one':
      {
        n = element.selectedIndex;
        if ((n >= 0) &&
            (n < element.length))
          return element.options[n].value;
        else
          return null;
      } 
    }
  
    return null;
  };
  
  function valueByName(fieldName, form)
  {
  
    var element;
    var n;
    
    if (form)
      element = form.elements[fieldName];
    else
    {
      for (n = 0; n < document.forms.length; n++)
      {
        element = document.forms[n].elements[fieldName];
        if (element)
        {
          form = document.forms[n];
          break;
        }
      }
    }
  
    return valueOfField(element, form);
  };
  
  function validCC(cardType, cardNumber)
  {
    // Perform checkdigit and checksum validation on a card number
  
    var useAlternate;
    var digit;
    var digitSum = 0;
    var prefix;
  
    if (!cardType || !cardNumber)
      return false;
    
    //	Should be just numeric digits.  Reject if not.
    if (isNaN(Number(cardNumber)))
      return false;
    
    // Validate number length and prefix
    switch (cardType)
    {
      case 'CA':
      case 'MC':
      {
        // MasterCard
        if (cardNumber.length != 16)
          return false;
    
        prefix = parseInt(cardNumber.slice(0, 2), 10);
        if ((prefix < 51) || (prefix > 55))
          return false;
  
        break;
      }
  
      case 'VI':
      {
        // Visa
        if ((cardNumber.length != 13) && (cardNumber.length != 16))
          return false;
    
        prefix = cardNumber.charAt(0);
        if (prefix != '4')
          return false;
  
        break;
      }
  
      case 'AX':
      {
        // Amex
        if (cardNumber.length != 15)
          return false;
    
        prefix = cardNumber.slice(0, 2);
        if ((prefix != '34') && (prefix != '37'))
          return false;
  
        break;
      }
  
      case 'DS':
      {
        // Discover
        if (cardNumber.length != 16)
          return false;
    
        prefix = cardNumber.slice(0, 4);
        if (prefix != '6011')
          return false;
  
        break;
      }
  
      case 'DI':
      case 'DC':
      case 'CB':
      {
        // Diners Club / Carte Blanche
        if (cardNumber.length != 14)
          return false;
    
        prefix = parseInt(cardNumber.slice(0, 3))  ;
        if ((prefix < 300) || (prefix > 305))
        {
          prefix = cardNumber.slice(0, 2);
          if ((prefix != '36') && (prefix != '38'))
            return false;
        }
  
        break;
      }
    }
  
    //	Determine (from length and card type) if this number should use the 
    //  alternate first-digit processing method.
    if ((cardNumber.length == 16) || (cardNumber.length == 14))
      useAlternate = true;
    
    else if ((cardNumber.length == 13) || (cardNumber.length == 15))
      useAlternate = false;
    
    else
      //	Other lengths are invalid
      return false;
    
    //	Sum loop
    for (i = 0; i < cardNumber.length; i++)
    {
      digit = parseInt(cardNumber.charAt(i));
      
      if (isNaN(digit))
        return false;
      
      if (useAlternate)
      {
        //	Alternate-digit processing
        digit = digit * 2;
        
        if (digit >= 10)
          digit = Math.floor(digit / 10) + (digit % 10);
      }
      useAlternate = !useAlternate;
    
      digitSum += digit;
    }
    
    //	Check the sum
    if ((digitSum % 10) > 0)
      return false;
    
    //	Sum OK
    return true;
  };
  
  function windowHeight()
  {
    var myHeight = 0;
    if (typeof(window.innerWidth) == 'number') 
    {
      //Non-IE
      myHeight = window.innerHeight;
    } 
    else if (document.documentElement && 
             (document.documentElement.clientWidth || document.documentElement.clientHeight)) 
    {
      //IE 6+ in 'standards compliant mode'
      myHeight = document.documentElement.clientHeight;
    } 
    else if (document.body && 
             (document.body.clientWidth || document.body.clientHeight)) 
    {
      //IE 4 compatible
      myHeight = document.body.clientHeight;
    }
    
    return myHeight;
  };
  
  function windowWidth()
  {
    var myWidth = 0;
    if (document.documentElement && 
             (document.documentElement.clientWidth || document.documentElement.clientHeight)) 
    {
      // IE 6+ in 'standards compliant mode', among others
      myWidth = document.documentElement.clientWidth;
    } 
    else if (document.body && 
             (document.body.clientWidth || document.body.clientHeight)) 
    {
      // IE 4 compatible
      myWidth = document.body.clientWidth;
    }
    else if (typeof(window.innerWidth) == 'number') 
    {
      // Older non-IE
      myWidth = window.innerWidth;
    } 
  
    return myWidth;
  };
  
  function elementWidth(element)
  {
    if (element.innerWidth)
    	return element.innerWidth;
    else
      return element.clientWidth;
  };
  
  function elementHeight(element)
  {
    if (element.innerHeight)
    	return element.innerHeight;
    else
      return element.clientHeight;
  };
  
  function setOpacity(div, opacity)
  {
    if (!div)
      return;
  
    opacity = limit(opacity, 0, 100);
    
    if (typeof(div.style.filter) == 'string')
      div.style.filter = 'alpha(opacity:' + opacity + ')';
  
    if (typeof(div.style.KHTMLOpacity) == 'string')
      div.style.KHTMLOpacity = opacity / 100;
  
    if (typeof(div.style.MozOpacity) == 'string')
      div.style.MozOpacity = opacity / 100;
  
    if (typeof(div.style.opacity) == 'string')
      div.style.opacity = opacity / 100;
  };
  
  function getScrollXY() 
  {
    // Cross-browser function that returns the scroll postion of the window.
    // From http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }
    return {x: scrOfX, y: scrOfY};
  };
  
  function smoothScrollTo(y)
  {
    var scrollPos = getScrollXY();
    if (scrollPos.y > y)
    {
      window.scrollBy(0, -5);
      setTimeout('smoothScrollTo(' + y + ')', 3);
    }
  };
  
  function isWithin(descendant, ancestor)
  {
    if (!descendant.parentNode)
      return false;
    else if (descendant.parentNode == ancestor)
      return true;
    else
      return isWithin(descendant.parentNode, ancestor)
  };
  //]]>
  
  // JS 3: DAYLIGHT.js
  /*
  
    daylight.js
    
    JavaScript interface to the DaylightMap.com tile server
    
    Copyright 2006-8 Udell Enterprises, Inc
    
    
    Free for low-traffic use. For more than 20,000 hits/month, see price
    guide at www.daylightmap.com/services.php
    
    
    Instructions for use:
    
    First, add the following line to the <head> section of your HTML:
  
      <script src="http://www.daylightmap.com/daylight_packed.js" 
              type="text/javascript"></script>
  
    Then in your JavaScript, after initializing your version 2 Google Map (using a 
    statement like map = new GMap2(document.getElementById('map'));), add the 
    following two lines of code:
    
        var daylight = new daylightMap.daylightLayer();
        daylight.addToMap(map);
    
    obviously, changing "map" to match your own GMap2 object name as needed. Note 
    also that this needs to occur before the first call to map.setCenter() in 
    your code.
    
    You can also add the daylight layer to a single map type (such as Satellite 
    or Hybrid) if desired by using
    
        daylight.addToMapType(G_SATELLITE_MAP);
    
    instead of the addToMap method. Any valid GMapType should work as a parameter.
    
    The daylightLayer object has the following properties you may find useful:
    
    when
        Date/time of the daylight plot. Type: Date. Default: current date/time
  
    opacity
        Effectively, the "darkness" of the shadow, where 0 is fully transparent (and 
        hence invisible) and 1 is fully opaque. Type: Numeric. Default: 0.5 for map 
        view, 0.8 for satellite/hybrid
  
    active
        Whether the daylight layer is displayed when the map is redrawn. Type: 
        Boolean. Default: true 
  
    cityLights
        Whether city lights are displayed on the night side. Type: Boolean. Default: 
        true
  
  */
  
  var daylightMap = window.daylightMap || {};
  
  daylightMap._nTileSize = 256;  /* Note: GMaps does not support other tile sizes (as of v2.38, 2 Mar 06) */
  daylightMap._maxZoom = 20;
  daylightMap._defaultMapOpacity = 0.5;
  daylightMap._defaultSatelliteOpacity = 0.75;
  daylightMap._nightMode = false;
  
  // Init the pixel/degree array 
  daylightMap._pixelsPerLonDegree = [];
  do {
    daylightMap._pixelsPerLonDegree.push(daylightMap._nTileSize * Math.pow(2, daylightMap._pixelsPerLonDegree.length) / 360);
  } while (daylightMap._pixelsPerLonDegree.length < daylightMap._maxZoom);
  
  if (location.hostname == 'dev.daylightmap.com')
    daylightMap._serverDomain = 'http://dev.daylightmap.com/';
  else
    daylightMap._serverDomain = 'http://www.daylightmap.com/';
  
  daylightMap._clientTime = Number(new Date());
  daylightMap._serverTime = daylightMap._clientTime;
  //document.write('<script src="' + daylightMap._serverDomain + 'tiles/current_unix_time.php?rand=' + Math.random() + '" type="text/javascript"></script>');
  daylightMap._timeCorrection = 0;
  
  function roundTo(number, places)
  {
    // Rounds the given number to the specified number of decimal places.
    //  Note that this is similar to the JS number.toFixed(), but will accept a negative places parm,
    //  which some browsers will not for toFixed().
    //
    //  Examples: roundTo(3.1415926535, 4)  = 3.1416
    //            roundTo(314159.26535, -4) = 310000
    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
  };
  
  
  daylightMap.daylightLayer = function()
  {
    // daylightLayer object constructor
  
    this.map = null;
  
    // Set default values for major properties
    this.when = null;
    this.opacity = 0.8;
    this.active = true;
    this.cityLights = true;
  
    // Internal properties
    this.lastZoom = -1;
    this.lastRefresh = null;
  
    // These properties are required by GMaps
    this.isPng = function() {return true;};
    this.projection = new GMercatorProjection(daylightMap._maxZoom);
  
    daylightMap._timeCorrection = (daylightMap._serverTime - daylightMap._clientTime);
  };
  
  // Compatibility 
  
  if ( GMap2 && GMap2.length ) {
      daylightMap.daylightLayer.prototype = new GTileLayer(new GCopyrightCollection(''), 0, daylightMap._maxZoom);
  } else { alert('crap!'); }
    // window.GMap2 &&
      //GMap2.length)
    // Looks like we're running in the main Maps API, not as a mapplet
  
  if (!window.daylightLayer)
    // Backward compatibility with pre-namespace versions of DM
    window.daylightLayer = daylightMap.daylightLayer;
  
  // daylightLayer methods
  
  daylightMap.daylightLayer.prototype.setMap = function()
  {
    try {
      if (!this.map)
        this.map = map; // try for a commonly-named global var
    } catch (e) {}
    
    return this.map;
  };
  
  
  
  daylightMap.daylightLayer.prototype.getOpacity = function()
  {
    if (this.opacity != null)
      // Opacity as been overridden to a specific value
      result = parseFloat(this.opacity);
    else
    {
      // Otherwise, default opacity is adaptive
      if (this.setMap())
      {
        if ((this.map.getCurrentMapType() == G_SATELLITE_MAP) ||
            (this.map.getCurrentMapType() == G_HYBRID_MAP))
          result = daylightMap._defaultSatelliteOpacity;
        else
          result = daylightMap._defaultMapOpacity;
      }
      else
      {
        if (this.getCityLights())
          result = daylightMap._defaultSatelliteOpacity;
        else
          result = (daylightMap._defaultSatelliteOpacity + daylightMap._defaultMapOpacity) / 2;
      }
    }
  
    return result.toPrecision(2);  // there's no need for any greater precision than this
  };
  
  daylightMap.daylightLayer.prototype.getCityLights = function(mapType)
  {
    if (this.cityLights == false)
      // City lights have been specifically turned off
      return false;
    
    else if (this.cityLights == true)
      // City lights have been specifically turned on
      return true;
  
    else
    {
      // Default cases
  
      if (!this.setMap())
        return true;
        
      if (!mapType)
        mapType = this.map.getCurrentMapType();
        
      if (daylightMap._nightMode)
        return true;
      else if ((this.map.getCurrentMapType() == G_SATELLITE_MAP) ||
               (this.map.getCurrentMapType() == G_HYBRID_MAP))
        // City lights default to on for satellite-based views 
        return true;
      else
        // City lights default to off for map views
        return false;
    }
  };
  
  daylightMap.daylightLayer.prototype.addToMap = function(newMap)
  {
    // Add the daylight layer to the supplied GMap2 object
    this.map = newMap;
    this.map.zoom = 1;
    //this.map.minZoom = 1;
    //this.map.maxZoom = 1;
    this.map.addControl(new GLargeMapControl());
    //this.map.disableDefaultUI = false;
    var types = this.map.getMapTypes();
    //var options = {
    //  zoom: 2,
    //  minZoom: 2,
    //  //mapTypeId: google.maps.MapTypeId.SATELLITE,
    //  disableDefaultUI: true
    //}
    //this.addToMapType(types[0]);
  
    for (var i = 0; i < types.length; i++)
      this.addToMapType(types[i]);
  };
  
  daylightMap.daylightLayer.prototype.addToMapType = function(mapType)
  {
    // Add the daylight layer to a single map type (like G_SATELLITE_MAP)
    mapType.getTileLayers().splice(1, 0, this);
  
    if (this.getCityLights(mapType))
      mapType.getMaximumResolution = function(){return 8;};
  };
  
  daylightMap.daylightLayer.prototype.refresh = function()
  {
    // Refresh the daylight layer
  
    // This Zoom kludge refreshes all map tiles
    if (this.setMap())
    {
      this.lastZoom = -1;
      this.map.setZoom(this.map.getZoom());
    }
  };
  
  daylightMap.daylightLayer.prototype.getTileUrl = function(point, zoom)
  {
    // Interface to the tile server
    //  tile_n_2_0_0_1178264700.png
    //  night_4_1_8.png
  
    if (!this.active)
      return '';
  
    if (daylightMap._nightMode)
      var tileName = 'tiles/night_png/night_';
    else
    {
      var tileName = 'tiles/cache/tile_';
  
      if (this.getCityLights())
        tileName += 'n_';
    }
  
    tileName += zoom + '_' + point.x + '_' + point.y;
    
    if (!daylightMap._nightMode)
    {
      // Establish the date/time to send
      if (this.when != null) {
        var timestamp = this.when;
        tileName += '_' + (timestamp.getTime() / 1000);
      } else {
        if (zoom != this.lastZoom) {
          if (daylightMap._timeCorrection == 0)
            daylightMap._timeCorrection = (daylightMap._serverTime - daylightMap._clientTime);
    
          // Using current date/time - Round it to the nearest minute and correct to server time
  //        this.lastRefresh = new Date(60000 * ((Number(new Date()) + daylightMap._timeCorrection) / 60000).toFixed(0));
          this.lastRefresh = new Date(Number(new Date()) + daylightMap._timeCorrection);
          this.lastZoom = zoom;
        }
        
        var timestamp = this.lastRefresh;
  //
  //    // Use some rounding based on zoom level to improve caching of tiles
  //    timestamp = roundTo(Number(timestamp) / 1000, Math.min(0, zoom - 3));
  //
  //    tileName += '_' + timestamp;
  	  tileName += '_' + zeroPad(timestamp.getUTCHours()) + zeroPad(Math.floor(timestamp.getUTCMinutes() / 5) * 5); // truncate to 5-minute interval 
      }
    }
  
    tileName = daylightMap._serverDomain + tileName + '.png';
  
    if (typeof _IG_GetImageUrl == 'function')
      return _IG_GetImageUrl(tileName);
    else
      return tileName;
  };
  
  zeroPad = function (number) {
  	if (number < 10)
  		return '0' + number;
  	else
  		return number.toString();
  };
  
  // JS 4: INDEX.js
  
  /*
    daylightmap.com/index.js
    Copyright 2006 Udell Enterprises, Inc
  */
  
  var map;
  var title;
  var mapDiv;
  var mainDiv;
  var titleDiv;
  var optionsDiv;
  var flagDiv;
  var optionsBtn;
  var monthSelect;
  var daySelect;
  var hourSelect;
  var minuteSelect;
  var selector;
  var markerStyle;
  var placer = new Array(2);
  var saveCbx;
  var meridians;
  
  var daylight;
  var clickMarker = null;
  var expanded = false;
  var flagsShown = false;
  var clicking = false;
  var timerId = null;
  var _refreshInterval = 2 * 60 * 1000;
  var currentTimezone;
  var _iconColors = new Array(
    'red', 'orange', 'blue', 'gray', 'brown', 'purple', 'white', 'green', 'yellow', 'black'
  );
  var _maxPoints = _iconColors.length;
  var _maxLat = 85.0511287798066;
  var icons = new Array(_maxPoints);
  var clockIcons = {digital: null, analog: null};
  var points = new Array();
  var nextId = 0;
  var selected = null;
  var _loading = 'Loading...';
  var shownInstructions = false;
  var hideChrome = false;
  var panControl;
  var typeControl;
  var scaleControl;
  var sunIcon;
  var sunMarker = null;
  var sunOnMap = false;
  var sunCoords = false;
  var cookieExpire = cookieDate(new Date(Number(new Date()) + 90 * _mSecPerDay));
  var refreshing = false;
  var tooltip = false;
  
  addEventHandler(window, 'load',     init);addEventHandler(window, 'unload',   GUnload);
  GMap2.prototype.fromLatLngToContainerPixel = function (coords) {
     var originPixel = this.fromLatLngToDivPixel(this.fromContainerPixelToLatLng(new GPoint(0, 0)));
     var targetPixel = this.fromLatLngToDivPixel(coords);
     return new GPoint(targetPixel.x - originPixel.x, targetPixel.y - originPixel.y);
  };
  
  GLatLng.prototype.directionFrom = function (other)
  {
    // Returns the shortest direction from the other lat/lon coords to this one, either
    //  1 = East
    //  0 = Same Longitude
    // -1 = West
  
    if (other.lng() == this.lng()) {
      return 0;
    } else {
      var difference = other.lng() - this.lng()
      while (Math.abs(difference) > 180) {
        if (difference > 0)
          difference -= 360;
        else
          difference += 360;
      }
  
      if (difference > 0)
        return 1;
      else
        return -1;
    }
  };
  
  //  A Point of Interest is mostly a wrapper for a marker that the user places on the map.
  function pointOfInterest(name, coords) {
    // Assign the next available point ID to this one, and increment for next time.
    this.id = nextId++;
  
    // Init time-related properties
    this.tzOffset = null;
    this.sunrise  = null;
    this.sunset   = null;
  
    if (!daylightMap._nightMode) {
      // Create the GMap marker itself
      this.coords = coords;
      var listImage = this.setIcon();
    
      // Additional setup is done by other methods
      this.setName(name);
      this.retrieveInfo();
    }
  };
  
  pointOfInterest.prototype.setIcon = function() {
    if (this.marker)
      map.removeOverlay(this.marker);
  
    var icon = getIcon();
    this.marker = new GMarker(this.coords, {icon: icon, draggable: true});
  
    // Assign event handlers
    var thisId = this.id;
    GEvent.addListener(this.marker, 'click', function(){showPointInfo(thisId)});
    GEvent.addListener(this.marker, 'dragend', function(){markerMoveEnd(thisId)});
  
    // Add the marker to the map
    map.addOverlay(this.marker);
    this.marker.disableDragging();
  
    // Add this point to the list in the Options bar
  
    var gifImage = icon.image;
    if (gifImage.indexOf('/clock/') == -1)
      gifImage = gifImage.replace('png', 'gif');
  
    return gifImage;
  };
  
  pointOfInterest.prototype.setName = function(name)
  {
    // Assign a name to this point
  
    document.getElementById('name_' + this.id).innerHTML = name;
    this.name = name;
    
    setTimeout('makeLink()', 10);
  };
  
  pointOfInterest.prototype.refreshInfo = function()
  {
    // Refresh the time data for this point
    this.tzOffset = null;
    this.sunrise  = null;
    this.sunset   = null;
    
    if (selected == this.id)
      this.showInfo();
      
    this.retrieveInfo();
  };
  
  pointOfInterest.prototype.retrieveInfo = function() {
    // Retrieve the point's time data from the server
    try {  
      var infoURL = '/point_info.php'
                  + '?nPointID=' + this.id
                  + '&fLatitude=' + this.marker.getPoint().lat()
                  + '&fLongitude=' + this.marker.getPoint().lng()
                  + '&dtmWhen=' + Number(getWhen()) / 1000
                  + '&nMapOffset=' + getMapOffset();
    
      if (!this.infoRequest)
        this.infoRequest = new xmlRequestor;
    
      // The explicit Function object for onreadystatechange was the most straightforward
      // way I could find to pass this point's ID to the event handler.
      this.infoRequest.open('GET', infoURL, true);
      this.infoRequest.onreadystatechange = new Function("parsePointInfo(" + this.id + ")");
      this.infoRequest.send(null);
    } catch (e) {
      // TODO: handle exception
    }
  };
  
  pointOfInterest.prototype.displayTime = function(when) {
    // Format a time value for display, including date if not today
  
    var primaryDate = new Date(Number(getWhen()));
    var targetDate = new Date(Number(when) + (getWhen().getTimezoneOffset() + this.tzOffset * 60) * 60 * 1000);
  
    if (targetDate.getDate() == primaryDate.getDate())
      var timeAdj = '';
    else
      var timeAdj = ', ' + targetDate.toString().substr(0, 10);
  
    return formatTime(when, this.timeOptions) + timeAdj;
  };
  
  pointOfInterest.prototype.localTime = function() {
    // Returns the local time for this point, formatted for display
    if (this.infoError)
      return 'Error';
    else if (this.tzOffset == null)
      return _loading;
    else {
      var result = this.displayTime(getWhen()) + ' (GMT' + displayOffset(this.tzOffset);
      result += ')';
      return result;
    }
  };
  
  pointOfInterest.prototype.showInfo = function() {
    // Display a GMap InfoWindow for this point
    // Format sunrise time for display
    if (this.infoError || !this.sunrise)
      return;
    else {
      if (this.sunrise > getWhen())
        var untilSunrise = formatDelta(this.sunrise - getWhen()) + ' ' + l10n.from_now;
      else
        var untilSunrise = formatDelta(this.sunrise - getWhen()) + ' ' + l10n.ago;
      
      untilSunrise = this.displayTime(this.sunrise) + ' (' + untilSunrise + ')';
    }    
  
    // Ditto for sunset
    if (this.infoError || !this.sunset)
      return;
    else {
      if (this.sunset > getWhen())
        var untilSunset = formatDelta(this.sunset - getWhen()) + ' ' + l10n.from_now;
      else
        var untilSunset = formatDelta(this.sunset - getWhen()) + ' ' + l10n.ago;
      
      untilSunset = this.displayTime(this.sunset) + ' (' + untilSunset + ')';
    }    
  
    // And length of daylight (or night, as appropriate)
    if (!this.sunrise || !this.sunset)
      return;
    else {
      var dayLength = (this.sunset - this.sunrise);
  
      if (dayLength < -_mSecPerDay)
        // Arctic night
        dayLength = l10n.length_night + ': ' + formatDelta(this.sunrise - this.sunset);
      else
      {
        if (this.sunset > this.sunrise)
          dayLength = l10n.length_day + ': ' + formatDelta(this.sunset - this.sunrise);
        else
          dayLength = l10n.length_day + ': ' + formatDelta(_mSecPerDay - (this.sunrise - this.sunset));
      }
    }
    
    var locationHTML =
      '<div id="info_window">' +
        '<h4>' +
          '<span id="info_name_' + this.id + '" ' +
                'onclick="renamePoint(' + this.id + ', \'info\')">' + this.name + '</span>' +
        '</h4>' +
        '<p class="info_line" id="lat_lon">' + this.latLon() + '</p>' + 
        '<p class="info_line">' + l10n.local_time + ': ' + this.localTime() + '</p>' +
        '<p class="info_line">' + l10n.sunrise + ': ' + untilSunrise + '</p>' +
        '<p class="info_line">' + l10n.sunset + ': ' + untilSunset + '</p>' +
        '<p class="info_line">' + dayLength + '</p>' +
        '<p class="info_line tools">' +
          '<a href="/" onClick="movePoint(' + this.id + '); return false">' + l10n.move + '</a> &middot; ' + 
          '<a href="/" onClick="renamePoint(' + this.id + '); return false">' + l10n.rename + '</a> &middot; ' + 
          '<a href="/" onClick="deletePoint(' + this.id + '); return false">' + l10n['delete'] + '</a>' + 
        '</p>' +
      '</div>';
  
    this.marker.openInfoWindowHtml(locationHTML);
  
    if (tooltip)
      tooltip.hide();
  
    setTimeout('selectList(' + this.id + ')', 1);
  };
  
  pointOfInterest.prototype.latLon = function()
  {
    // Format the point's coordinates for display
    var coords = this.marker.getPoint();
    var latLon = '';
    
    latLon += Math.abs(coords.lat()).toFixed(6) + '&deg; ';
    if (coords.lat() < 0)
      latLon += l10n.s;
    else
      latLon += l10n.n;
    
    latLon += ', ' + Math.abs(coords.lng()).toFixed(6) + '&deg; ';
    if (coords.lng() < 0)
      latLon += l10n.w;
    else
      latLon += l10n.e;
      
    return latLon;
  };
  
  function getPoint(id) {
    // Utility function to return the point object for the given ID
    for (var n = 0; n < points.length; n++)
      if (points[n].id == id)
        return points[n];
  
    return null;
  };
  
  function wheelZoom(event) {
    if (event.cancelable)
      event.preventDefault();
   
    if ((event.detail || -event.wheelDelta) < 0)
      map.zoomIn()
    else
      map.zoomOut();
  
    return false;
  }
  
  
  function init()
  {
    // Main routine to set up the map, etc.
    
    // Init HTML element pointers for later use
    mapDiv         = document.getElementById('map');
    mainDiv        = document.getElementById('main');
    titleDiv       = document.getElementById('title');
    flagDiv        = document.getElementById('flag');
    monthSelect    = document.getElementById('month');
    daySelect      = document.getElementById('day');
    hourSelect     = document.getElementById('hour');
    minuteSelect   = document.getElementById('minute');
    selector       = document.getElementById('selector');
    saveCbx        = document.getElementById('save');
    placer[0]      = document.getElementById('placer_outer');
    placer[1]      = document.getElementById('placer_inner');
    meridians      = document.getElementById('meridians');
    markerStyle    = document.getElementById('marker_style');
  
    clockIcons.analog = new GIcon();
    clockIcons.analog.image            = '/clock/analog_blank.png';
    clockIcons.analog.iconSize         = new GSize(31, 31);
    clockIcons.analog.iconAnchor       = new GPoint(15, 15);
    clockIcons.analog.infoWindowAnchor = new GPoint(23, 10);
  
    clockIcons.digital = new GIcon();
    clockIcons.digital.image            = '/clock/digital_blank.png';
    clockIcons.digital.iconSize         = new GSize(39, 18);
    clockIcons.digital.iconAnchor       = new GPoint(18, 9);
    clockIcons.digital.infoWindowAnchor = new GPoint(19, 2);
  
    document.cookie = 'cookies_enabled=1';
    if (document.cookie.search('cookies_enabled=1') == -1)
      // Browser appears to have persistent cookies disabled
      saveCbx.checked = false;
  
    if (titleDiv)
    {
      // Browser-specific fixes for title image peccadilloes
      if (navigator.appName == 'Microsoft Internet Explorer')
        fixPNG(document.getElementById('title_img'));
      else if (navigator.appName == 'Netscape')
        document.getElementById('title_nav').style.top = '30px';
    }
  
    // Init the base time zone
    if (!initTimezone) {
      initTimezone = - (new Date().getTimezoneOffset()) / 60;
      //syncTimezone(initTimezone);
    }
  
    currentTimezone = initTimezone;
  
    if (GBrowserIsCompatible()) {
      // These event handlers set up the screen layout
      //windowResize();
      document.onkeypress = keyHandler;
      
      // Init the map object itself
      mapDiv = document.getElementById('map');
      map = new GMap2(mapDiv, {mapTypes: [G_NORMAL_MAP, G_PHYSICAL_MAP, G_SATELLITE_MAP, G_HYBRID_MAP]});
      map.enableDoubleClickZoom();
  
      // Map events
      GEvent.addListener(map, 'click',           mapClick);
      GEvent.addListener(map, 'move',            mapMove);
      GEvent.addListener(map, 'moveend',         mapMoveEnd);
      GEvent.addListener(map, 'infowindowopen',  infoWindowOpen);
      GEvent.addListener(map, 'maptypechanged',  makeLink);
  
      // Init the day/night display
      daylight = new daylightMap.daylightLayer();
      daylight.active = false;
      daylight.addToMap(map);
  
      // Add standard map controls
      panControl   = new GLargeMapControl();
      typeControl  = new GMapTypeControl();
      scaleControl = new GScaleControl();
      map.addControl(typeControl);
      map.addControl(scaleControl);
      if (titleDiv)
        map.addControl(panControl, new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(10, 70)));
      else
        map.addControl(panControl);
  
      // Adjust initial zoom to best-fit the world map into the browser window
      if (initZoom == null) {
        if ((mapDiv.offsetWidth * 1.1) > 360 * daylightMap._pixelsPerLonDegree[2])
          initZoom = 2;
        else
          initZoom = 1;
  
        if (daylightMap._nightMode)
          initZoom++;
      }
  
      // Init the map display
      map.setCenter(new GLatLng(initLat, initLon), initZoom, initType);
  	
    map.addControl(new GSmallMapControl());
  	marker1 = new GMarker( (new GLatLng(34.470958, -117.259641)), {title:"Sol Focus Victor Valley Community College"});
  	marker1.clickable = true;
  	map.addOverlay(marker1);
  
  	// Add event for clicking the marker
  	GEvent.addListener(marker1, "click", function()  {
  		var opt={
  			zoom: 13,
  			center: location
  		}
  		map.setCenter((marker1.getLatLng()), 13);
  	
  		});
      
      if (!daylightMap._nightMode) {
        // Create the sun-position marker
        sunIcon = new GIcon();
        sunIcon.image = '/images/sun.png';
        sunIcon.iconSize = new GSize(25, 25);
        sunIcon.iconAnchor = new GPoint(12, 12);
        sunMarker = new GMarker(new GLatLng(90, 0), {icon: sunIcon, clickable: false});    
      }
  
      // Set up any points that were passed into the PHP via cookies or URL parms
      initPoints();
    } else
      alert(l10n.no_gmaps_msg);
  };
  
  	
  function syncAmPm(hour) {
    // Display AM or PM as appropriate for the given hour
    
    var indicator = document.getElementById('am_pm');
    if ((hour == 1) || (hour == 13))
      indicator.innerHTML = '';
    else if (hour < 12)
      indicator.innerHTML = 'AM';
    else
      indicator.innerHTML = 'PM';
  };
  
  function getWhen() {
    // Return the currently-displayed date/time
    if (daylight.when)
      return daylight.when;
    else
      return daylight.lastRefresh;
  };
  
  function getMapOffset()
  {
    // Return the timezone offset of the map display, in hours from GMT
    //if (daylightMap._nightMode)
      return 0;
    //else
    //  return parseInt(valueOfField(tzSelect)) - getWhen().getTimezoneOffset() / 60;
  };
  
  function refreshDaylight()
  {
    // Update the daylight plot
  
    if (refreshing)
      return;
    refreshing = true;
    try
    {
      if (!daylightMap._nightMode)
      {
          var form = document.forms['options_content'];
          //currentTimezone = parseInt(valueOfField(tzSelect, form));
          daylight.when = 
            new Date(Date.UTC(2006, 
                              parseInt(valueOfField(monthSelect, form)), 
                              parseInt(valueOfField(daySelect, form)), 
                              parseInt(valueOfField(hourSelect, form)) - currentTimezone,
                              parseInt(valueOfField(minuteSelect, form)),
                              0, 0));
        //}
        if (points.length == 0)
          sunClick();
      }
      daylight.active = true;
      daylight.refresh();
      // Refresh all point info to match the new time
      for (var n = 0; n < points.length; n++)
        points[n].refreshInfo();
      // Refresh the "Link to this map" URL
      makeLink();
    } catch(error){ }
    refreshing = false;
  };
  
  function autoRefresh(state)
  {
    // Set the map's auto-refresh to the given boolean state
    
    // Turn any existing auto-refresh OFF
    if (timerId)
      window.clearInterval(timerId);
  
    if (state && !daylightMap._nightMode)
    {
      // turn auto-refresh ON
      timerId = window.setInterval('refreshDaylight()', _refreshInterval);
      //document.forms['options_content'].elements['current'].checked = true;
  
      // If needed, refresh the display right now also
      var now = new Date();
      if (now - getWhen() > _refreshInterval)
        refreshDaylight();
  
  // I don't think this call is needed? SCU, 4 May 06
  //    makeLink();
    }
  };
  
  function windowResize() {
    // Dynamic CSS to make everything fit when the window size changes
    
    winWidth  = windowWidth() - 1;
    winHeight = windowHeight();
  
    mainDiv.style.width = winWidth + 'px';
    
    if (hideChrome)
    {
      if (titleDiv)
        titleDiv.style.display = 'none';
        optionsDiv.style.display = 'none';
      var mapWidth = winWidth;
    }
    else
    {
      if (titleDiv)
        titleDiv.style.display = 'block';
        optionsDiv.style.display = 'block';
      var mapWidth = (winWidth - (121 + optionsDiv.offsetWidth));
    }
  
    if (mapWidth)
    {
      mapDiv.style.width = mapWidth + 'px';
      optionsDiv.style.left = mapWidth + 'px';
      google_ad_width = mapWidth + 'px';
    }
  
    if (winHeight)
    {
      optionsDiv.style.height = (winHeight - 2) + 'px';
  
      if (hideChrome)
      {
        meridians.style.display = 'none';
        var mapHeight = winHeight;
      }
      else
      {
        meridians.style.display = 'block';
  
        var mapHeight = winHeight - meridians.offsetHeight;
  //      mapHeight -= meridians.offsetHeight;
        meridians.style.top = mapHeight + 'px';
      }
    
      mapDiv.style.height = mapHeight + 'px';
    }    
  
    if (expanded &&
        !hideChrome)
    {
      markerList.style.height = (parseInt(mapHeight) - markerList.offsetTop) + 'px';
    }
  };
  
  
  function infoWindowOpen()
  {
    if (titleDiv)
    {
      // Make sure the infowindow isn't obscured by the title div
      
      var infoDiv  = document.getElementById('info_window');
      
      var overlapX = (getLeft(titleDiv) + titleDiv.offsetWidth - getLeft(infoDiv)) + 20;
      var overlapY = (getTop(titleDiv) + titleDiv.offsetHeight - getTop(infoDiv)) + 25;
    
      if ((overlapX > 0) && (overlapY > 0))
        map.panBy(new GSize(0, overlapY));
    }
  };
  
  function mapMove()
  {
    // Refresh the AM/PM display
    refreshMeridians();
  };
  
  function mapMoveEnd()
  {
    // Disallow panning off the maximum latitude that GMap displays
    var center = map.getCenter();
    if (Math.abs(center.lat()) > _maxLat)
      map.setCenter(new GLatLng(_maxLat * sign(center.lat()), center.lng()))
  
    // Refresh the InfoWindow
    if (selected && !refreshing)
      showPointInfo(selected);
  
    // Refresh the "Link to this map"
    makeLink();
  };
  
  function makeLink()
  {
    // Generate and apply the "Link to this map" URL
  
    var cookie = '';
  
    // Start with map center point and zoom level
    var center = map.getCenter();
    var parms = '?lat=' + center.lat().toFixed(6)
              + '&lng=' + center.lng().toFixed(6) 
              + '&z=' + map.getZoom();
  
    // Map type (satellite, hybrid, etc)
    switch (map.getCurrentMapType())            
    {
      case G_SATELLITE_MAP: parms += '&t=s'; break;
      case G_HYBRID_MAP:    parms += '&t=h'; break;
      case G_PHYSICAL_MAP:  parms += '&t=p'; break;
      case G_NORMAL_MAP:    parms += '&t=m'; break;
    }
  
    if (daylightMap._nightMode)
      parms += '&night=1';
    else {
      // Date/time shown  
      var linkDate = getWhen();
      // Sun position    
      document.cookie = 's=;expires=Sunday, 24-Apr-05 00:00:00 GMT';
    }
  
    // Map markers
    
    switch (valueOfField(markerStyle)) {
      case 'analog':  parms += '&m=a'; break;
      case 'digital': parms += '&m=d'; break;
      case 'color':   parms += '&m=c'; break;
    }
  
    for (var n = 0; n < points.length; n++) {
      parms += '&x' + n + '=' + points[n].marker.getPoint().lng().toFixed(6)
             + '&y' + n + '=' + points[n].marker.getPoint().lat().toFixed(6)
             + '&n' + n + '=' + encodeURIComponent(points[n].name);
    }
  
    if (language != '')
      parms += '&hl=' + language
  };
  
  function mapClick(overlay, coords) {
    if (coords && clicking)
      // Map is in "Place marker by click" mode
      placeMarker(coords)
  };
  
  function placeMarker(coords, name) {
    // Create a new Point-of-Interest at the given lat/lon coords, and (optionally) with the given name
  
    hidePlacer();
    
    if (points.length < _maxPoints)
    {
      if (!name)
        // Name not supplied - generate one from the point ID
        name = l10n.marker + ' ' + String(nextId + 1);
  
      // Create the point
      points.push(new pointOfInterest(name, coords));
  
      // Make sure the new point is within the visible map view
      if (!map.getBounds().contains(coords))
        map.panTo(coords);
  
      // If the map's InfoWindow is open, move it to the new point
      if (selected)
        points[points.length - 1].showInfo();
    }
    else
      alert(l10n.max_msg);
  };
  
  function getIcon() {
    var iconStyle = valueOfField(markerStyle);
    if (iconStyle != 'color')
      return clockIcons[iconStyle];
    else
    {
      // Return a uniquely-colored map pointer icon
    
      var m;
      var found;
      
      for (var n = 0; n < icons.length; n++)
      {
        if (!icons[n])
        {
          // Create a new icon
          icons[n] = new GIcon(G_DEFAULT_ICON);
          icons[n].image            = '/images/20_' + _iconColors[n] + '.png';
          icons[n].shadow           = '/images/20_shadow.png';
          icons[n].iconSize         = new GSize(12, 20);
          icons[n].shadowSize       = new GSize(22, 20);
          icons[n].iconAnchor       = new GPoint(6, 20);
          icons[n].infoWindowAnchor = new GPoint(5, 1);
          icons[n].printImage       = '/images/20_' + _iconColors[n] + '.gif';
          icons[n].mozPrintImage    = '/images/20_' + _iconColors[n] + '.gif';
          icons[n].printShadow      = '/images/20_shadow.gif';
          break;
        }
        else
        {
          // Is this icon available for re-use? 
          
          found = false;
          for (m = 0; m < points.length; m++)
            if (points[m].marker.getIcon() == icons[n])
            {
              // Icon is in use by this point
              found = true;
              break;
            }
            
          if (found)
            // Icon not available
            continue;
          else
            // Icon is available
            break;
        }
      }
      
      return icons[n];
    }
  };
  
  function displayOffset(hours) {
    // Format a timezone offset (supplied in hours) for display, such as '+0430' for 4.5 hours
    
    var result = '';
    
    if (hours == Math.abs(hours))
      result += '+';
    else
      result += '-';
      
    hours = Math.abs(hours);
    var minutes = (hours - Math.floor(hours)) * 60;
    var intHours = Math.floor(hours);
    
    result += zeroPad(intHours, 2) + zeroPad(minutes, 2);
    
    return result;
  }
  
  
  function movePoint(id) {
    // Prepare a map marker for drag+drop
  
    var point = getPoint(id);
    if (point)
      try
      {
        map.closeInfoWindow();
    
        if (!shownInstructions)
        {
          shownInstructions = true;
          alert(l10n.move_msg);
        }
  
  //      point.marker.disableDragging();
        point.marker.enableDragging();
      }
      catch(e)
      {
  //      GLog.write('Marker drag error: ' + e.toString());
      }
  };
  
  function markerMoveEnd(id) {
    // Finalize map marker drag+drop
  
    var point = getPoint(id);
    if (point)
    {
      point.marker.disableDragging();
      point.coords = point.marker.getPoint();
      point.refreshInfo();
    }
    
    makeLink();
  };
  
  function deletePoint(id, confirmFirst) {
    // Remove a marker from the map and all associated lists
    
    if (confirmFirst == null)
      confirmFirst = true;
    
    var point = getPoint(id);
    if (point)
      if (!confirmFirst ||
          confirm(l10n.delete_msg + ' "' + point.name + '"?'))
      {
        // Remove it from the map
        map.closeInfoWindow();
        map.removeOverlay(point.marker);
  
        // Remove it from the option-bar list
        var listItem = document.getElementById('list_' + id);
        if (listItem)
          listItem.parentNode.removeChild(listItem);
  
        // Remove it from the internal Point-of-Interest list
        points.splice(points.indexOf(point), 1);
        
        makeLink();
      }
  };
  
  function renamePoint(id, where) {
    // Initialize map marker renaming
    
    var point = getPoint(id);
    
    if (where == 'list')
      // Renaming in the option-bar list
      var nameElement = document.getElementById('name_' + id);
    else
      // Renaming in the infowindow
      var nameElement = document.getElementById('info_name_' + id);
      
    if (point && nameElement)
    {
      // Replace the displayed name with a text input in the HTML
      nameElement.onclick = null;
      nameElement.innerHTML = '<input type="text" id="renamer" value="' + point.name + '" ' + 
                              'maxlength="25" onblur="applyNewName(' + id + ', this.value)" ' +
                              'onkeypress="if (event.keyCode == 13) applyNewName(' + id + ', this.value)" />';
    
      // Set focus to the text input and select its contents
      var renamer = document.getElementById('renamer');
      if (renamer)
      {
        renamer.select();
        renamer.focus();
      }
    }
  };
  
  function applyNewName(id, value) {
    // Finalize map marker renaming
    if (value != '')
    {
      var point = getPoint(id);
    
      if (point)
      {
        // Rename the internal point object
        point.name = value;
    
        // Apply the new name to both places it may occur in the HTML
    
        var nameElement = document.getElementById('name_' + id);
        if (nameElement)
        {
          nameElement.onclick = function() {renamePoint(id, 'list')};
          nameElement.innerHTML = point.name;
        }
    
        nameElement = document.getElementById('info_name_' + id);
        if (nameElement)
        {
          nameElement.onclick = function() {renamePoint(id, 'info')};
          nameElement.innerHTML = point.name;
        }
      }
      
      makeLink();
    }
  };
  
  function toggleChrome() {
    if (hideChrome)
    {
      map.addControl(panControl, new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(10, 85)));
      map.addControl(typeControl);
      map.addControl(scaleControl);
    }
    else
    {
      map.removeControl(panControl);
      map.removeControl(typeControl);
      map.removeControl(scaleControl);
    }
    
    hideChrome = !hideChrome;
    //windowResize();
  };
  
  // get request returns this xml???
  function sunMove(xml) {
    if (xml) {
      sunCoords = new GLatLng(parseFloat(getText(xml.documentElement.getElementsByTagName('solar_lat'))),
                              parseFloat(getText(xml.documentElement.getElementsByTagName('solar_lon'))));
  
      // Refresh the AM/PM display
      refreshMeridians();
  
      //if (sunCbx.checked)
      //{
        if (!sunOnMap)
        {
          map.addOverlay(sunMarker);
          sunOnMap = true;
        }
    
        sunMarker.setPoint(sunCoords);
        
        var display = document.getElementById('sun_coords');
        display.innerHTML = '(' + numberFormat(sunCoords.lat(), 6) + ', ' + numberFormat(sunCoords.lng(), 2) + ')';
      //}
    }
  };
  
  function sunClick() {
    try {
      var infoURL = '/point_info.php?dtmWhen=' + Number(getWhen()) / 1000;
      request.open('GET', infoURL, true);
      request.onreadystatechange = function() {
        if (request.readyState == 4)
          sunMove(request.responseXML);
      };
      request.send(null);
    } catch (e) { }
  };
  
  function keyHandler(event) {
    // Handle map shortcut keys
    // Cross-browser compatible code to retrieve the key code
    if (!event)
      event = window.event;     // IE
    var code = event.which;     // FF
    if (code == undefined)
      var code = event.keyCode; //IE
  
    if (event.ctrlKey || 
        event.altKey ||
        expanded)
      return;
  
    switch (String.fromCharCode(code))
    {
      case '+':
      {
        // Zoom in
        map.setZoom(map.getZoom() + 1);
        break
      }
  
      case '-':
      {
        // Zoom out
        map.setZoom(map.getZoom() - 1);
        break
      }
  
      case 'f':
      case 'F':
      {
        // Toggle "full screen" mode
        toggleChrome();
      }
    }
  };
  
  function refreshMeridians() {
    if (!sunCoords)
      return;
  
    var html = '';
    var className;
    var left = new GPoint(0, 0);
    var right;
    var width;
    var coords;
    var wrap = map.getCurrentMapType().getProjection().getWrapWidth(map.getZoom());
  
    do {
      coords = map.fromContainerPixelToLatLng(left);
  
      if (coords.directionFrom(sunCoords) >= 0)
      {
        className = 'am';
        right = map.fromLatLngToContainerPixel(sunCoords);
      }
      else
      {
        className = 'pm';
        right = map.fromLatLngToContainerPixel(new GLatLng(0, sunCoords.lng() + 180));
      }
  
      while (right.x < left.x)
        right.x += wrap;
      while (right.x - left.x > wrap)
        right.x -= wrap;
  
      width = Math.min(right.x, mapDiv.offsetWidth) - left.x;
  
      html += '<span class="' + className + '"' +
              ' style="left: ' + left.x + 'px; width: ' + width +'px">';
      if (width > 25)
        html += className.toUpperCase();
      html += '</span>';
  
      left = new GPoint(right.x + 1, 0);
    } while (right.x <= mapDiv.offsetWidth)
    
    meridians.innerHTML = html;
  };
  
  function updateStyle() {
    for (var n = 0; n < points.length; n++)
    {
      var listImage = points[n].setIcon();
      var listTime = document.getElementById('icon_' + n);
      points[n].refreshIcon();
    }
  };
  
  function pointMouseOut(id) {
    if (tooltip)
      tooltip.hide();
  };
  
  function pointMouseOver(id) {
    var point = points[id];
  
    if (point &&
        (selected != id))
    {
      var html = '<p>' + point.name + ': ' + point.displayTime(getWhen()) + '<p>';
  
      if (tooltip)
      {
        tooltip.setContents(html);
        tooltip.setPoint(point.coords);
        tooltip.show();
      }
      else
      {
        tooltip = new ELabel(point.coords, html, 'tooltip', new GSize(16, -9), 85, true);
        map.addOverlay(tooltip);
      }
    }
  };
  
  // JS 5: INIT_POINTS.js
  
  var encodedEMail = "$sEmailAddr";
  var canvas = false;
  var initZoom = null;
  var initLat  = 0;
  var initLon  = 0;
  var initType = G_SATELLITE_MAP;
  var initTimezone = null;
  function initPoints() { }
  
  // JS 6: MAP_INITIALIZATION.js
  
    map = new GMap2(document.getElementById('map'));
    //map = new google.maps.Map(document.getElementById('map'));
  
    var daylight = new daylightMap.daylightLayer();
    daylight.addToMap(map);
    daylight.addToMapType(G_SATELLITE_MAP);
    
});
