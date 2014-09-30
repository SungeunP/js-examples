/**
*
*/
var fs = require('fs');
var Q = require('q');

function test() {
	var deferred = Q.defer();
	fs.readFile("./q_test.js", "utf-8", function (error, text) {
	    if (error) {
	        deferred.reject(new Error(error));
	    }
	    else {
	        deferred.resolve(text);
	    }
	});
	return deferred.promise;
}

test().then(function (text) {
	console.log(text);
});
