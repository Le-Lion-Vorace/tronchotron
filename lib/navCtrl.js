/*
 * controlleur de la barre d'outil
 * toolbar nav controller
 */

(function() {
    
    var app = angular.module('navCtrl',[]);
    
    app.controller('navCtrl', ['$scope','$log',
        function($scope,$log,$fnCtrl) {
            $log.debug(app);
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
                    title: "rotation horaire",
                    fn: function(){$scope.rotateRt();}
                },{
                    id: "rotate-lt",
                    title: "rotation anti-horaire",
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
                    fn: function(){$scope.deselectAll();}
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
                var zindex = angular.element('.selected').parent().zIndex();
                angular.element('.selected').parent().zIndex(zindex + 1);
                angular.element('#zindex').html(zindex + 1);
            };
            $scope.zDown = function(    ) {
                var zindex = angular.element('.selected').parent().zIndex();
                if (zindex >= 1) {
                    angular.element('.selected').parent().zIndex(zindex - 1);
                    angular.element('#zindex').html(zindex - 1);
                };
            };
            $scope.rotateRt = function() {
                var rotation = angular.element('.selected span.h_rotation').html();
                rotation = parseInt(rotation);
                rotation++;
                var rotate = 'rotate(' + rotation + 'deg)';
                angular.element('.selected span.h_rotation')
                    .parent().css('transform', rotate);
                angular.element('.selected span.h_rotation')
                    .parent().find('span.h_rotation').html(rotation);
                angular.element('#rotate').html(rotation);
            };
            $scope.rotateLt = function()  {
                var rotation = $('.selected span.h_rotation').html();
                rotation = parseInt(rotation);
                rotation--;
                var rotate = 'rotate(' + rotation + 'deg)';
                angular.element('.selected span.h_rotation')
                    .parent().css('transform', rotate);
                angular.element('.selected span.h_rotation')
                    .parent().find('span.h_rotation').html(rotation);
                angular.element('#rotate').html(rotation);
            };
            /* TODO gerer ces fn avec les directives ng */
            $scope.flipX = function() {
                if (angular.element('.selected img').hasClass('flipx')) {
                    angular.element('.selected img').removeClass('flipx');
                    angular.element('#flipx').html('false');
                } else {
                    angular.element('.selected img').addClass('flipx');
                    angular.element('#flipx').html('true');
                }
            };
            $scope.flipY = function() {
                if (angular.element('.selected img').hasClass('flipy')) {
                    angular.element('.selected img').removeClass('flipy');
                    angular.element('#flipy').html('false');
                } else {
                    angular.element('.selected img').addClass('flipy');
                    angular.element('#flipy').html('true');
                }
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
            
        }]); 
   
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
