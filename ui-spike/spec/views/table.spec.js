describe('Table view', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      table = new App.TableView({
        colHash: {'Alert':'10%', 'Site':'70%', 'Noted':'10%', 'Ticket':'10%'},
        source: 'sources/summary_table.json',
        el: 'div#summary_table_container',
        id: 'summary_table_container',
        tableId: 'summary_table',
        className: 'display'
      });
    });

    afterEach(function(){
      $('#' + table.tableId).html('');
    })

    describe('dom ids and classes', function(){
      it('id is set as expected', function() {
        expect( table.id ).toEqual( 'summary_table_container' );
      });  
      it('tableId is set as expected', function() {
        expect( table.tableId ).toEqual( 'summary_table' );
      });  
      it('className is set as expected', function() {
        expect( table.className ).toEqual( 'display' );
      });  
    });

    describe('colHash', function(){
      it('Alert width is set as expected', function() {
        expect( table.colHash['Alert'] ).toEqual( '10%' );
      });  
      it('Site width is set as expected', function() {
        expect( table.colHash['Site'] ).toEqual( '70%' );
      });
      it('Noted width is set as expected', function() {
        expect( table.colHash['Noted'] ).toEqual( '10%' );
      });
      it('Ticket width is set as expected', function() {
        expect( table.colHash['Ticket'] ).toEqual( '10%' );
      });
    });

    describe('#render', function(){
      beforeEach(function() {
        table.render();
      });  

      describe('render', function(){
        beforeEach(function() {
          tableElement = 'div#' + table.id + ' table#' + table.tableId;
        });  

        describe('innerHTML', function(){
          it('should set el.innerHTML', function() {
            expect( $( tableElement ).html( ) ).not.toEqual( null );
          });
          it('should set el.innerHTML Alert column', function() {
            expect( $( tableElement + ' th:contains("Alert")' ).html() ).not.toEqual( null );
          });
          it('should set el.innerHTML Site column', function() {
            expect( $( tableElement + ' th:contains("Site")' ).html() ).not.toEqual( null );
          });
          it('should set el.innerHTML Noted column', function() {
            expect( $( tableElement + ' th:contains("Noted")' ).html() ).not.toEqual( null );
          });
          it('should set el.innerHTML Ticket column', function() {
            expect( $( tableElement + ' th:contains("Ticket")' ).html() ).not.toEqual( null );
          });
        });
      });
    });
  });
});
