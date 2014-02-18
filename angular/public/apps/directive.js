'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var directiveApp = angular.module('directiveApp', []);

    directiveApp.directive('myDirective', function () {
        return {
            restrict: 'EA',
            replace: false,
            template: [
                '<h3>{{title}}</h3>',
                '<ul>',
                    '<li ng-repeat="row in data" ng-click="fnClick(row)"> {{row.text}} </li>',
                '<div ng-transclude></div>',
            ].join(''),
            transclude: true,
            scope: {
                data: '=',
                title: '@',
                fnClick: '&click'
            },
            controller: function ($scope) {
                console.log('myDirective:controller');
                $scope.$watch('data', function (newValue, oldValue, $scope) {
                    // do something...
                });
            },
            compile: function (tElement, tAttr, transclude) {
                console.log('myDirective:compile');
                return {
                    pre: function ($scope, iElement, iAttr, controller) {
                        console.log('myDirective:prelink');
                    },
                    post: function ($scope, iElement, iAttr, controller) {
                        console.log('myDirective:postlink');
                    }
                }
            }
            // link: function ($scope, iElement, iAttr, controller) {
                // ...
            // }
        }
    });

    directiveApp.controller('DirectiveTestCtrl', function ($scope) {
        $scope.data = [
            { text: 'data00', value: 'value00' },
            { text: 'data01', value: 'value01' },
            { text: 'data02', value: 'value02' },
            { text: 'data03', value: 'value03' },
            { text: 'data04', value: 'value04' },
            { text: 'data05', value: 'value05' }
        ];

        $scope.fnGet = function () {
            console.log(arguments);
        };
    });
});
