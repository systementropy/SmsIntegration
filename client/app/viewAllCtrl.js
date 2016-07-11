(function() {
  'use strict';
   angular.module(
        'app.controller.viewall', 
        [
        ]
	).controller('viewAllCtrl',
	    function ($scope, $rootScope, $http, $routeParams) {
	    	
	    	var init = function () {
	    		
	    		$scope.msgArr=[];
	    		for(var key in $rootScope.parent.customJSON){
	    			if($rootScope.parent.customJSON[key]['History'].length>0){
	    				for (var i=0; i<$rootScope.parent.customJSON[key]['History'].length; i++) {
		    				$scope.msgArr.push($rootScope.parent.customJSON[key]['History'][i]);
		    			}	
	    			}
	    			
	    		}
	    		
	    	}
	    	init();
	    }
	);
}).call(this);