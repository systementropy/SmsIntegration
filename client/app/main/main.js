'use strict';

angular.module('app.controllers',[]).controller('AppCtrl',['$scope', '$rootScope', '$location',function($scope, $rootScope, $location){
			console.log('here'+$scope);
			var $window;
			$window = $(window);
			
			$scope.isCurrentPath = function(path) {
	        	return $location.path() === path;
	        };
    	}
    ]
);
