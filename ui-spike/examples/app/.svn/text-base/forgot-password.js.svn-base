
	$(document).ready(function(){

		var username;

		$('#forgot').click(function(event){
				var el=$(this);
				window.location.href=el.attr("href")+'?userName='+username;
				event.preventDefault();
		});

		var getusername = function(){
			username = $('#userName').val();
		};

		$('#userName').change(getusername);
	
		getusername();
	});
