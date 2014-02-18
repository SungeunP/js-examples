'use strict';

define([
    'jquery', 'underscore', 'angular',
    'angular-route'
],
function ($, _, angular) {
    var routesApp = angular.module('routesApp', [ 'ngRoute' ]);

    routesApp.config(function ($routeProvider) {
        $routeProvider
            .when('/test01', {
                template: '<span> {{routeParams}} </span>',
                controller: 'RouteTest01Ctrl'
            })
            .when('/test02',  {
                template: '<div> route test 02 </div>'
            })
            .when('/test03', {
                template: '<div> route test 03 (resolve) </div>',
                resolve: {
                    delay: function ($q, $rootScope) {
                        var defer = $q.defer();

                        // delay 3 sec
                        setTimeout(function () {
                            defer.resolve();
                            $rootScope.$apply();
                        }, 3000);
                        return defer.promise;
                    }
                }
            });
    });

    routesApp.controller('RouteTest01Ctrl', function ($scope, $routeParams) {
        $scope.routeParams = $routeParams;
    });
});
