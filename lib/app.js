/*
 *  Main controller
 *  Controlleur principal
 */
(function() {
    var app = angular.module('tronchotron', ['navCtrl','reloadCtrl','ui.bootstrap','cgPrompt']);
    
    app.controller('mainCtrl', ['$scope','$http','$log',
        function($scope,$http,$log) {
            
            $scope.categories = [];
            
            $scope.elements = [];
            
            $scope.siteName = 'action-grasse.org';
           
            $http.get('./elements/categories.json').success(function(data) {
                    $scope.categories = data;
            });
            
            $http.get('./elements/elements.json').success(function(data) {
                $scope.elements = data;
            });          
            
            $scope.reloadedTronches = [];
            var index=0;
            angular.forEach(window.localStorage, function(value, key) {
                var reloadedTronche = {
                    index: index,
                    name : key,
                    reloadedElements : JSON.parse(value)
                };
                index++;
                $scope.reloadedTronches.push(reloadedTronche);
            });
            
            $scope.enable = function() {
                enable();
            };
            
            $scope.setActive = function(index){
                $scope.elements[index].status=!$scope.elements[index].status;
            };
            
            $scope.setInactive = function(index){
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
    
    app.directive('elementsPanel', function() {
        return {
            restrict : 'E',
            templateUrl : 'elements-panel.html'
        };
    });
    
    /*app.directive('reloadPanel', function() {
        return {
            restrict : 'E',
            templateUrl : 'reload-panel.html'
        };
    });

    app.directive('reloadChoiceDlg', function() {
        return {
            restrict : 'E',
            templateUrl : 'reload-choice-dlg.html'
        };
    });*/
    
})();

