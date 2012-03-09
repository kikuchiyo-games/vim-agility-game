App.DiagnosticsView = Backbone.View.extend({
  initialize: function( ){
    this.el = 'div#tabs';
    this.render();
    App.Diagnostics.detailTab = new App.TabDiagnosticsDetailView();
    App.Diagnostics.issuesTab = new App.TabDiagnosticsIssueDetailView();
    App.Diagnostics.monitoringTab = new App.TabDiagnosticsMonitoringDetailView();
    App.Diagnostics.projectProfileView = new App.ProjectProfileView();
    App.Diagnostics.listAlertsView = new App.ListAlertsView();
    App.Diagnostics.summaryFilterView = new App.SummaryFilterView();

    $( "#summary-accordion" ).accordion({ collapsible: true });
    App.Diagnostics.tableAlertSummaryView = new App.TableAlertSummaryView();
    App.Diagnostics.tableAlertDetailsView = new App.TableAlertDetailsView();
    App.Diagnostics.detailsFilterView = new App.DetailsFilterView();

    $('#data-mining-bellow-h3').click(function(){
      App.Diagnostics.tableAlertDetailsView.oTable.fnDraw();
    });

    $('#map-controller').click(function(){
      var rentWidth = $('#summary_table_container').offsetParent().width();
      if ( $('#summary_table_container').width() / rentWidth  > .50 ){
        $('#summary_table_container').width('40%');
      } else { $('#summary_table_container').width( rentWidth ); }
      $('#map_container' ).toggle();
      App.Diagnostics.tableAlertSummaryView.oTable.fnDraw();
    });
    
  }, 
  render: function(){
    $( "#tabs" ).append( _.template( $( '#diagnostics_page_template' ).html() ) );
  }

});
