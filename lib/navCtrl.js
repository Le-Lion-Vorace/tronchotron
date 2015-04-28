(function() {
    
    var app = angular.module('navCtrl',[]);
    /*var navBtn = [
        {
            id: "enable",
            title: "Activer cette application",
            ngClick:  function() {
                enable();
            }
        },
        {
            id: "z-up",
            title: "monter le calque",
            ngClick:  function() {
                zUp();
            }
        },
    ];*/
    
    app.controller('navCtrl', 
        function($scope) {
            
            
            $scope.siteName = 'action-grasse.org';

            $scope.appName = 'Le tronche-O-tron';
            
            $scope.elementMove = function(sens) {
                elementMove(sens);
            };
            $scope.zUp = function() {
                zUp();
            };
            $scope.zDown = function() {
                zDown();
            };
            $scope.rotateRt = function() {
                rotateRt();
            };
            $scope.rotateLt = function()  {
                rotateLt();
            };
            $scope.flipX = function() {
                flipX();
            };
            $scope.flipY = function() {
                flipY();
            };
            $scope.selectAll = function() {
                angular.element('.draggable').addClass('selected');
            };
            $scope.deselectAll = function() {
                angular.element('.draggable').removeClass('selected');
            };
            $scope.showAll = function() {
                showAll();
            };
            $scope.hideAll = function() {
                hideAll();
            };

            $scope.dlgShow = function(dlg) {
                dlgId = "#"+dlg;
                jQuery(dlgId).toggle();
            };
            $scope.dlgHide = function(dlg) {
                dlgId = "#"+dlg;
                angular.element(dlgId).hide();
            };

        });
    
    app.directive('helpDlg', function() {
        return {
            restrict : 'E',
            templateUrl : 'help-dlg.html'
        };
    });
    
    app.directive('aboutDlg', function() {
        return {
            restrict : 'E',
            templateUrl : 'about-dlg.html'
        };
    });

    app.directive('moveBtns', function() {
        return {
            restrict : 'E',
            templateUrl : 'move-btns.html'
        };
    });
    
})();