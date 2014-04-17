var app=angular.module('app', []);
	function Controller($scope,$http){
		var socket = io.connect('http://localhost:9000/asker');

		socket.on('connect',function(){
			console.log('connected');			

			socket.on('done', function (data) {
				alert('done:'+data.result[0]);
			});

			socket.on('disconnect', function () {
				
		  	});

		});

		$scope.url={};

		$scope.test=function(workerId){
			socket.emit('test',{
				url:$scope.url[workerId],
				requirement:{
					workerId:workerId
				}
			});
		}

		$http.get('/api/worker').success(function(data){
			$scope.workers=data;
		})

		$scope.showPanel=function(id){
            $scope.showPanelStatus={};
            $scope.showPanelStatus[id]=true;
        }

        $scope.hidePanel=function(){
            $scope.showPanelStatus={};
        }
	}