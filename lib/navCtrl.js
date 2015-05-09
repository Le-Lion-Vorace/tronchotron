/*
 * controlleur de la barre d'outil
 * toolbar nav controller
 */

(function() {

    var app = angular.module('navCtrl', ['ui.bootstrap','cgPrompt','reloadCtrl']);
    
    app.controller('navCtrl', ['$scope', '$log', 'prompt',
    function($scope, $log, prompt) {
        
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
            dataToggle:"modal",
            dataTarget:"#modalReloadChoice",
            fn : function(){$scope.importTronche();}
        }, {
            id : "clearScreen",
            title : "Effacer l'écran",
            text: "effacer",
            fn : function(){$scope.clearScreen();}
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
            angular.element('.selected span.h_zindex').html(zindex + 1);
            angular.element('#zindex').html(zindex + 1);
        };
        $scope.zDown = function() {
            var zindex = angular.element('.selected').parent().zIndex();
            if (zindex >= 1) {
                angular.element('.selected').parent().zIndex(zindex - 1);
                angular.element('.selected span.h_zindex').html(zindex - 1);
                angular.element('#zindex').html(zindex - 1);
            };
        };
        $scope.rotateRt = function() {
            var rotate = angular.element('.selected span.h_rotate').html();
            var i = rotate.indexOf('(');
            var rotation = parseInt(rotate.substr(i+1,i+2));
            rotation++;
            rotate = 'rotate(' + rotation + 'deg)';
            angular.element('.selected').css('transform', rotate);
            angular.element('.selected span.h_rotate').html(rotate);
            angular.element('#rotate').html(rotate);
        };
        $scope.rotateLt = function() {
            var rotate = angular.element('.selected span.h_rotate').html();
            var i = rotate.indexOf('(');
            var rotation = parseInt(rotate.substr(i+1,i+2));
            rotation--;
            rotate = 'rotate(' + rotation + 'deg)';
            angular.element('.selected').css('transform', rotate);
            angular.element('.selected span.h_rotate').html(rotate);
            angular.element('#rotate').html(rotate);
        };
        $scope.classFlipX = function(){
            var clsFlipX = "";
            if($scope.element.flipx=='flipx') {
                clsFlipX = 'flipx';
            };
            return clsFlipX;
        };
        $scope.classFlipY = function(){
            var clsFlipY = "";
            if($scope.element.flipy=='flipy') {
                clsFlipY = 'flipy';
            };
            return clsFlipY;
        };
        $scope.flipX = function() {
            if (angular.element('.selected img').hasClass('flipx')) {
                angular.element('.selected img').removeClass('flipx');
                angular.element('.selected span.h_flipx').html('false');
                angular.element('#flipx').html('false');
            } else {
                angular.element('.selected img').addClass('flipx');
                angular.element('.selected span.h_flipx').html('true');
                angular.element('#flipx').html('true');
            }
        };
        $scope.flipY = function() {
            if (angular.element('.selected img').hasClass('flipy')) {
                angular.element('.selected img').removeClass('flipy');
                angular.element('.selected span.h_flipy').html('false');
                angular.element('#flipy').html('false');
            } else {
                angular.element('.selected img').addClass('flipy');
                angular.element('.selected span.h_flipy').html('true');
                angular.element('#flipy').html('true');
            }
        };
        $scope.selectAll = function() {
            angular.element('.draggable').addClass('selected');
        };
        $scope.export = function() {
            var elements = angular.element('.element');
            var categories = angular.element('#elementsPanel .elementsDiv');
            $scope.exportData = {
                categories : [],
                elements : []
            };
            angular.forEach(categories, function (value, key) {
                $scope.category = {};
                $scope.category.name = angular.element(value).attr('id');
                $scope.category.zIndex = angular.element(value).zIndex();
                $scope.exportData['categories'].push($scope.category);
            });
            angular.forEach(elements, function(value, key) {
                $scope.element = {};
                var img = angular.element(value).find('img');
                
                $scope.element.name = img.attr('alt');
                $scope.element.category = img.attr('rel');
                $scope.element.src = img.attr('src');
                $scope.element.width = angular.element(value).width();
                $scope.element.height = angular.element(value).height();
                $scope.element.position = angular.element(value).position();
                $scope.element.transform = angular.element(value).find('.h_rotate').html();
                $scope.element.zIndex = angular.element(value).zIndex();
                $scope.element.status = true;
                (img.hasClass('flipx')) ? $scope.element.flipx = 'flipx': $scope.element.flipx = '';
                (img.hasClass('flipy')) ? $scope.element.flipy = 'flipy': $scope.element.flipy = '';
                
                $scope.exportData['elements'].push($scope.element);
            });
            
            if (elements.length > 0) {
                var store = angular.toJson($scope.exportData, true);
                $scope.namesFromStorage =[];
                angular.forEach(window.localStorage, function(value, key) {
                    $scope.namesFromStorage.push(key);
                });
                var namePrompt = prompt({
                    title: "Sauvez votre tronche !!!",
                    input: true,
                    label: 'Entrez le nom de la tronche',
                    value: 'La tête à Toto',
                    values: $scope.namesFromStorage,
                    buttons:[
                        {
                           label:'Sauvegarder', 
                           primary: false 
                        },{
                           label:'Annuler', 
                           primary: false,
                           cancel: true
                        }
                    ]
                }).then(function(result){
                    localStorage.removeItem(result);
                    localStorage.setItem(result, store);
                });
            };
        };
        $scope.getIndex = function() {
            var index = (angular.element('#reloadIndex').html()).trim();
            index = index.substr(0, 1);
            return index;
        };
        
        $scope.importTronche = function() {
            $scope.dlgShow('reloadChoice');
            var index = (angular.element('#reloadIndex').html()).trim();
            if (index != "") {
                var reloadedElements = $scope.reloadedTronches[$scope.getIndex()]
                    .reloadedElements['elements'];
                $log.debug(reloadedElements);
                angular.forEach(reloadedElements, function(value, key) {
                    value.status = true;
                });
            } else {
                return;
            }
        }; 

        $scope.clearScreen = function() {
            var elements = $scope.elements;
            angular.forEach(elements, function (value, key) {
                value.status=false;  
            });
            var reloadedElements = $scope.reloadedTronches[$scope.getIndex()]
                .reloadedElements['elements'];
            angular.forEach(reloadedElements, function (value, key) {
                value.status=false;  
            });
        };
        $scope.deselectAll = function() {
            angular.element('.draggable').removeClass('selected');
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

})();
