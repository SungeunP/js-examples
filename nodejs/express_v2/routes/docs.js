
/*
 * GET users listing.
 */

var fs = require('fs')
  , path = require('path');

var docsPath = path.join(rootpath, 'docs');

exports.list = function (req, res) {
	fs.readdir(docsPath, function (err, list) {
		if (err) {
			res.status(500).send(err.stack || err.toString());
			return;
		}

		res.send(list);
	});
}

exports.read = function (req, res) {
	var id = req.params.id;

	var filePath = path.resolve(docsPath, id);

	fs.exists(filePath, function (exists) {
		if (!exists) {
			res.status(400).send(filename + ' is not exists.');
			return;
		}

		var rs = fs.createReadStream(filePath, { encoding: 'utf8' });
		rs.pipe(res);
	});
};

exports.create = function (req, res) {
	var filename = req.body.filename
	  , contents = req.body.contents;

	if (!filename) {
		res.status(412).send('missing filename.');
		return;
	}

	var newPath = path.resolve(docsPath, filename);

	fs.exists(newPath, function (exists) {
		if (exists) {
			res.status(400).send(filename + ' is exists.');
			return;
		}

		fs.writeFile(newPath, contents, function (err) {
			if (err) {
				res.status(500).send(err.stack || err.toString());
				return;
			}

			res.send(filename);
		});
	});
};

exports.update = function (req, res) {
	var id = req.params.id
	  , contents = req.body.contents;

	var filePath = path.resolve(docsPath, id);

	fs.exists(filePath, function (exists) {
		if (!exists) {
			res.status(400).send(id + ' is not exists.');
			return;
		}

		fs.writeFile(filePath, contents, function (err) {
			if (err) {
				res.status(500).send(err.stack || err.toString());
				return;
			}

			res.send(id);
		});
	});
};

exports.delete = function (req, res) {
	var id = req.params.id;

	var filePath = path.resolve(docsPath, id);

	fs.exists(filePath, function (exists) {
		if (!exists) {
			res.status(400).send(id + ' is not exists.');
			return;
		}

		// remove
		fs.unlink(filePath, function (err) {
			if (err) {
				res.status(500).send(err.stack || err.toString());
				return;
			}
			
			res.send(id);
		});
	});
};

exports.deleteAll = function (req, res) {
	fs.readdir(docsPath, function (err, list) {
		if (err) {
			res.status(500).send(err.stack || err.toString());
			return;
		}

		for (var i=0, l=list.length; i<l; i++) {
			var filename = list[i];

			fs.unlink(path.join(docsPath, filename), function () {}) // ignore err
		}

		res.send('delete all.');
	});
}
