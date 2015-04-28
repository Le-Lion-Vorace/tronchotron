(function() {
    
    var app = angular.module('navCtrl',[]);
    var navBtn = [
        {
            id: "enable",
            title: "Activer cette application",
            fonction: "enable"
        },{
            id: "z-up",
            title: "monter le calque",
            fonction:"zUp"
        }
    ];
    
    app.controller('navCtrl', 
        function($scope,$log) {
            
            $scope.siteName = 'action-grasse.org';
            $scope.appName = 'Le tronche-O-tron';
            $scope.navBtn = [
                {
                    id: "z-up",
                    title: "monter le calque",
                    fn: function(){$scope.zUp();}
                },{
                    id: "z-down",
                    title: "descendre le calque",
                    fn: function(){$scope.zDown();}
                },{
                    id: "rotate-rt",
                    title: "rotation anti-horaire",
                    fn: function(){$scope.rotateRt();}
                },{
                    id: "rotate-lt",
                    title: "rotation horaire",
                    fn: function(){$scope.rotateLt();}
                },{
                    id: "flip-X",
                    title: "mirroir vertical",
                    fn: function(){$scope.flipX();}
                },{
                    id: "flip-Y",
                    title: "mirroir horizontal",
                    fn: function(){$scope.flipY();}
                },{
                    id: "deselect",
                    title: "tout déselectionner",
                    fn: function(){$scope.deselect();}
                },{
                    id: "help",
                    title: "Afficher l'aide",
                    fn: function(){$scope.dlgShow('help');}
                },{
                    id: "about",
                    title: "A propos du tronchotron",
                    fn: function(){$scope.dlgShow('about');}
                }
            ];
                
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