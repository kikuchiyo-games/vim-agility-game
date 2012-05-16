
App.TableView = Backbone.View.extend({

  initialize: function( options ){
    this.collection = this.options.collection; //new App.AlertList();
    // this.collection.fetch({wait:true, success: function(){this.render()} });
    this.height = this.options.height;
    this.source = this.options.source;
    this.tableId = this.options.tableId;
    this.colHash = this.options.colHash;
    this.tableTemplate = this.generateTableTemplate();
    this.generateHeadColumns();
    this.generateFootColumns();
		_.bindAll(this, 'render');
		this.collection.bind('reset', this.render, this);
		this.collection.bind('remove', this.removed, this);
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
  
  toDataTable: function( tableRows ){
    var self = this;
    var aoColumns = [];
    for ( var col in this.colHash ) {
      aoColumns.push({ "mDataProp":col });
    }

    this.oTable = $( "#" + this.tableId ).dataTable({
      "sDom": 'C<"clear">Rlfrtip',
      "bProcessing": true,
      "aoColumns": aoColumns,
      "aaData": tableRows,
      "bLengthChange": false,
      "bPaginate": false,
      "sScrollY": self.height + "px",
      "bScrollCollapse": true
    }).rowGrouping({bExpandableGrouping: true});

  },

  fnShowHide: function( iCol ){
    var self = this;
    var bVis = self.oTable.fnSettings().aoColumns[ iCol ].bVisible;
    self.oTable.fnSetColumnVis( iCol, bVis ? false : true );
  },

  // render fails without this...
  callRender: function(){
    var self = this;
    self.collection.fetch({ 
      url: self.collection.url(),
      wait:true,
      success: function(){ self.render(); },
      error: function(e){ }
    });
  }
});
