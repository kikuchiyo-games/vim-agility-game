App.TableAlertDetailsView = App.TableView.extend({
  initialize: function( options ){
    this.height = 200;
    this.collection = new App.AlertCollection();
    this.colHash = {
      "Project Name":   '20%',
      "Alert Type":     '1%',
      "Cost":      '5%',
      "Open Date": '10%',
      "MPI":       '1%',
      "Site":      '20%',
      "Noted":     '1%',
      "Night":     '1%',
      "Ticket":    '1%',
      "State":     '1%',
      "Fund":      '10%',
      "Action":    '1%'
    };
    this.el = 'div#details_table_container';
    this.id = 'details_table_container';
    this.tableId = 'details_table';
    this.className = 'display';
    this.tableTemplate = this.generateTableTemplate();
    this.generateHeadColumns();
    this.generateFootColumns();
    this.callRender();
  },
  render: function(){
    var for_data_tables = []
    this.collection.each(function(e){
      for_data_tables.push({
        "Project Name": e.attributes['Project Name'],
        "Alert Type": e.attributes['Alert Type'],
        "Cost": e.attributes['Cost'],
        "Open Date": e.attributes['Open Date'],
        "MPI": e.attributes['MPI'],
        "Site": e.attributes['Site'],
        "Noted": e.attributes['Noted'],
        "Night": e.attributes['Night'],
        "Ticket": e.attributes['Ticket'],
        "State": e.attributes['State'],
        "Fund": e.attributes['Fund'],
        "Action": e.attributes['Action']
      });
    });

    if ( this.collection != undefined ){
      $( this.el ).html( this.tableTemplate );
      this.toDataTable( for_data_tables );
    }
  }
});
  // need to send this to toDataTable..
  //
  //{"aaData":[
  //  { 
  //    "Alert":     "urgent roof collapse",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "My Dog Ate my homework",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "urgent panel failure",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "Hamburgler stole some panels",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "Rush Limbuagh ate some panels",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "Neighbors are stealing the solar power",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }, { 
  //    "Alert":     "My Dog Ate my homework",
  //    "Cost":      "5.00",
  //    "Open Date": "YesterYear",
  //    "MPI":       "some mpi",
  //    "Project":   "some project",
  //    "Site":      "some site",
  //    "Noted":     "false",
  //    "Night":     "false",
  //    "Ticket":    "false",
  //    "State":     "CA",
  //    "Fund":      "some fund associated with site",
  //    "Action":    "none"
  //  }]
  //}
