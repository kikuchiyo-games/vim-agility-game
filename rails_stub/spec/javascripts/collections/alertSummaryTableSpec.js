describe('AlertSummaryTable collection', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });

  describe('when instantiated', function() {
    beforeEach(function() {
      App.alert_summary_table = new App.AlertSummaryTable();
    });
		it('should exhibit attributes', function() {
      expect( App.alert_summary_table.url() ).toEqual( '/table_alert_summaries' );
    });
  });

});
