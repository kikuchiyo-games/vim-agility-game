//The View has the following responsibilities:

//  rendering the DOM element
//  initializing DOM events for user interactions within the element
//  subscribing to events that are relevant to the DOM element and updating it appropriately, such as:
//    When a Model changes.
//    When a Collection changes.
//    When a specific event occurs elsewhere on the page (navigation, etc, etc).
//
//  Container div is expected to be in dom already!

App.TableView = Backbone.View.extend({
  initialize: function( options ){
    this.source    = this.options.source;
    this.tableId   = this.options.tableId;
    this.colHash   = this.options.colHash;
    this.tableTemplate = this.generateTableTemplate();
    this.generateHeadColumns();
    this.generateFootColumns();
  },

  generateTableTemplate: function(){
    return( 
      "<table cellpadding='0' cellspacing='0' border='0' id=\"" + this.tableId + "\" class=\""+ this.className + "\">" +
        "<thead></thead>" + 
        "<tbody></tbody>" + 
        "<tfoot></tfoot>" +
      "</table>"
    );
  },

  generateHeadColumns: function(){
    var headCols = '';
    for ( var col in this.colHash ){
      headCols += "<th width = \"" + this.colHash[col] + "\">" + col + "</th>"
    }
    this.tableTemplate = this.tableTemplate.replace("<thead></thead>", "<thead><tr>" + headCols + "</tr></thead>")
  },

  generateFootColumns: function(){
    var footCols = '';
    for ( var col in this.colHash ){
      footCols += "<th>" + col + "</th>"
    }
    this.tableTemplate = this.tableTemplate.replace("<tfoot></tfoot>", "<tfoot><tr>" + footCols + "</tr></tfoot>")
  },
  
  toDataTable: function( ){
    var self = this;
    var aoColumns = [];
    for ( var col in this.colHash ) {
      aoColumns.push({ "mDataProp":col });
    }

    // not supposed to use jquery, but getElementById fails on .dataTable()...
    // var oTable = this.el.getElementById(this.tableId).dataTable({})
    var oTable = $( "#" + this.tableId ).dataTable({
      "bProcessing": true,
      "aoColumns": aoColumns,
      "sAjaxSource": self.source//,
      //"sScrollY": "200px"
    });
  },

  render: function(){
    this.el.innerHTML = this.tableTemplate;
  }

});
