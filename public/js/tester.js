(function() {

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}

	var jobId=getURLParameter('jobId');

	var socket = io.connect('http://localhost:9000/tester');

	var result=[];

	socket.on('connect', function() {
		console.log('connected');

		setTimeout(function(){
			socket.emit('done',{
				jobId:jobId,
				result:result
			});
			window.close();
		},3000)

		
		socket.on('disconnect', function() {

		});

	});

	console.error=function(error){
		result.push({
	    	error:error
		});
	}

	window.onerror = function(error, url, line) {
	    result.push({
	    	error:error,
	    	line:line
	    });
	};
	
})()