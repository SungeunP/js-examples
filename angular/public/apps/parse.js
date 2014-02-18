'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var parseApp = angular.module('parseApp', []);

    parseApp.controller('ParseTestCtrl', function ($scope, $parse) {
        var getter = $parse('user.name');
        var setter = getter.assign;
        var context = { user: { name: 'angular'} };
        var locals = { user: { name: 'local' } };
         
        $scope.contextName = getter(context); // angular

        // set
        setter(context, 'newValue');
        $scope.contextName2 = context.user.name; // newValue

        // get from locals
        $scope.localsName = getter(context, locals); // local
    });
    parseApp.controller('MyCtrl', function ($scope) {
        $scope.value = 10;
        $scope.increment = function(e) {
            console.log(e);
            $scope.value = $scope.value + 1;   
        };
        $scope.decrement = function(e) {
            console.log(e);
            $scope.value = $scope.value - 1; 
        };
        $scope.select = function (text, val) {
            console.log(arguments);
        };
    });

    parseApp.directive('ngRightClick', function ($parse, $timeout) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, { $event:event });
                });
            });
            
            // test
            $timeout(function () {
                var fnSel = $parse(attrs.select);

                fnSel(scope, {text:'tt', value: 4241});
            }, 2000);
        };
    });
});
