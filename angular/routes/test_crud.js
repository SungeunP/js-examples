'use strict';

var fs = require('fs'),
	_ = require('underscore');

var collection = [];
fs.readFile('./data/nodelist.json', function (err, data) {
	if (err) {
		throw err;	// server crash
		return;
	}

	collection = JSON.parse(data);
});

/**
*
*/
exports.create = function (req, res) {
	var nid = req.body.nid;

	if (!req.body.ipAddr) {
		res.send(400, 'missing ipAddr');
		return;
	}

	if (!nid) {
		req.body.nid = req.body.ipAddr.split('.')[3];
	}

	var node = _.findWhere(collection, { nid: nid });
	if (node) {
		res.send(400, 'node(' + nid + ') is exists.');
		return;
	}

	node = _.clone(req.body);

	collection.push(node);
	res.send(node);
};

exports.read = function (req, res) {
	var nid = req.params.nid;

	if (nid) {
		var node = _.findWhere(collection, { nid: nid });
		if (!node) {
			res.send(404, 'not found node: ' + nid);
			return;
		}

		res.send(node);
	}
	else {
		res.send(collection);
	}
};

exports.update = function (req, res) {
	var nid = req.params.nid;

	var node = _.findWhere(collection, { nid: nid });
	if (!node) {
		res.send(404, 'not found node: ' + nid);
		return;
	}

	for (var k in node) {
		node[k] = (req.body[k]) ? req.body[k] : node[k];
	}

	res.send(node);
};

exports.delete = function (req, res) {
	var nid = req.params.nid;

	var node = _.findWhere(collection, { nid: nid });
	if (!node) {
		res.send(404, 'not found node: ' + nid);
		return;
	}

	// remove
	collection.splice(_.indexOf(collection, node), 1);

	res.send(node);
};
