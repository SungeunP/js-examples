'use strict';

var fs = require('fs')
  , path = require('path');

process.stdin.resume();
process.stdin.on('data', function (chunk) {
	// ignore'\n' or '\r\n'
	var str = chunk.toString().trim();
	if (!str) {
		return;
	}

	// protocol: <filename>,<line number>
	var sp = str.split(',');

	if (sp.length < 2) {
		process.stderr.write('usage: <filename>, <line number>');
		process.exit();
		return;
	}

	var filename = sp[0]
	  , lineNum = sp[1]*1	// conv integer
	  , lineCount = 0;

	var rl = new Readline(filename, { encoding: 'utf8' });

	rl
	.on('error', function (exception) {
		process.stderr.write(exception.stack || exception.toString());
		process.exit();
	})
	.on('line', function (line) {
		if (++lineCount === lineNum) {
			process.stdout.write(line);
			rl.close();
		}
	})
	.on('close', function () {
		process.exit();
	});
});

////////////////////////////// class //////////////////////////////

var Readable = require('stream').Readable;
var fs = require('fs');
var util = require('util');

function Readline (filename, opt) {
	Readable.call(this, opt);

	var rs = fs.createReadStream(filename, opt);

	var self = this;
	rs
	.on('open', this.emit.bind(this, 'open'))
	.on('error', this.emit.bind(this, 'error'))
	.on('close', this.emit.bind(this, 'close'))
	.on('end', function() {
		self.push(null);
	})
	.on('readable', function() {
		self.read(0); // ignore
	});

	this._source = rs;
	this._raw = [];
}
util.inherits(Readline, Readable);

Readline.prototype._read = function(n) {
	var chunk = this._source.read();

	if (!chunk) {
		return;
	}

	var sp = chunk.split(/\n|\r\n/g);
	sp = this._raw.concat(sp);
	this._raw = [ sp.pop() ];

	for (var i=0, l=sp.length; i<l; i++) {
		this.emit('line', sp[i]);
	}
};

Readline.prototype.close = function () {
	this._source.close();
};
