(function() {
  'use strict';
  angular.module('smsIntegrationApp', ['smsIntegrationApp.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngRoute', 'btford.socket-io', 'ui.bootstrap','app.controllers','app.controller.mainPage','app.controller.compose','app.controller.viewall'
  ]).config(function($routeProvider,$locationProvider) {
    var routes, setRoutes;
    var routes=['smUserInfo'];
    $locationProvider.html5Mode(true);
      setRoutes = function(route) {
    		var config, url;
    		url = '/' + route;
    		config = {
    		  templateUrl: 'views/' + route + '.html'
    		};
    		$routeProvider.when(url, config);
      		return $routeProvider;
    	};
    	routes.forEach(function(route) {
    	    return setRoutes(route);
  	  }
    );
  	return $routeProvider.when('/', {
          redirectTo: '/smUserInfo'
    }).when('/compose', {
      controller: 'composeController',
      templateUrl: 'views/compose.html'
    }).when('/viewAll', {
      controller: 'viewAllCtrl',
      templateUrl: 'views/viewAll.html'
    });
  }).run(function($rootScope, $location, $route) {
  	var original;
    $rootScope.parent={};
    $rootScope.parent.customJSON={
        '1':{
            'name':'Saket1',
            'FirstName':'Saket1',
            'LastName':'Vatsa1',
            'Mobile':'+91-8882767939',
            'Location':'IN1',
            'History':[]
        },
        '2':{
            'name':'Saket2',
            'FirstName':'Saket2',
            'LastName':'Vatsa2',
            'Mobile':'+91-8882767939',
            'Location':'IN2',
            'History':[]
        },
        '3':{
            'name':'Saket3',
            'FirstName':'Saket3',
            'LastName':'Vatsa3',
            'Mobile':'+91-8882767939',
            'Location':'IN3',
            'History':[]
        },
        '4':{
            'name':'Saket4',
            'FirstName':'Saket4',
            'LastName':'Vatsa4',
            'Mobile':'+91-8882767939',
            'Location':'IN4',
            'History':[]
        },
        '5':{
            'name':'Saket5',
            'FirstName':'Saket5',
            'LastName':'Vatsa5',
            'Mobile':'+91-8882767939',
            'Location':'IN5',
            'History':[]
        },
        '6':{
            'name':'Saket6',
            'FirstName':'Saket6',
            'LastName':'Vatsa6',
            'Mobile':'+91-8882767939',
            'Location':'IN6',
            'History':[]
        },
        '7':{
            'name':'Saket7',
            'FirstName':'Saket7',
            'LastName':'Vatsa7',
            'Mobile':'+91-8882767939',
            'Location':'IN7',
            'History':[]
        },
        '8':{
            'name':'Saket8',
            'FirstName':'Saket8',
            'LastName':'Vatsa8',
            'Mobile':'+91-8882767939',
            'Location':'IN8',
            'History':[]
        }
    };
  	$rootScope.$on("$locationChangeStart", function(event, next, current) {

  	});
    
  	original = $location.path;
  	return $location.path = function(path, reload) {
      var lastRoute, un;
      if (reload === false) {
        lastRoute = path;
        un = $rootScope.$on("$locationChangeSuccess", function() {
          $route.current = lastRoute;
          un();
        });
      }
      return original.apply($location, [path]);
    }
  });
})();
