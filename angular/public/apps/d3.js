'use strict';

define([
    'jquery', 'underscore', 'angular','d3'
],
function ($, _, angular,d3) {
    var d3App = angular.module('d3App', []);
    d3App.directive('barsChart', function ($parse) {
        var directiveDefinitionObject = {
            restrict: 'E',
            replace: false,
            scope: {data: '=chartData'},
            link: function (scope, element, attrs) {
                var chart = d3.select(element[0]);
                chart.append("div").attr("class", "chart")
                .selectAll('div')
                .data(scope.data).enter().append("div")
                .transition().ease("elastic")
                .style("width", function(d) { return d + "%"; })
                .text(function(d) { return d + "%"; });
            } 
        };
        return directiveDefinitionObject;
    });
    d3App.controller('d3Ctrl',function ($scope){
        $scope.myData = [10,20,30,40,60, 80, 20, 50];
        d3.select("div")
        .append("svg")
        .attr("width", 50)
        .attr("height", 50)
        .append("circle")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 25)
        .style("fill", "purple");
    });
});