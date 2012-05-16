describe('Chart model', function() {
	beforeEach(function() {
		// jasmine.Ajax.mode = 'jQuery';
		// jasmine.Ajax.useMock();
		this.server = sinon.fakeServer.create();
	});	
	afterEach(function() {
	  this.server.restore();
	});
	
  describe('when instantiated', function() {
    beforeEach(function() {
			chart = new App.Chart({
        period: 'foo',
 				range: 'bar',
				metric: 'baz'
      });
		});

		it('should know about the current period', function() {
			expect(chart.currentPeriod()).toEqual('foo');
		});	
		
		it('should know about the current range', function() {
			expect(chart.currentRange()).toEqual('bar');
		});
		
		it('should know about the current metric', function() {
			expect(chart.currentMetric()).toEqual('baz');
		});
		
		
		describe('when determining fetch url', function() {
			beforeEach(function() {
				
			});
		});	
		
		describe('when reloading from server', function() {
			beforeEach(function() {
				chart.set('period', 'bar');
				spyOn(jQuery, 'ajax');
			
				chart.fetch();
			});
			
			it('should reload data from chart url ONCE', function() {				
				expect($.ajax).toHaveBeenCalledWith({
				        url : chart.url(),
				        type : 'GET',
								dataType : 'json',
				        success : jasmine.any(Function),
								error: jasmine.any(Function)
				});			
				expect($.ajax.callCount).toEqual(1);
			});
			
			it('should update url', function() {
				expect(chart.url()).toEqual('/foobar');
			});
			
			it('should update current period', function() {
				expect(chart.currentPeriod()).toEqual('bar');
			});
			
		});
		
		describe("when switching context of the chart", function() {
			function whenSwitchingToPeriod(period) {
				describe("when switching to " + period + ' period', function() {
					beforeEach(function() {
						spyOn(chart, 'fetch');
						chart.set('period', period);				
					});
			
					it('should fetch data for that period', function() {				
						expect(chart.fetch).toHaveBeenCalled();			
						expect(chart.fetch.callCount).toEqual(1);
					});
			
					it('should update url with ' + period + ' period', function() {
						expect(chart.url()).toEqual(period);
					});
			
					it('should update current period', function() {
						expect(chart.currentPeriod()).toEqual(period);
					});
				});
			}
			
			function whenSwitchingToRange(range) {
				describe("when switching to " + range + ' range', function() {
					beforeEach(function() {
						spyOn(chart, 'fetch');
						chart.set('range', range);				
					});
			
					it('should fetch data for that range', function() {				
						expect(chart.fetch).toHaveBeenCalled();			
						expect(chart.fetch.callCount).toEqual(1);
					});
			
					it('should update url with ' + range + ' range', function() {
						expect(chart.url()).toEqual(range);
					});
			
					it('should update current range', function() {
						expect(chart.currentRange()).toEqual(range);
					});
				});
			}
			
			function whenSwitchingToMetric(metric) {
				describe("when switching to " + metric + ' metric', function() {
					beforeEach(function() {
						spyOn(chart, 'fetch');
						chart.set('metric', metric);				
					});
			
					it('should fetch data for that range', function() {				
						expect(chart.fetch).toHaveBeenCalled();			
						expect(chart.fetch.callCount).toEqual(1);
					});
			
					it('should update url with ' + metric + ' metric', function() {
						expect(chart.url()).toEqual(metric);
					});
			
					it('should update current range', function() {
						expect(chart.currentMetric()).toEqual(metric);
					});
				});
			}
						
			var periods = ['1D', '1W', '1M', '1Y', 'All'];
			for ( period in periods ){
				whenSwitchingToPeriod(periods[period]);
			};	
			
			var ranges = ['First','Prev','Next','Last'];
			for ( range in ranges ){
				whenSwitchingToRange(ranges[range]);
			};
			
			var metrics = ['Energy','Value','Environment'];
			for ( metric in metrics ){
				whenSwitchingToMetric(metrics[metric]);
			};			
		});		
  });  
});