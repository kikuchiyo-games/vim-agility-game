
//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.BellowView = Backbone.View.extend({
  initialize: function( options ){
    this.h3Id        = this.options.h3Id;
    this.divId       = this.options.divId;
    this.displayText = this.options.displayText;
    this.aClass      = this.options.aClass;
    this.h3Content   = this.generateH3Template();
    this.divContent  = this.generateDivTemplate();
    this.accordionId = this.options.accordionId;
  },

  generateH3Template: function(){
    return( 
      "<h3 id=\"" + this.h3Id + "\" class = \"" + this.className + "\" >" + 
        "<a href = \"#\" class = \"" + this.aClass + "\" >" + this.displayText + "</a>" + 
      "</h3>" 
    );
  },

  generateSpatialAnalysisDivTemplate: function(){
    return(
      "<div id = 'spatial-analysis-bellow-div'>" + 
        "<div id = 'summary_table_container'></div>" +
        "<div id = 'map_container'>" +
          "<div id='main'>" +
            "<div id='meridians'></div>" +
            "<div id='map'></div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  },

  generateRockTableDivTemplate: function(){
    return(
      "<div id='roc-table'>" + 
        "<div id = 'filters' >" + 
          "<div style = 'border-bottom:1px solid; margin-bottom:1%; padding-bottom:1%;'>" + 
            "<table>" + 
              "<tr class = 'tr-filters'>" + 
                "<td width = '10%' id = 'favorite-icon' style = 'display:inline'>" + 
                  "<select>" + 
                    "<option>Select a Favorite View...</option>" + 
                    "<option>night alerts</option>" + 
                    "<option>day alerts</option>" + 
                  "</select>" + 
                  "<a href = '#'><img src = 'images/favorite.png'></img></a>" + 
                "</td>" + 
                "<!td width = '10%'> <!/td>" + 
                "<td width = '35%'  style = 'display:inline'>" + 
                  "Display" + 
                  "<select> " + 
                    "<option>Active Alerts</option>" + 
                    "<option>Inactive alerts</option>" + 
                  "</select>" + 
                  "for" + 
                  "<select> " + 
                    "<option>All Daylight Projects</option>" + 
                    "<option>All Night-time Projects</option>" + 
                  "</select>" + 
                "</td>" + 
                "<td width = '38%' id = 'add-project-icon'  style = 'display:inline'>" + 
                  "Filter By: " + 
                  "<select> " + 
                    "<option>Keyword</option>" + 
                    "<option>Something other than a Keyword...</option>" + 
                  "</select> " + 
                  "<a href = '#'>Frozen Columns</a> " + 
                  "<a href = '#'>Project</a> " + 
                  "<img src = 'images/add_project.png'></img>" + 
                "</td>" + 
              "</tr>" + 
            "</table>" + 
          "</div>" + 
        "</div>" + 
        "<div id = 'data_mining_container'></div>" + 
      "</div>" 
    );
  },

  generateDefaultDivTemplate: function( template ){
    return( "<div id=\"" + this.divId + "\"></div>" );
  },

  send_div_content: function( template ){
    return({
      '#spatial-analysis-bellow-div': this.generateSpatialAnalysisDivTemplate(),
      '#roc-table': this.generateRockTableDivTemplate(),
      null: this.generateDefaultDivTemplate()
    }[ template ]);
  },

  generateDivTemplate: function( template ){
    return ( this.send_div_content( template ) || this.send_div_content( null ) );
  }

});
