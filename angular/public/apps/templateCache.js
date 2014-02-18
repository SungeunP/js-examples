'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var templateCacheApp = angular.module('templateCacheApp', []);

    templateCacheApp.controller('TCacheDemoCtrl', ['$scope', function ($scope) {
        // ...
    }]);

    templateCacheApp.run(['$templateCache', function ($templateCache) {
        // set
        $templateCache.put('templateId2.html', 'This is the content of the template. (from templateCache)');
        // get
        var templateId = $templateCache.get('templateId.html');
        var templateId2 = $templateCache.get('templateId2.html');

        console.log($templateCache.info());
        console.log(templateId);
        console.log(templateId2);
    }]);
    // run -> directive -> contoller
});
