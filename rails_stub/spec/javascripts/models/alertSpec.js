describe('Alert model', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {

		it('should exhibit attributes', function() {
      var alert = new App.Alert({
				alert: "alert_param",
				site: "site_param",
				ticket: "ticket_param",
				noted: "noted_param"
      });
      expect(alert.get('alert'))
        .toEqual('alert_param');
      expect(alert.get('site'))
        .toEqual('site_param');
      expect(alert.get('ticket'))
        .toEqual('ticket_param');
      expect(alert.get('noted'))
        .toEqual('noted_param');
    });
	}); 
});
