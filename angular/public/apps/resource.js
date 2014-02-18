'use strict';

define([
    'jquery', 'underscore', 'angular',
    'angular-resource'
],
function ($, _, angular) {
    var resourceApp = angular.module('resourceApp', [ 'ngResource' ]);

    resourceApp.factory('NodeFactory', function ($resource) {
        // $resource(url[, paramDefaults][, actions]);
        return $resource('/document/node/:nid', {}, {
            // save: { method: 'PUT', params: { nid: '@nid'}, transformResponse: function () {
            //     console.log('transformResponse', arguments);
            // }, transformRequest: function () {
            //     console.log('transformRequest', arguments);
            // } },
            // get: { ... }

            create: { method: 'POST' },
            read: { method: 'GET', isArray: true },
            update: { method: 'PUT', params: { nid: '@nid'} },
            delete: { method: 'DELETE', params: { nid: '@nid'}, query: {} }
        });
    });

    resourceApp.controller('ResourceDemoCtrl', function ($scope, NodeFactory) {
        // We can retrieve a collection from the server
        $scope.nodelist = NodeFactory.read(function readSuccess (value, responseHeaders) {
            // console.log(nodelist);

            // GET: /document/node
            // server returns: [ {...}, {...}, ... ];
            var node = value[0];
            node.ipAddr = '211.114.0.250';

            node.alive = false;
            delete node.os;
            node.$update();
            // PUT: /document/node/160
            // server returns: { ... };
        });

        $scope.setCurr = function (node) {
            // clone
            $scope.nodeData = {
                nid: node.nid,
                ipAddr: node.ipAddr,
                port: node.port,
                alive: node.alive
            };
            // ref
            // $scope.nodeData = node;
        };
        
        $scope.requestByFactory = function (method, node) {
            switch (method) {
                case 'create':
                    var newNode = NodeFactory.create(node, function (value, responseHeaders) {
                        $scope.nodelist.push(newNode);
                    }, function (httpResponse) {
                        alert(httpResponse.data);
                    });
                    // POST: /document/node
                    // server returns: { ... };
                    break;
                case 'update':
                    var updated = NodeFactory.update(node, function (value, responseHeaders) {
                        var selected = _.findWhere($scope.nodelist, { nid: node.nid });
                        if (selected) {
                            updated = _.extend(selected, updated);
                        }
                    }, function (httpResponse) {
                        alert(httpResponse.data);
                    });
                    // PUT: /document/node/:nid
                    // server returns: { ... };
                    break;
                case 'getOne':
                    $scope.nodeData = NodeFactory.get(node);
                    break;
                case 'delete':
                    var nid = NodeFactory.delete(node, function (value, responseHeaders) {
                        var selected = _.findWhere($scope.nodelist, { nid: node.nid });
                        if (selected) {
                            $scope.nodelist.splice(_.indexOf($scope.nodelist, selected), 1);
                        }
                    }, function (httpResponse) {
                        alert(httpResponse.data);
                    });
                    // DELETE: /document/node/:nid
                    // server returns: nid
                    break;
            }
        };

        $scope.requestByInstence = function (method, node) {
            switch (method) {
                case 'update':
                    node.$update(function (value, responseHeaders) {
                        node = value;
                    }, function (httpResponse) {
                        alert(httpResponse.data);
                    });
                    // PUT: /document/node/:nid
                    // server returns: { ... };
                    break;
                // case 'getOne':
                //     node = node.$get(node);
                //     break;
                case 'delete':
                    node.$delete(function (value, responseHeaders) {
                        $scope.nodelist.splice(_.indexOf($scope.nodelist, node), 1);
                    }, function (httpResponse) {
                        alert(httpResponse.data);
                    });
                    // DELETE: /document/node/:nid
                    // server returns: nid
                    break;
            }
        };
    });

});
