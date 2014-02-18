var async = require('async');

// docs
// https://github.com/caolan/async
// fs.readdir(path, function (err, list) {
// 	fs.readFile(list[0], function (err, data) {
// 		fs.readFile(list[1], function (err, data) {
// 			fs.readFile(list[2], function (err, data) {
// 				// ..
// 			});
// 		});
// 	});
// });

/*async.series([
	function (cb) {
		console.log('first');
		cb(new Error('first error'));
	},
	function (cb) {
		console.log('second');
		cb();
	}
], function (err) {
	if (err) {
		throw err;
		return;
	}
	console.log('done');
});*/


// parallel
/*async.parallel([
	function (cb) {
		setTimeout(function () {
			console.log('first');
			cb();
		}, 1000);
	},
	function (cb) {
		console.log('second');
		cb();
	}
], function (err) {
	if (err) {
		throw err;
		return;
	}
	console.log('done');
});*/

// waterfall
/*async.waterfall([
	function (cb) {
		setTimeout(function () {
			console.log('first');
			cb(null, 'choiycdev');
		}, 1000);
	},
	function (username, cb) {
		console.log('second', 'username:', username);
		cb(null, 'test');
	}
], function (err, results) {
	if (err) {
		throw err;
		return;
	}
	console.log('done', results);
});*/

// each (parallel)
// eachSeries
var list = 'I love Javascript and Node.js'.split(' ');
/*async.each(list, function iterator (item, cb) {
	console.log(item);
	cb();
}, function (err) {
	if (err) {
		throw err;
		return;
	}
	console.log('done');
});*/

// map
// mapSeries
async.map(list, function iterator (item, cb) {
	var n = Math.floor(Math.random() * 1000)+500;
	setTimeout(function () {
		console.log(item, n);
		cb(null, item.toUpperCase());
	}, n);
}, function (err, results) {
	if (err) {
		throw err;
		return;
	}
	console.log('done', results);
});
