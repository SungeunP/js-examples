/**
*  Module
*
* Description
*/
var fileApp = angular.module('fileApp', []);

fileApp.controller('FileLineCtrl', function ($scope, $http, $timeout) {
	var resetMsg = function () {
		$scope.success = false;
		$scope.danger = false;
		$scope.message = '';
	};
	var successMsg = function (msg) {
		$scope.success = true;
		$scope.danger = false;
		$scope.message = msg;

		$timeout(function() {
			resetMsg();
		}, 3000);
	};
	var dangerMsg = function (msg) {
		$scope.danger = true;
		$scope.success = false;
		$scope.message = msg;

		$timeout(function() {
			resetMsg();
		}, 3000);
	};

	$scope.getLine = function () {
		var filename = $scope.filename;
		var linenum = $scope.linenum;

		if (!filename || !linenum) {
			return;
		}

		$http.get([ '', 'document', filename, linenum ].join('/'))
			.success(function (data, status, headers, config) {
				successMsg('get line done.');

				$scope.contents = data;
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};
});

$(function () {
	angular.bootstrap(document, [ 'fileApp' ]);
});
