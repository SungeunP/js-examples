var fs = require('fs'), 
    path = require('path'), 
    async = require('async');

walk('../..', function (dirname, dirnames, filenames) {
	// console.log(dirname);
	for (var i=0, l=dirnames.length; i<l; i++) {
		var name = path.join(dirname, dirnames[i]);
		console.log(name);	
	}
	for (var i=0, l=filenames.length; i<l; i++) {
		console.log(path.join(dirname, filenames[i]));
	}
}, function (err) {
	if (err) {
		return console.error(err);
	}

	console.log('walk done.');
});

////////////////////////////// func //////////////////////////////

function walk (dirpath, iterator, callback) {
	fs.readdir(dirpath, function (err, list) {
		if (err) {
			return callback(err);
		}

		var dirnames = [];
		var filenames = [];

		for (var i=0, l=list.length; i<l; i++) {
			var item = list[i];
			var stat = fs.statSync(path.join(dirpath, item));

			if (stat.isDirectory()) {
				dirnames.push(item);
			}
			else if (stat.isFile()) {
				filenames.push(item);
			}
		}

		iterator(dirpath, dirnames, filenames);

		async.eachSeries(dirnames, function (dirname, cb) {
			walk(path.join(dirpath, dirname), iterator, cb);
		}, callback);
	});
}
