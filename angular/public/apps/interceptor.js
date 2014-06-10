'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function($, _, angular) {
    var interceptorApp = angular.module('interceptorApp', []);

    interceptorApp.config(function($httpProvider) {
        $httpProvider.interceptors.push('mHttpInterceptor');
    });

    interceptorApp.factory('mHttpInterceptor', function($q) {
        return {
            request: function(config) {
                console.log('request : ', config);
                console.log('Request started'); // LOG AT REQUEST START
                return config || $q.when(config);
            },
            requestError: function(rejection) {
                console.log('requestError : ', rejection);
                console.log(errCheck(rejection.status));
                return $q.reject(rejection);
            },
            response: function(response) {
                console.log('response : ', response);
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                console.log('responseError : ', rejection);
                return $q.reject(rejection);
            }
        };
    });

    interceptorApp.controller('InterceptorTestCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.test = 'hello angular.js';
        }
    ]);
});