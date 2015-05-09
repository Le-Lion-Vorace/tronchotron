(function() {
    var app = angular.module('reloadCtrl', ['ui.bootstrap', 'cgPrompt']);

    app.controller('reloadCtrl', ['$scope', '$http', '$log',
    function($scope, $http, $log) {

        $scope.setStatusOff = function(index) {
            $scope.reloadedTronches[$scope.getIndex()]
                .reloadedElements.elements[index].status = false;
        };

        $scope.getIndex = function() {
            var index = (angular.element('#reloadIndex').html()).trim();
            index = index.substr(0, 1);
            return index;
        };

    }]);

    app.directive('reloadPanel', function() {
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
    });

})();
