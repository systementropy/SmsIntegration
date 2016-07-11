(function() {
  'use strict';
  angular.module(
        'app.controller.compose', 
        [
        ]
	).controller('composeController',
	    function ($scope, $rootScope, $http, $routeParams) {
	    	$scope.randomGenerator=function(){

				return Math.floor((Math.random() * 1000000) + 1);
			}
			$scope.sendMsg=function(){
				$http.get('/sendSMS?msgBody='+$scope.parent.textBox).success(function(path) {
					$scope.now=new Date();
					$rootScope.parent.customJSON[$scope.userKey].History.push({'body':$scope.parent.textBox,'time':$scope.now,'OTP':$scope.randomGenerated,'userKey':$scope.userKey});
					$scope.randomGenerated=$scope.randomGenerator();
	            	$scope.parent.textBox="Hi. Your OTP is :"+$scope.randomGenerated;
				});

			}
	    	var init = function () {
	    		
	    		if($routeParams.user){
	                $scope.userKey = $routeParams.user;
	            }
	            $scope.parent={};
	            $scope.selectedUser=$rootScope.parent.customJSON[$scope.userKey];
	            $scope.randomGenerated=$scope.randomGenerator();
	            $scope.parent.textBox="Hi. Your OTP is :"+$scope.randomGenerated;
	    	}
	    	init();
	    }
	);
}).call(this);