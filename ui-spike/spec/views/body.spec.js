describe('Table view', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe( 'Body', function(){ 
    it( "should have one MainTabsview", function(){
    }); 
    describe "MainTabsview", function(){
      it( "can tabinate", function(){
      }); 
      it( "should have one tab", function(){
      }); 
      it( "should have one DiagnosticsView", function(){
      }); 
      describe "DiagnosticsView", function(){
        it( "should have one AccordionView", function(){
        }); 
        describe "AccordionView", function(){
          it( "should have a SpatialAnalysisView", function(){
          }); 
          it( "should have a DataMiningView", function(){
          }); 
          it( "should have a ProjectAnalysisView", function(){
          }); 
        });
        describe "SpatialAnalysisView", function(){
          it( "should have one DataGridView", function(){
            #done
          }); 
          it( "should have one MapView", function(){
          }); 
        });  
        describe "DataMiningView", function(){
          it( "should have one FilterView", function(){
          }); 
          it( "should have one DataTableView", function(){
          }); 
        }); 
        describe "ProjectAnalysisView", function(){
          it( "should have one FilterView", function(){
          }); 
          it( "shoule have one TakeActionView", function(){
          }); 
          it( "shoule have one SubTabsView", function(){
          }); 
        }); 
      }); 
    }); 
  }); 
}); 
