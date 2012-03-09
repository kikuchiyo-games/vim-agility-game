describe('AlertDetailsTable collection', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });

  describe('when instantiated', function() {
    beforeEach(function() {
      App.alert_instance = new App.AlertDetailsTable();
    });
		it('should exhibit attributes', function() {
      expect( App.alert_instance.url() ).toEqual( '/table_alert_details' );
    });
  });

});
