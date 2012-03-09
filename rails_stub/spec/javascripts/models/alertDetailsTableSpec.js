describe('Alert Details Table', function() {

  describe('when instantiated', function() {

		it('should have url of alert details tables', function() {
	    var alert_detail_table = new App.AlertDetailsTable();
      expect(alert_detail_table.url()).toEqual('/table_alert_details');
	  });

	});
});
