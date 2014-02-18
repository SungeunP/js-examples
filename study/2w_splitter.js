'use strict';

var fs = require('fs')
  , path = require('path');

var splitter = require('./split');

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
	  , lineNum = sp[1]*1 // conv integer
	  , lineCount = 0;

	var rs = fs.createReadStream(filename, { encoding: 'utf8' });

	fs.createReadStream(filename, { encoding: 'utf8' })
	.pipe(splitter())
	.on('data', function (line) {
		if (++lineCount === lineNum) {
			process.stdout.write(line);
			process.exit(0);
		}
	});
});
