
describe('Tab view', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      tab = new App.TabView({
        tabHash: {'Diagnostics':'#summary-accordion'},
        el: 'div#tabs',
        id: 'tabs',
        navId: 'tabs-navigation'
      });
    });

    afterEach(function(){
      $('#' + tab.navId).html('');
    })

    describe('dom ids and classes', function(){
      it('id is set as expected', function() {
        expect( tab.id ).toEqual( 'tabs' );
      });
      it('navId is set as expected', function() {
        expect( tab.navId ).toEqual( 'tabs-navigation' );
      });
    });

    describe('tabHash', function(){
      it('Diagnostics linksTo is set as expected', function() {
        expect( tab.tabHash['Diagnostics'] ).toEqual( '#summary-accordion' );
      });  
    });  

    describe('render', function(){
      beforeEach(function() {
        tab.render();
        tabElement = 'div#' + tab.id + ' ul#' + tab.navId;
      });  

      describe('innerHTML', function(){
        it('should set el.innerHTML', function() {
          expect( $( tabElement ).html( ) ).not.toEqual( null );
        });
        it('should set el.innerHTML Diagnostics tab', function() {
          expect( $( tabElement + ' li:contains("Diagnostics")' ).html() ).not.toEqual( null );
        });
      });
      describe('Tabination', function(){
        beforeEach(function() {
          tab.toTab();
        });  
        it('renders expected tab-name', function() {
          expect( $( tabElement + ' li:contains("Diagnostics")' ).text() ).toEqual( "Diagnostics" );
        });
        it('renders expected link', function() {
          expect( $( tabElement + ' li:contains("Diagnostics") > a' ).attr('href') ).toEqual( '#summary-accordion' );
        });

      });
    });
  });
});
