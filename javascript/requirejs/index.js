'use strict';

requirejs.config({
    paths: {
        // GET http://192.168.0.170/lib/jquery-1.10.2.min.js
        'jquery': 'lib/jquery-1.10.2.min',
        'underscore': 'lib/underscore-min',
        'angular': 'lib/angular/angular.min',
        'angular-route': 'lib/angular/angular-route.min'
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
        }
    }
});

requirejs([
    'jquery', 'underscore', 'angular',
    './foo.js'
],
function ($, _, angular, foo) {
    console.log(foo);
    console.log(foo.bar());
    alert(foo.bar());
});
