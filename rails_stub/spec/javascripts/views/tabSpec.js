describe('Tab view', function() {

  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  

  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      // $( 'body' ).prepend( loadFixtures('body.html') );
      $( 'body' ).prepend( "<div id = 'tabs'></div>" );
      App.page_tab = new App.TabPageView();
      App.page_tab.render();
    });

    afterEach(function(){
      $( App.page_tab.el ).remove();
    })

    describe('dom ids and classes', function(){
      it('id is set as expected', function() {
        expect( App.page_tab.id ).toEqual( 'tabs' );
      });
      it('navId is set as expected', function() {
        expect( App.page_tab.navId ).toEqual( 'navigation-list' );
      });
    });

    describe('tabHash', function(){
      it('Diagnostics linksTo is set as expected', function() {
        expect( App.page_tab.tabHash['Diagnostics'] ).toEqual( 'diagnostics' );
      });  
    });  

    describe('render', function(){
      //beforeEach(function() { App.page_tab.render(); });  
      describe('innerHTML', function(){
        it('should set el.innerHTML', function() {
          expect( $( 'div#' + App.page_tab.id + ' ul#' + App.page_tab.navId ).html() ).not.toEqual( null );
        });
        it('should set el.innerHTML Diagnostics tab', function() {
          expect( $( 'div#' + App.page_tab.id + ' ul#' + App.page_tab.navId + ' li:contains("Diagnostics")' ).html() ).not.toEqual( null );
        });
      });

      describe('Tabination', function(){
        // beforeEach(function() { App.page_tab.toTab(); });  
        it('renders expected tab-name', function() {
          expect( $( 'div#' + App.page_tab.id + ' ul#' + App.page_tab.navId + ' li:contains("Diagnostics")' ).text() ).toEqual( "Diagnostics" );
        });
        it('renders expected link', function() {
          expect( $( 'div#' + App.page_tab.id + ' ul#' + App.page_tab.navId + ' li:contains("Diagnostics") > a' ).attr('href') ).toEqual( '#diagnostics' );
        });
      });
    });
  });
});
