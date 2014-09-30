'use strict';

requirejs.config({
    paths: {
        'jquery': 'lib/jquery/jquery-1.11.1.min',

        'underscore': 'lib/underscore-min',

        'angular': 'lib/angular/angular.min',
        'angular-route': 'lib/angular/angular-route.min',
        'angular-resource': 'lib/angular/angular-resource.min',
        'angular-cookies': 'lib/angular/angular-cookies.min',

        'd3': 'lib/d3.min',
    },

    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'underscore': {
            exports: '_'
        },
        'angular': {
            deps: [ 'jquery' ],
            exports: 'angular'
        },
        'angular-route': {
            deps: [ 'angular' ]
        },
        'angular-resource': {
            deps: [ 'angular' ]
        },
        'angular-cookies': {
            deps: [ 'angular' ]
        },
        'd3': {
            exports: 'd3'
        }
    }
});

requirejs([
    'jquery', 'underscore', 'angular',
    'navi',
    'angular-route'
],
function ($, _, angular) {
    $.get('/document/apps', function (data, status) {
        if (status === 'error') {
            return alert(data || 'server timeout');
        }

        // data.files: [ 'apps/first_app', 'apps/second_app', ... ]
        require(data.files, function () {
            // data.apps: [ 'firstApp', 'secondApp', ... ]
            var apps = data.apps.concat([ 'ngRoute', 'naviApp' ]);
            var mainApp = angular.module('mainApp', apps);

            mainApp.config(function ($routeProvider) {
                // data.routes: [ { routeUrl, templateUrl, controller }, ... ]
                _.each(data.routes, function (route) {
                    $routeProvider.when(route.routeUrl, route);
                });
            });

            // Wait for loading the apps...
            setTimeout(function () {
                // Wait for loading the document...
                $(function () {
                    angular.bootstrap(document, [ 'mainApp' ]);
                });
            }, 200+data.files.length*10);
        });
    });
});
