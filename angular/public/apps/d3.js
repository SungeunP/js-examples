'use strict';

define([
    'jquery', 'underscore', 'angular', 'd3'
],
function($, _, angular, d3) {
    var d3App = angular.module('d3App', []);

    d3App.directive('barsChart', ['$parse', function($parse) {
        return {
            restrict: 'E',
            replace: false,
            scope: {
                data: '=chartData'
            },
            link: function(scope, element, attrs) {
                // var chart = d3.select(element[0]);
                // chart.append('div').attr('class', 'chart')
                //     .selectAll('div')
                //     .data(scope.data).enter().append('div')
                //     .transition().ease('elastic')
                //     .style('width', function(d) {
                //         return d + '%';
                //     })
                //     .text(function(d) {
                //         return d + '%';
                //     });
                d3.select(element[0])
                  .selectAll("div")
                    .data(scope.data)
                  .enter().append("div")
                    .style("width", function(d) { return d * 10 + "px"; })
                    // .chart div {
                    //   font: 10px sans-serif;
                    //   background-color: steelblue;
                    //   text-align: right;
                    //   padding: 3px;
                    //   margin: 1px;
                    //   color: white;
                    // }
                    .style('font', '10px sans-serif')
                    .style('background-color', 'steelblue')
                    .style('text-align', 'right')
                    .style('padding', '3px')
                    .style('margin', '1px')
                    .style('color', 'white')
                    .text(function(d) { return d; });
            }
        };
    }]);

    d3App.controller('d3Ctrl', ['$scope', function($scope) {
        $scope.myData = [10, 20, 30, 40, 60, 80, 20, 50];

        // circle 한 개
        d3.select('div')
            .append('svg')
            .attr('width', 50)
            .attr('height', 50)
            .append('circle')
            .attr('cx', 25)
            .attr('cy', 25)
            .attr('r', 25)
            .style('fill', 'purple');
    }]);
});
