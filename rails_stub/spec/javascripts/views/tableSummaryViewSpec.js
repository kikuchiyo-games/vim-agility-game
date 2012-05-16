
describe('Alerts Summary Table per Wire-Frame', function() {

  beforeEach(function(){ 
    this.server = sinon.fakeServer.create(); 
  });  
      
  afterEach (function(){ 
    this.server.restore(); 
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      $( 'body' ).prepend( "<div id = 'summary_table_container'>yo</div>" );
      this.alert_summary_table_view = new App.TableAlertSummaryView();
      this.alert_summary_table_view.collection.url = function() { return( '../fixtures/alert_summary_table.json' ); } 
      this.alert_summary_table_view.collection.at  = function() { 
        return( 
          loadFixtures( '../fixtures/alert_summary_table.json' ) 
        ); 
      }; 
      this.eventSpy = sinon.spy();
      this.alert_summary_table_view.bind("render", this.eventSpy);
      //this.alert_summary_table_view.call_render();
      this.alert_summary_table_view.render();
    });

    //it('should be triggering render', function(){
    //  expect(this.eventSpy.calledOnce).toBeTruthy();
    //});

    it('should have filled in content for summary_table_container', function(){
      waits(500);
      runs(function(){
        expect( $( this.alert_summary_table_view.el).html() ).toEqual('alotta fachina!');
      });
    });
  });
});
