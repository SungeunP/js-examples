'use strict';

define([
    'jquery', 'underscore', 'angular'
],
function ($, _, angular) {
    var qApp = angular.module('qApp', []);

    qApp.factory('myFactory',['$q','$rootScope', function ($q,$rootScope){
        return function (name,time){
            var d = $q.defer();

            setTimeout(function() {
                $rootScope.$apply(function() {
                    d.resolve({
                        field: 'hello ' + name +'^-^'
                    });
                    d.reject({
                        field: 'faild'
                    });
                });
            }, time);
            console.log(d.promise);
            return d.promise;
        };
    }]);

    qApp.controller('qCtrl',function ($scope, myFactory, $q, $timeout){
        $scope.dirTest = function(name){
            $scope.name = name;
            $scope.result = myFactory($scope.name,1000);
            if($scope.result)
                $scope.run();
        };

        $scope.run = function() {
            $scope.items = [];
            var promises = [];

            for(var i = 0; i < 5; i++) {
                var time = Math.floor(Math.random() * 10 + 5) * 500;
                $scope.items.push({time: time, css: "", id:""});

                var promise = waitTask(time, i);
                promise.then(function(index) {
                    $scope.items[index].css = "completed";
                });
                promise.then(function(index) {
                     $scope.items[index].id = "nodejs";
                },function(index){
                    console.log(arguments);
                });

                promises.push(promise);
            };
            $q.all(promises).then(function(messages) {
                $scope.message = "All " + messages.length + " tasks completed.";
            });
        }


        function waitTask(time, index) {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(index);
                // deferred.reject(index);
            }, time);

            return deferred.promise;
        }
    });
});
