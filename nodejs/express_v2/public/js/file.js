/**
*  Module
*
* Description
*/
var fileApp = angular.module('fileApp', []);

fileApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

fileApp.controller('FilesCtrl', function ($scope, $http, $timeout) {
	// alert
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

	$scope.list = function () {
		$http.get('/docs')
			.success(function (data, status, headers, config) {
				$scope.files = data;
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};
	$scope.read = function (filename) {
		$http.get('/docs/' + filename)
			.success(function (data, status, headers, config) {
				$scope.filename = filename;
				$scope.contents = data;
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};
	$scope.create = function (filename) {
		var contents = $scope.contents;

		if (!filename) {
			return;
		}

		$http({ method: 'POST', url: '/docs', data: { filename: filename, contents: contents } })
		// $http.post('/docs', { filename: filename, contents: contents })
			.success(function (data, status, headers, config) {
				successMsg('write done.');

				$scope.list();
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};
	$scope.update = function (filename) {
		var contents = $scope.contents;

		if (!filename) {
			return;
		}

		$http.put('/docs/' + filename, { contents: contents })
			.success(function (data, status, headers, config) {
				successMsg('update done.');

				$scope.list();
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};
	$scope.remove = function (filename) {
		$http.delete('/docs/' + filename)
			.success(function (data, status, headers, config) {
				successMsg('delete done.');

				$scope.filename = '';
				$scope.contents = '';

				$scope.list();
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};

	var request = function (method, id, data, callback) {
		var url = (id) ? ('/docs/'+id) : '/docs';
		var params = {
			method: method.toUpperCase(),
			url: url,
			data: data
		};

		$http(params)
			.success(function (data, status, headers, config) {
				callback(data);
			})
			.error(function (data, status, headers, config) {
				dangerMsg(data);
			});
	};

	// advanced
	$scope.rename = function (oldName, newName) {
		console.log(arguments);
		if (!oldName || !newName) {
			return;
		}
		if (oldName === newName) {
			return;
		}

		request('get', oldName, null, function (contents) {
			request('post', null, { filename: newName, contents: contents }, function () {
				request('delete', oldName, null, function () {
					successMsg('rename done.');

					$scope.filename = newName;
					$scope.list();
				});
			});
		});
	};
});

$(function () {
	angular.bootstrap(document, [ 'fileApp' ]);
});
