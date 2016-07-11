'use strict';

angular.module('smsIntegrationApp')
  .directive('main', () => ({
    templateUrl: 'app/main/main.html',
    restrict: 'E',
    controller: 'mainController',
    controllerAs: 'main'
  }));
