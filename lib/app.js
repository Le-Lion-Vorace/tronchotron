/*
 *  Main controller
 *  Controlleur principal
 */
(function() {
    var app = angular.module('tronchotron', ['navCtrl']);
    
    app.controller('mainCtrl', ['$scope','$http','$log',
        function($scope,$http,$log) {
            
            $scope.categories = [];
            
            $scope.elements = [];
            //$scope.allElements = [];
            
            //$scope.currentIndex = 0;
            
            $scope.siteName = 'action-grasse.org';
           
            $http.get('./elements/categories.json').success(function(data) {
                    $scope.categories = data;
            });
            
            $http.get('./elements/elements.json').success(function(data) {
                $scope.elements = data;
            });
            
            /*$http.get('./elements/store.json').success(function(data) {
                $scope.elements = data;
                //$log.debug(angular.toJson(data,true));
            });*/
            
            $scope.enable = function() {
                enable();
            };
            
            $scope.setActive = function(index){
                $scope.elements[index].status=!$scope.elements[index].status;
            };
            
            $scope.unsetActive = function(index){
                $scope.elements[index].status=false;
            };
            
            $scope.classActive = function(index){
                var clsAct = "";
                if($scope.elements[index].status) {
                    clsAct = 'active';
                };
                return clsAct;
            };
          
        }]);
        
    app.directive('elementsBoard', function() {
        return {
            restrict : 'E',
            templateUrl : 'elements-board.html'
        };
    });
    app.directive('imageBrowserNav', function() {
        return {
            restrict : 'E',
            templateUrl : 'image-browser-nav.html'
        };
    });
    
    app.directive('toolbarNav', function() {
        return {
            restrict : 'E',
            templateUrl : 'toolbar-nav.html'
        };
    });
    
})();


