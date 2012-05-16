
describe('Accordion view', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      accordion = new App.AccordionView({
        el: '#summary_accordion',
        bellows: [
          { id:'first-bellow',  h3Id:'h3-foo', divId:'div-foo', accordionId:'summary_accordion', aClass:'class-foo', displayText:'howdie'},
          { id:'second-bellow', h3Id:'h3-bar', divId:'div-bar', accordionId:'summary_accordion', aClass:'class-bar', displayText:'doodie'}
        ]
      });
    });

    afterEach(function(){
      $( accordion.el ).html('');
    })

    describe('bellows', function(){
      it('should have the expected bellows', function() {
        expect( accordion.bellows[0].id ).toEqual( 'first-bellow' );
        expect( accordion.bellows[1].id ).toEqual( 'second-bellow' );
      });
      it('should have the expected bellowViews', function() {
        expect( accordion.bellowViews[0].h3Id ).toEqual( 'h3-foo' );
        expect( accordion.bellowViews[1].h3Id ).toEqual( 'h3-bar' );
      });

      describe('rendering', function(){
        beforeEach(function(){
          accordion.renderBellowViewH3( 0 );
        });

        it('renders the expected bellowViews', function() {
          expect( $( '#' + accordion.bellowViews[0].h3Id ).text() ).toEqual( 'howdie' );
        });
      });
    });
  });
});
