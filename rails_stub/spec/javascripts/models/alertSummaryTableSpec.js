describe('Alert Summary Table', function() {

  describe('when instantiated', function() {

		it('should have url of table_alert_summaries', function() {
	    var alert_summary_table = new App.AlertSummaryTable();
      expect(alert_summary_table.url()).toEqual('/table_alert_summaries');
	  });

	});
});
