/*
 * controlleur de la barre d'outil
 * toolbar nav controller
 */

(function() {

    var app = angular.module('navCtrl', []);

    app.controller('navCtrl', ['$scope', '$log',
    function($scope, $log) {
        
        $scope.siteName = 'action-grasse.org';
        $scope.appName = 'Le tronche-O-tron';
        
        $scope.navBtn = [{
            id : "z-up",
            title : "monter le calque",
            fn : function(){$scope.zUp();}
        }, {
            id : "z-down",
            title : "descendre le calque",
            fn : function(){$scope.zDown();}
        }, {
            id : "rotate-rt",
            title : "rotation horaire",
            fn : function(){$scope.rotateRt();}
        }, {
            id : "rotate-lt",
            title : "rotation anti-horaire",
            fn : function(){$scope.rotateLt();}
        }, {
            id : "flip-X",
            title : "mirroir vertical",
            fn : function(){$scope.flipX();}
        }, {
            id : "flip-Y",
            title : "mirroir horizontal",
            fn : function(){$scope.flipY();}
        }, {
            id : "deselect",
            title : "tout déselectionner",
            fn : function(){$scope.deselectAll();}
        }, {
            id : "export",
            title : "exporter",
            text: "save",
            fn : function(){$scope.export();}
        }, {
            id : "import",
            title : "importer",
            text: "open",
            fn : function(){$scope.importTronche();}
        }, {
            id : "help",
            title : "Afficher l'aide",
            fn : function(){$scope.dlgShow('help');}
        }, {
            id : "about",
            title : "A propos du tronchotron",
            fn : function(){$scope.dlgShow('about');}
        }];
        
        $scope.zUp = function() {
            var zindex = angular.element('.selected').parent().zIndex();
            angular.element('.selected').parent().zIndex(zindex + 1);
            angular.element('.selected span.h_zindex')
                .parent().parent().find('span.h_zindex').html(zindex + 1);
            angular.element('#zindex').html(zindex + 1);
        };
        $scope.zDown = function() {
            var zindex = angular.element('.selected').parent().zIndex();
            if (zindex >= 1) {
                angular.element('.selected').parent().zIndex(zindex - 1);
                angular.element('.selected span.h_zindex')
                    .parent().parent().find('span.h_zindex').html(zindex - 1);
                angular.element('#zindex').html(zindex - 1);
            };
        };
        $scope.rotateRt = function() {
            var rotate = angular.element('.selected span.h_rotate').html();
            var i = rotate.indexOf('(');
            var rotation = parseInt(rotate.substr(i+1,i+2));
            rotation++;
            rotate = 'rotate(' + rotation + 'deg)';
            angular.element('.selected span.h_rotate')
                .parent().parent().css('transform', rotate);
            angular.element('.selected span.h_rotate')
                .parent().parent().find('span.h_rotate').html(rotate);
            angular.element('#rotate').html(rotate);
        };
        $scope.rotateLt = function() {
            var rotate = angular.element('.selected span.h_rotate').html();
            var i = rotate.indexOf('(');
            var rotation = parseInt(rotate.substr(i+1,i+2));
            rotation--;
            rotate = 'rotate(' + rotation + 'deg)';
            console.log(rotate,rotation);
            angular.element('.selected span.h_rotate')
                .parent().parent().css('transform', rotate);
            angular.element('.selected span.h_rotate')
                .parent().parent().find('span.h_rotate').html(rotate);
            angular.element('#rotate').html(rotate);
        };
        /* TODO gerer ces fn avec les directives ng */
        $scope.flipX = function() {
            if (angular.element('.selected img').hasClass('flipx')) {
                angular.element('.selected img').removeClass('flipx');
                angular.element('.selected span.h_flipx')
                    .parent().parent().find('span.h_flipx').html('false');
                angular.element('#flipx').html('false');
            } else {
                angular.element('.selected img').addClass('flipx');
                angular.element('.selected span.h_flipx')
                    .parent().parent().find('span.h_flipx').html('true');
                angular.element('#flipx').html('true');
            }
        };
        $scope.flipY = function() {
            if (angular.element('.selected img').hasClass('flipy')) {
                angular.element('.selected img').removeClass('flipy');
                angular.element('.selected span.h_flipy')
                    .parent().parent().find('span.h_flipy').html('false');
                angular.element('#flipy').html('false');
            } else {
                angular.element('.selected img').addClass('flipy');
                angular.element('.selected span.h_flipy')
                    .parent().parent().find('span.h_flipy').html('true');
                angular.element('#flipy').html('true');
            }
        };
        $scope.selectAll = function() {
            angular.element('.draggable').addClass('selected');
        };
        $scope.export = function() {
            var elements = angular.element('.element');
            $scope.exportData = [];
            angular.forEach(elements, function(value, key) {
                var element = {};
                element.name = angular.element(value).find('img').attr('alt');
                element.category = angular.element(value).find('img').attr('rel');
                element.src = angular.element(value).find('img').attr('src');
                element.width = angular.element(value).width();
                element.height = angular.element(value).height();
                element.position = angular.element(value).position();
                element.transform = angular.element(value).find('.h_rotate').html();
                element.zIndex = angular.element(value).zIndex();
                if (angular.element(value).find('img').hasClass('flipx')) {
                    element.flipx = true;
                } else {
                    element.flipx = false;
                }
                if (angular.element(value).find('img').hasClass('flipy')) {
                    element.flipy = true;
                } else {
                    element.flipy = false;
                }
                element.status = true;
                $scope.exportData.push(element);
            });
            
            var store = angular.toJson($scope.exportData, true);
            //TODO remplacer le moche prompt par un dialogue modal perso avec ng-directives...
            var namePrompt = prompt('Entrez le nom de la tronche : ','Encore une belle tronche de cake');
            if (namePrompt != null) {
                localStorage.setItem(namePrompt, store);
            } else {
                alert('Nom non renseigné:\ntronche non sauvée !!!');
            }

        };
        $scope.importTronche = function () {
            $scope.dlgShow('reloadChoice');
        }
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
            dlgId = "#" + dlg;
            jQuery(dlgId).toggle();
        };
        $scope.dlgHide = function(dlg) {
            dlgId = "#" + dlg;
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


    /*app.directive('moveBtns', function() {
        return {
            restrict : 'E',
            templateUrl : 'move-btns.html'
        };
    });*/

})();

