
describe('Bellow view', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });  
  afterEach(function() {
    this.server.restore();
  });
  
  describe('when instantiated', function() {
    beforeEach(function() {
      bellow = new App.BellowView({
        h3Id: 'foo',
        divId: 'bar',
        accordionId: 'summary_accordion',
        displayText: 'howdie-doodie!'
      });
    });

    afterEach(function(){
      $('#' + bellow.h3Id  ).html('');
      $('#' + bellow.divId ).html('');
    })

    describe('dom ids and classes', function(){
      it('h3Id is set as expected', function() {
        expect( bellow.h3Id ).toEqual( 'foo' );
      });
      it('divId is set as expected', function() {
        expect( bellow.divId ).toEqual( 'bar' );
      });
    });

    describe('bellow text', function(){
      beforeEach(function() {
        $( '#' + bellow.accordionId ).append( bellow.h3Content );
      });  
      it('should have the expected link text', function() {
        expect( $( "#" + bellow.h3Id ).text() ).toEqual( 'howdie-doodie!' );
      });
    });
  });
});
