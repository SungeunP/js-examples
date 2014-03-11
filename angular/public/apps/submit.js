'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var submitApp = angular.module('submitApp', []);

    submitApp.controller('SubmitDemoCtrl', function Ctrl ($scope) {
        $scope.list = [];
        $scope.text = 'hello';

        $scope.submit = function() {
            if ($scope.text) {
                $scope.list.push(this.text);
                $scope.text = '';
            }
        };
    });
});