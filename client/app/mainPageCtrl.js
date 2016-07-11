(function() {
    'use strict';
    angular.module(
        'app.controller.mainPage',
        [
        ]
    ).controller('mainPageCtrl',
        function ($scope, $rootScope, $http, $uibModal) {
            $scope.displayDetails = function(key){
                $scope.parent.userKey=key;
                $scope.parent.selectedUser=$rootScope.parent.customJSON[key];
            }
            $scope.open = function(key){
                var modalInstance = $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'openCompose.html',
                  controller: 'openComposeCtrl',
                  size: size,
                  resolve: {
                    key: function () {
                      return key;
                    }
                  }
                });
                modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
                }, function () {
                  $log.info('Modal dismissed at: ' + new Date());
                });
            }
            var init = function () {
                
                $scope.main={};
                $scope.main.active=false;
            }
            init();
        }
    ).controller(
        'openComposeCtrl',
        [
            '$rootScope',
            '$scope',
            'key',
            '$modalInstance',
            function($rootScope, $scope, key, $modalInstance){
                $scope.getKMB = function(number){
                    number=parseInt(number);
                    if(number<1000)
                        return number;
                    else if(number>=1000 && number<1000000)
                        return parseFloat(number/1000).toFixed(1)+"K";
                    else if(number>=1000000 && number<1000000000)
                        return parseFloat(number/1000000).toFixed(1)+"M";
                    else if(number>=1000000000)
                        return parseFloat(number/1000000000).toFixed(1)+"B";
                }
                var init = function(){
                    $scope.key = key;
                    $scope.myMap={
                        "country":"Countries",
                        "city":"Cities",
                        "Fan":"Fans",
                        "Engagement":"Engagements",
                        "Reach":"Reach"

                    }
                }
                init();
            }
        ]
    );
}).call(this);