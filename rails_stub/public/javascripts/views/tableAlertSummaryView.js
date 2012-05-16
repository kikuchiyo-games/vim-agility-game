
App.TableAlertSummaryView = App.TableView.extend({
  initialize: function( options ){
    this.height = 100;
    this.collection = new App.AlertCollection();
    this.colHash = {'Project Name':'10%', 'Alert Type':'70%', '$ Loss':'10%', 'Age':'10%'};
    //this.source = '/table_alert_summaries';
    this.el = 'div#summary_table_container';
    this.id = 'summary_table_container';
    this.tableId = 'summary_table';
    this.className = 'display';
    this.tableTemplate = this.generateTableTemplate();
    this.generateHeadColumns();
    this.generateFootColumns();
    this.callRender();
  },
  render: function(){
    var for_data_tables = []
    this.collection.each(function(e){
      for_data_tables.push( {
        'Project Name': e.attributes['Project Name'],  
        'Alert Type': e.attributes['Alert Type'],
        'Age': e.attributes['Age'],
        '$ Loss': e.attributes['$ Loss']
      });
    })
    if ( this.collection != undefined ){
      $( this.el ).html( this.tableTemplate );
      this.toDataTable( for_data_tables );
    }
  }

});
//  Need to render something like this...
//
////{"aaData":[
//  { "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help",
//    "Age":"1 day old",
//    "$ Loss":"100.00"
//  }, { 
//    "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help, again!",
//    "Age":"2 days old",
//    "$ Loss":"130.00"
//  }, {
//    "Project Name":"Sa Da Tay Project",
//    "Alert Type":"Yet another site that needs your help!",
//    "Age":"3 days old",
//    "$ Loss":"130.00"
//  },
//  { "Project Name":"Pootie Project",
//    "Alert Type":"some site that needs your help",
//    "Age":"1 day old",
//    "$ Loss":"100.00"
//  },   { "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help",
//    "Age":"1 day old",
//    "$ Loss":"100.00"
//  }, { 
//    "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help, again!",
//    "Age":"2 days old",
//    "$ Loss":"130.00"
//  }, {
//    "Project Name":"Sa Da Tay Project",
//    "Alert Type":"Yet another site that needs your help!",
//    "Age":"3 days old",
//    "$ Loss":"130.00"
//  },
//  { "Project Name":"Pootie Project",
//    "Alert Type":"some site that needs your help",
//    "Age":"1 day old",
//    "$ Loss":"100.00"
//  },   { "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help",
//    "Age":"1 day old",
//    "$ Loss":"100.00"
//  }, { 
//    "Project Name":"Sa Da Tay Project",
//    "Alert Type":"some site that needs your help, again!",
//    "Age":"2 days old",
//    "$ Loss":"130.00"
//  }, {
//    "Project Name":"Sa Da Tay Project",
