'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var naviApp = angular.module('naviApp', []);

    naviApp.controller('AppListCtrl', function ($scope, $http) {
        $http.get('/document/appList')
            .success(function (data, status, headers, config) {
                $scope.apps = data;
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
    });
});
