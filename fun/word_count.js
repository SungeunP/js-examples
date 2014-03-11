'use strict';
/**
*	Module dependencies
*/
var fs = require('fs'),
	path = require('path'),
	_ = require('underscore');
/**
*	input filepath
*/
var filepath = process.argv[2];
if (!filepath) {
	console.error('usage: node ' + path.basename(__filename) + ' <filename>');
	return;
}
/**
*	read file
*/

var oDict = [];

var rs = fs.createReadStream(filepath, { encoding: 'utf8' });

rs.on('data', function (chunk) {
	var str = chunk.trim()
		// 특문 제거 (. 제외)
		.replace(/[\!\@\#\$\%\^\&\*\(\)\+\[\]\{\}\\\/\|\"\'\:\;\,\<\>\?]+/gm, ' ')
		// last dot 제거
		.replace(/(\w+)\.+\s+/gm, '$1 ')
		// . 문자 제거
		.replace(/\s+\.+\s+/gm, ' ');

	var words = str.split(/\s+/);
	words.forEach(function (word) {
		oDict[word] = (oDict[word]) ? oDict[word]+1 : 1;
	});
})
.on('close', function () {
	// console.log('dict:', oDict);
	var aDict = _.map(_.pairs(oDict), function (pair) {
		return _.object([ 'word', 'count' ], pair);
	}).sort(function (l, r) {
		return r.count - l.count; // desc
	});

	console.log('Most 10 words:', _.pluck(aDict.slice(0, 10), 'word'));
});
